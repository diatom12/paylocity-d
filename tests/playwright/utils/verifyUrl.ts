import { expect as playwrightExpect } from "@playwright/test";
import { Page } from "../core/types";

export const baseUrl = "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com";

interface VerifyUrlParams {
  page: Page;
  expect: typeof playwrightExpect;
  path: string;
}

/**
 * Verifies that the page URL matches the expected base URL and path.
 *
 * @param params - Object containing page, expect and path
 */
export async function verifyUrl({ page, expect, path }: VerifyUrlParams) {
  const expectedUrl = `${baseUrl}${path}`;
  await expect(page).toHaveURL(expectedUrl);
}
