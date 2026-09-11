import { Route, Routes } from "react-router-dom";
import { LangProvider } from "./app/providers/LangProvider";
import { SiteLayout } from "./app/layouts/SiteLayout";

/**
 * Rotas: "/" (pt) e "/en" (en) — o idioma mora na URL.
 */
export default function App() {
  return (
    <LangProvider>
      <Routes>
        <Route path="/" element={<SiteLayout />} />
        <Route path="/en" element={<SiteLayout />} />
      </Routes>
    </LangProvider>
  );
}
