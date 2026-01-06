import {
  Page as PlaywrightPage,
  Locator as PlaywrightLocator,
  expect as playwrightExpect,
} from "@playwright/test";

export type Page = PlaywrightPage;
export type Locator = PlaywrightLocator;
export type expectFunction = typeof playwrightExpect;
