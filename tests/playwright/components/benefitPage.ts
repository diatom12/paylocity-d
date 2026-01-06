import { expect } from "@playwright/test";
import { PageComponent } from "../core/PageComponent";

export class BenefitPage extends PageComponent {
  readonly employeesTable = this.page.locator("#employeesTable");
  readonly employeeRows = this.employeesTable.locator("tbody tr");
  readonly addEmployeeButton = this.page.locator("#Add");
  readonly addEmployeeModal = this.page.locator("#employeeModal");

  getEmployeeRowByIndex(index: number) {
    const row = this.employeeRows.nth(index);

    return {
      id: row.locator("td").nth(0),
      lastName: row.locator("td").nth(1),
      firstName: row.locator("td").nth(2),
      dependents: row.locator("td").nth(3),
      salary: row.locator("td").nth(4),
      grossPay: row.locator("td").nth(5),
      benefitsCost: row.locator("td").nth(6),
      netPay: row.locator("td").nth(7),
      editButton: row.locator(".fa-edit"),
      deleteButton: row.locator(".fa-times"),
    };
  }

  async verifyEmployeeRowCount(expectedCount: number): Promise<void> {
    await expect(this.employeeRows).toHaveCount(expectedCount);
  }

  async verifyTitleRow(): Promise<void> {
    await expect(this.employeeRows).toHaveCount(1);
  }

  async verifyEmployeeId(index: number, expectedId: string): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await expect(employee.id).toHaveText(expectedId);
  }

  async verifyEmployeeFirstName(
    index: number,
    employeeName: string
  ): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await expect(employee.firstName).toHaveText(employeeName);
  }

  async verifyEmployeeLastName(index: number, lastName: string): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await expect(employee.lastName).toHaveText(lastName);
  }

  async verifyEmployeeDependents(
    index: number,
    dependents: string
  ): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await expect(employee.dependents).toHaveText(dependents);
  }

  async verifyEmployeeSalary(index: number, salary: string): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await expect(employee.salary).toHaveText(salary);
  }

  async verifyEmployeeGrossPay(index: number, grossPay: string): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await expect(employee.grossPay).toHaveText(grossPay);
  }

  async verifyEmployeeBenefitsCost(
    index: number,
    benefitsCost: string
  ): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await expect(employee.benefitsCost).toHaveText(benefitsCost);
  }

  async verifyEmployeeNetPay(index: number, netPay: string): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await expect(employee.netPay).toHaveText(netPay);
  }

  async clickEditButton(index: number): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await employee.editButton.click();
  }

  async clickDeleteButton(index: number): Promise<void> {
    const employee = this.getEmployeeRowByIndex(index);
    await employee.deleteButton.click();
  }

  async clickAddEmployeeButton(): Promise<void> {
    await this.addEmployeeButton.click();
  }

  async verifyAddEmployeeModalVisible(): Promise<void> {
    await expect(this.addEmployeeModal).toBeVisible();
  }
}
