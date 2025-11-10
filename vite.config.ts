import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@services": "/src/services",
      "@assets": "/src/assets",
      "@styles": "/src/styles",
      "@constants": "/src/constants",
      "@types": "/src/types",
      "@context": "/src/context",
      "@config": "/src/config",
      "@ui": "/src/ui",
    },
  },
});
