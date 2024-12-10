import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:dns";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["test/setupTests.ts"],
    globals: true,
  },
});
