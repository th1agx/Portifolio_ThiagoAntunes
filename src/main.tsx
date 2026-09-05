import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500-italic.css";
import "./styles/global.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log(
  "%c th1agx %c engenheiro de software — código aberto, mente aberta → thiagofsprofissional@gmail.com ",
  "background:#D7F452;color:#141410;font-weight:bold;padding:4px 8px;border-radius:4px 0 0 4px",
  "background:#141410;color:#EFE7D8;padding:4px 8px;border-radius:0 4px 4px 0"
);
