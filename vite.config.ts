import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // relativo: funciona no GitHub Pages (subpath) e em qualquer host
  base: "./",
  plugins: [react()],
  build: {
    target: "es2022",
    cssCodeSplit: false,
  },
});
