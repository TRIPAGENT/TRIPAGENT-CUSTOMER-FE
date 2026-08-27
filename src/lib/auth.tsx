import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import type { SiteMemberRow } from "./database.types";

export type LoginResult = { ok: true } | { ok: false; error: "not_invited" | string };

type AuthContextValue = {
  session: Session | null;
  member: SiteMemberRow | null;
  loading: boolean; // true until the first getSession()+site_members lookup resolves
  signedIn: boolean;
  requestLogin: (email: string) => Promise<LoginResult>;
  verifyLogin: (email: string, token: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// Mirrors js/backend.js's remote-mode hydrate(): look up the site_members row
// linked to this auth user via auth_uid. Returns null if OTP succeeded but no
// site_members row is linked yet — this is the invite gate, enforced the same
// way js/account.js's verifyLogin does (a valid login with no linked
// membership is not a member).
//
// DEPENDS ON A LIVE FIX NOT YET APPLIED: supabase/migrations/0002_site_auth_gate.sql
// defines a trigger (tg_link_site_member) that sets site_members.auth_uid on
// first real sign-in, matched by email/phone. Confirmed 2026-08-24 via a
// direct RPC probe against the live project that this trigger function does
// NOT exist there yet (PGRST202) — 0001's is_site_member() is live, 0002 is
// not. Until 0002 is applied to the live project, EVERY first-time real OTP
// login will resolve `member` to null here and be treated as not_invited,
// even for a genuinely invited site_members row. This is not a bug in this
// file — apply 0002 (branch-first, per its own header comment) before
// expecting real logins to succeed end-to-end.
async function loadMember(session: Session | null): Promise<SiteMemberRow | null> {
  if (!session) return null;
  const { data, error } = await supabase
    .from("site_members")
    .select("*")
    .eq("auth_uid", session.user.id)
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("[auth] site_members lookup failed:", error.message);
    return null;
  }
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [member, setMember] = useState<SiteMemberRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function hydrate(nextSession: Session | null) {
      const m = await loadMember(nextSession);
      if (cancelled) return;
      setSession(nextSession);
      setMember(m);
      setLoading(false);
    }

    supabase.auth.getSession().then(({ data }) => hydrate(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setLoading(true);
      hydrate(nextSession);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      member,
      loading,
      signedIn: !!session && !!member,
      async requestLogin(email) {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) {
          const notInvited = /not_invited|not on the invitation/i.test(error.message);
          return { ok: false, error: notInvited ? "not_invited" : error.message };
        }
        return { ok: true };
      },
      async verifyLogin(email, token) {
        const { data, error } = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: token.trim(),
          type: "email",
        });
        if (error) return { ok: false, error: error.message };

        // Invite gate (see loadMember's doc comment above): a verified OTP
        // with no linked site_members row is not a member — sign back out,
        // same as js/account.js's verifyLogin.
        const m = await loadMember(data.session);
        if (!m) {
          await supabase.auth.signOut();
          setSession(null);
          setMember(null);
          return { ok: false, error: "not_invited" };
        }
        setSession(data.session);
        setMember(m);
        return { ok: true };
      },
      async logout() {
        await supabase.auth.signOut();
        setSession(null);
        setMember(null);
      },
    }),
    [session, member, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth() must be used inside <AuthProvider>");
  return ctx;
}
