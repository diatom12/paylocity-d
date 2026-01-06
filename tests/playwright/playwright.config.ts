// tests/playwright/playwright.config.ts
import { defineConfig } from "@playwright/test";

const homepageUrl =
  process.env.BASE_URL ||
  "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod";

export default defineConfig({
  testDir: "./",
  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  retries: process.env.CI ? 2 : 0,

  reporter: [["list"], ["html", { open: "never" }], ["blob"]],

  use: {
    headless: true,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    baseURL: homepageUrl,
  },
});

export { homepageUrl };
