import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./lib/auth";
import PageRouter from "./pages/PageRouter";

// AuthProvider is mounted here because Header.tsx calls useAuth()
// unconditionally and throws without it — with no session yet this is just
// a local getSession() check, no DB call.
//
// Ported so far: city-*.html (Phase 2), health-{hospital,destination,
// specialty,guide,longevity,pathway}-*.html (Phase 3). Every other slug
// falls through to PageRouter's placeholder — those templates land in later
// phases, one group at a time.
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path=":pageSlug" element={<PageRouter />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
