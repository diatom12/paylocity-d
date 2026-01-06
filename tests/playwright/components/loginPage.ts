import { expect } from "@playwright/test";
import { PageComponent } from "../core/PageComponent";

export class LoginPage extends PageComponent {
  readonly username = this.page.getByTestId("#Username");
  readonly password = this.page.getByTestId("#Password");
  readonly loginButton = this.page.getByTestId("#LoginButton");
  readonly loginError = this.page.locator(
    ".text-danger.validation-summary-errors"
  );
  readonly navBarText = this.page.locator(".navbar-brand");

  async fillUsername(username: string): Promise<void> {
    await this.username.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.password.fill(password);
  }

  async clearUsername(): Promise<void> {
    await this.username.clear();
  }

  async clearPassword(): Promise<void> {
    await this.password.clear();
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async verifyUsernameVisible(): Promise<void> {
    await expect(this.username).toBeVisible();
  }

  async verifyPasswordVisible(): Promise<void> {
    await expect(this.password).toBeVisible();
  }

  async verifyLoginButtonVisible(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginError(expectedText: string): Promise<void> {
    await expect(this.loginError).toBeVisible();
    await expect(this.loginError).toHaveText(expectedText);
  }

  async verifyNavBarHref(expectedLink: string): Promise<void> {
    await expect(this.navBarText).toBeVisible();
    await expect(this.navBarText).toHaveAttribute("href", expectedLink);
  }
}
