import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        profile: resolve(__dirname, "profile/index.html"),
        post: resolve(__dirname, "post/index.html"),
        listings: resolve(__dirname, "listings/index.html"),
      },
    },
  },
});
