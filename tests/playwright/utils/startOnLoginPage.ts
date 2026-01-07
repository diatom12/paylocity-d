import { expect as playwrightExpect, test } from "@playwright/test";
import { Page } from "../core/types";

interface StartOnLoginPageParams {
  page: Page;
  expect: typeof playwrightExpect;
  step: typeof test.step;
}

/**
 * Navigates to the login page and verifies the URL and presence of the login form container.
 *
 * @param params - Object containing page, expect and step
 */
export async function startOnLoginPage({
  page,
  expect,
}: StartOnLoginPageParams) {
  const loginUrl =
    "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn";

  // Navigate to the login page
  await page.goto(loginUrl);

  // Verify the URL is correct
  await expect(page).toHaveURL(loginUrl);

  // Verify the login form container is visible
  const loginFormContainer = page.locator(
    ".col-5.login-form-container.rounded"
  );
  await expect(loginFormContainer).toBeVisible();
}
