import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/who_is_your_teacher/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true
  }
});
