import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavVariantProvider } from "../../lib/navVariant";

export function Layout() {
  return (
    <NavVariantProvider>
      <Header />
      <main id="content">
        <Outlet />
      </main>
      <Footer />
    </NavVariantProvider>
  );
}
