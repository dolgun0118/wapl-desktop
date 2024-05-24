import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Mode, plugin } from "vite-plugin-markdown";

export default defineConfig({
  plugins: [
    react(),
    plugin({ mode: [Mode.HTML, Mode.MARKDOWN, Mode.TOC, Mode.REACT] }),
  ],
  optimizeDeps: {
    exclude: ["msw"],
  },
});
