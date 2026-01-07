import { test, expect } from "@playwright/test";
import { LoginPage } from "../components/loginPage";
import { BenefitPage } from "../components/benefitPage";
import { AddEmployeeModal } from "../components/addEmployeeModal";
import { startOnLoginPage } from "../utils/startOnLoginPage";
import { verifyUrl } from "../utils/verifyUrl";
import { getEmployees } from "../api/Employees/getEmployees";
import { deleteEmployee } from "../api/Employees/deleteEmployeeById";
import users from "../test-data/users.json";
import urlPaths from "../test-data/urlPaths.json";
import employees from "../test-data/employee.json";

test.beforeEach(async ({ page }) => {
  await test.step("Start on login page", async () => {
    await startOnLoginPage({ page, expect, step: test.step });
  });
});

test.describe("Employee Tests", () => {
  test("Verify login form functionality with valid credentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page, expect, test.step);

    await test.step("Fill username field", async () => {
      await loginPage.fillUsername(users.user1.username);
    });

    await test.step("Verify username field is filled", async () => {
      await loginPage.verifyUsernameVisible();
    });

    await test.step("Fill password field", async () => {
      await loginPage.fillPassword(users.user1.password);
    });

    await test.step("Verify password field is filled", async () => {
      await loginPage.verifyPasswordVisible();
    });

    await test.step("Click login button", async () => {
      await loginPage.clickLoginButton();
    });

    await test.step("Verify redirect to benefit dashboard page", async () => {
      await verifyUrl({
        page,
        expect,
        path: urlPaths.benefitDashboard,
      });
      await page.waitForLoadState("networkidle");
    });

    await test.step("Get all employees and delete Tester User if exists", async () => {
      const employeesList = await getEmployees({ page, expect });

      const testerEmployee = employeesList.find(
        (emp: any) => emp.firstName === "User" && emp.lastName === "Tester"
      );

      if (testerEmployee) {
        const employeeId = testerEmployee.id;
        console.log(`Found Tester User with ID: ${employeeId}`);

        await deleteEmployee({ page, expect }, employeeId);
        console.log(`Deleted employee with ID: ${employeeId}`);

        const updatedEmployees = await getEmployees({ page, expect });
        const deletedEmployee = updatedEmployees.find(
          (emp: any) => emp.id === employeeId
        );

        expect(deletedEmployee).toBeUndefined();
        console.log("Employee successfully deleted and verified");
      } else {
        console.log("Tester User not found, continuing with test");
      }
    });

    const benefitPage = new BenefitPage(page, expect, test.step);
    const addEmployeeModal = new AddEmployeeModal(page, expect, test.step);

    await test.step("Click Add Employee button under table", async () => {
      await benefitPage.clickAddEmployeeButton();
    });

    await test.step("Verify Add Employee modal is visible", async () => {
      await addEmployeeModal.expectVisibleAddEmployeeModal();
    });

    await test.step("Click Cancel button in modal", async () => {
      await addEmployeeModal.cancelAddEmployeeModal();
    });

    await test.step("Verify modal is closed after cancel", async () => {
      await addEmployeeModal.expectNotVisibleAddEmployeeModal();
    });

    await test.step("Click Add Employee button under table again", async () => {
      await benefitPage.clickAddEmployeeButton();
    });

    await test.step("Verify Add Employee modal is visible again", async () => {
      await addEmployeeModal.expectVisibleAddEmployeeModal();
    });

    await test.step("Fill employee form with test data", async () => {
      await addEmployeeModal.fillFormAddEmployeeModal({
        firstName: employees.Tester.firstName,
        lastName: employees.Tester.lastName,
        dependents: employees.Tester.dependents,
      });
    });

    await test.step("Click Add Employee button in modal to create employee", async () => {
      await addEmployeeModal.submitAddEmployeeModal();
    });

    await test.step("Wait for employee to be added and modal to close", async () => {
      await addEmployeeModal.expectNotVisibleAddEmployeeModal();
      await page.waitForTimeout(1000);
    });

    await test.step("Verify new employee appears in the table", async () => {
      // Refresh table or wait for update
      await page.waitForTimeout(1000);

      // Find all rows in the table
      const rows = page.locator("table tbody tr");
      const rowCount = await rows.count();

      // Search for the new employee in all rows
      let found = false;
      for (let i = 0; i < rowCount; i++) {
        // The table swaps firstName and lastName, so we check accordingly.
        // Table's "First Name" column (index 2) should match our lastName data.
        const tableFirstName = await rows
          .nth(i)
          .locator("td")
          .nth(2)
          .textContent();
        // Table's "Last Name" column (index 1) should match our firstName data.
        const tableLastName = await rows
          .nth(i)
          .locator("td")
          .nth(1)
          .textContent();

        if (
          tableFirstName?.trim() === employees.Tester.lastName &&
          tableLastName?.trim() === employees.Tester.firstName
        ) {
          found = true;
          console.log(
            `Found employee ${employees.Tester.firstName} ${employees.Tester.lastName} at row ${i}`
          );

          // Verify other data in this row
          const dependents = await rows
            .nth(i)
            .locator("td")
            .nth(3)
            .textContent();
          expect(dependents?.trim()).toBe(
            employees.Tester.dependents.toString()
          );
          break;
        }
      }

      expect(found).toBe(true);
    });

    await test.step("Clean up: Delete the created employee via API", async () => {
      const employeesList = await getEmployees({ page, expect });

      const testerEmployee = employeesList.find(
        (emp: any) =>
          emp.firstName === employees.Tester.firstName &&
          emp.lastName === employees.Tester.lastName
      );

      if (testerEmployee) {
        const employeeId = testerEmployee.id;
        console.log(`Found created employee to delete with ID: ${employeeId}`);

        await deleteEmployee({ page, expect }, employeeId);
        console.log(`Deleted employee with ID: ${employeeId} for cleanup.`);

        const updatedEmployees = await getEmployees({ page, expect });
        const deletedEmployee = updatedEmployees.find(
          (emp: any) => emp.id === employeeId
        );

        expect(deletedEmployee).toBeUndefined();
        console.log("Cleanup successful: Employee deleted and verified.");
      } else {
        console.warn(
          "Could not find the created employee for cleanup. The test might have failed to create it."
        );
      }
    });
  });
});
