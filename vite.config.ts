import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths so the app works when served from a subpath (GitHub Pages)
  base: "./",
  plugins: [react(), tailwindcss()],
});
