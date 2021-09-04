import { defineConfig } from "vite";

export default defineConfig(async ({ command }) => ({
  server: {
    host: true,
    https: true,
  },
  plugins: [
    command === "serve" &&
      (await import("@vitejs/plugin-react-refresh")).default(),
  ].filter(Boolean),
}));
