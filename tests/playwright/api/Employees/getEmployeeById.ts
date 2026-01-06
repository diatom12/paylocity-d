import { expectFunction, Page } from "../../core/types";

export async function getEmployeeById(
  { page, expect }: { page: Page; expect: expectFunction },
  employeeId: string
) {
  let responseData: any;

  await expect(async () => {
    const response = await page.request.get(`/api/Employees/${employeeId}`);

    expect(response.status(), "Expected 200 response status").toBe(200);
    responseData = await response.json();
  }).toPass({
    intervals: [1_000],
    timeout: 5_000,
  });

  return responseData;
}
