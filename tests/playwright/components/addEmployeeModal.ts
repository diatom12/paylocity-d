import { expect } from "@playwright/test";
import { PageComponent } from "../core/PageComponent";

export class AddEmployeeModal extends PageComponent {
  readonly modal = this.page.locator("#employeeModal");

  readonly firstNameInput = this.modal.locator("#firstName").nth(0);
  readonly lastNameInput = this.modal.locator("#lastName").nth(0);
  readonly dependentsInput = this.modal.locator("#dependants").nth(0);

  readonly addButton = this.modal.locator("#addEmployee");
  readonly updateButton = this.modal.locator("#updateEmployee");
  readonly cancelButton = this.modal.getByRole("button", { name: "Cancel" });
  readonly closeButton = this.modal.locator(".modal-header button.close");

  async expectVisibleAddEmployeeModal() {
    await expect(this.modal).toBeVisible();
  }

  async fillFormAddEmployeeModal(data: {
    firstName: string;
    lastName: string;
    dependents: number;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dependentsInput.fill(String(data.dependents));
  }

  async submitAddEmployeeModal() {
    await this.addButton.click();
  }

  async cancelAddEmployeeModal() {
    await this.cancelButton.click();
  }

  async verifyUpdateButtonText(expectedText: string): Promise<void> {
    await expect(this.updateButton).toHaveText(expectedText);
  }

  async verifyUpdateButtonVisible(): Promise<void> {
    await expect(this.updateButton).toBeVisible();
  }

  async verifyCancelButtonText(expectedText: string): Promise<void> {
    await expect(this.cancelButton).toHaveText(expectedText);
  }

  async verifyCancelButtonVisible(): Promise<void> {
    await expect(this.cancelButton).toBeVisible();
  }

  async verifyUpdateButtonNotVisible(): Promise<void> {
    await expect(this.updateButton).not.toBeVisible();
  }

  async verifyAddButtonNotVisible(): Promise<void> {
    await expect(this.addButton).not.toBeVisible();
  }
}
