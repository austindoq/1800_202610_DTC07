import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        main: resolve(__dirname, "main.html"),
        profile: resolve(__dirname, "profile.html"),
        createEvent: resolve(__dirname, "create-event.html"),
        searchResults: resolve(__dirname, "search-results.html"),
      },
    },
  },
});
