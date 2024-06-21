/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    /* Configure Vitest (https://vitest.dev/config/)
      for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    environment: "jsdom",
  },
  base: "/habit3/",
});