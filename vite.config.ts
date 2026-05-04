import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui")) {
              return "vendor-mui";
            }
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("react")) {
              return "vendor-react";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
