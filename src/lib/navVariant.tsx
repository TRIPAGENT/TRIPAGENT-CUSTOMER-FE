import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Most pages have a dark hero at the top, so `.nav` (transparent, on-dark
// text) is correct. Some standalone pages (legal, contact, 404, and other
// light-body pages — verified: also join/search/trip/enquire/days) have no
// dark hero and use `.nav.solid` (opaque backdrop-blur) from the source
// HTML instead. Layout renders Header once, before it knows which page is
// mounting, so pages opt in via useNavVariant("solid") rather than Header
// hardcoding a per-route list.
const NavVariantContext = createContext<{ variant: string | null; setVariant: (v: string | null) => void } | null>(null);

export function NavVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<string | null>(null);
  return <NavVariantContext.Provider value={{ variant, setVariant }}>{children}</NavVariantContext.Provider>;
}

export function useNavVariant(variant: string) {
  const ctx = useContext(NavVariantContext);
  useEffect(() => {
    ctx?.setVariant(variant);
    return () => ctx?.setVariant(null);
  }, [ctx, variant]);
}

export function useNavVariantValue(): string | null {
  return useContext(NavVariantContext)?.variant ?? null;
}
