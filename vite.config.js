import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: "src/main.jsx", // your entry file
      name: "ChatWidget",
      formats: ["iife"],
      fileName: () => `chat-widget.iife.js`,
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
  },
  define: {
    "process.env": {}, // prevent process errors
  },
});
