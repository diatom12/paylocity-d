import { expectFunction, Page } from "../../core/types";

export async function deleteEmployee(
  { page, expect }: { page: Page; expect: expectFunction },
  employeeId: string
) {
  await expect(async () => {
    const response = await page.request.delete(
      `/Prod/api/Employees/${employeeId}`
    );

    expect(response.status(), "Expected 200 response status").toBe(200);
  }).toPass({
    intervals: [1_000],
    timeout: 5_000,
  });
}
