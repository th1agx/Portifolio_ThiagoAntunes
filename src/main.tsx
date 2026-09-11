import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500-italic.css";
import "./styles/global.css";
import App from "./App";

// hash router: build estático funciona em qualquer host (Vercel, Pages)
createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
