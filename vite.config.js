import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: "src/main.jsx",
      name: "ChatWidget",
      fileName: "chat-widget",
      formats: ["iife"], // Important: IIFE format makes it browser-embeddable
    },
  },
});
