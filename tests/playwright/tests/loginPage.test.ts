import { test, expect } from "@playwright/test";
import { LoginPage } from "../components/loginPage";
import { startOnLoginPage } from "../utils/startOnLoginPage";
import translations from "../test-data/translations.json";

test.beforeEach(async ({ page }) => {
  await test.step("Start on login page", async () => {
    await startOnLoginPage({ page, expect, step: test.step });
  });
});

test.describe("Login Page Tests", () => {
  test("Verify all login page components are visible", async ({ page }) => {
    const loginPage = new LoginPage(page, expect, test.step);

    await test.step("Verify username field is visible", async () => {
      await loginPage.verifyUsernameVisible();
    });

    await test.step("Verify password field is visible", async () => {
      await loginPage.verifyPasswordVisible();
    });

    await test.step("Verify login button is visible", async () => {
      await loginPage.verifyLoginButtonVisible();
    });

    await test.step("Verify navbar link is present", async () => {
      await loginPage.verifyNavBarHref("/Prod/Benefits");
    });
  });

  test("Verify clear username and password functionality", async ({ page }) => {
    const loginPage = new LoginPage(page, expect, test.step);

    await test.step("Fill username field", async () => {
      await loginPage.fillUsername("testuser");
    });

    await test.step("Fill password field", async () => {
      await loginPage.fillPassword("testpassword");
    });

    await test.step("Clear username field", async () => {
      await loginPage.clearUsername();
    });

    await test.step("Clear password field", async () => {
      await loginPage.clearPassword();
    });

    await test.step("Verify fields are still visible after clearing", async () => {
      await loginPage.verifyUsernameVisible();
      await loginPage.verifyPasswordVisible();
    });
  });

  test("Verify error message when submitting empty login form", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page, expect, test.step);

    await test.step("Verify username and password fields are empty", async () => {
      await loginPage.verifyUsernameVisible();
      await loginPage.verifyPasswordVisible();
    });

    await test.step("Click login button with empty fields", async () => {
      await loginPage.clickLoginButton();
    });

    await test.step("Verify error message is displayed", async () => {
      await loginPage.verifyLoginError(translations.loginErrorText);
    });
  });
});
