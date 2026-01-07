import { PageComponent } from "../core/PageComponent";

export class LoginPage extends PageComponent {
  readonly username = this.page.locator('input[name="Username"]');
  readonly password = this.page.locator('input[name="Password"]');
  readonly loginButton = this.page.locator('button[type="submit"]');
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
    await this.expect(this.username).toBeVisible();
  }

  async verifyPasswordVisible(): Promise<void> {
    await this.expect(this.password).toBeVisible();
  }

  async verifyLoginButtonVisible(): Promise<void> {
    await this.expect(this.loginButton).toBeVisible();
  }

  async verifyLoginError(expectedText: string): Promise<void> {
    await this.expect(this.loginError).toBeVisible();
    await this.expect(this.loginError).toContainText(expectedText);
  }

  async verifyNavBarHref(expectedLink: string): Promise<void> {
    await this.expect(this.navBarText).toBeVisible();
    await this.expect(this.navBarText).toHaveAttribute("href", expectedLink);
  }
}
