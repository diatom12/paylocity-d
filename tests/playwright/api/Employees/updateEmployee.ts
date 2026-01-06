import { expectFunction, Page } from "../../core/types";
import { Employee } from "../../core/apiTypes/Employee";

export async function updateEmployee(
  { page, expect }: { page: Page; expect: expectFunction },
  payload: Employee
) {
  let responseData: any;

  await expect(async () => {
    const response = await page.request.put("/api/Employees", {
      data: payload,
    });

    expect(response.status(), "Expected 200 response status").toBe(200);
    responseData = await response.json();
  }).toPass({
    intervals: [1_000],
    timeout: 5_000,
  });

  return responseData;
}
