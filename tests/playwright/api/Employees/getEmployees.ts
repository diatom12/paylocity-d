import { expectFunction, Page } from "../../core/types";

export async function getEmployees({
  page,
  expect,
}: {
  page: Page;
  expect: expectFunction;
}) {
  let responseData: any;

  await expect(async () => {
    const response = await page.request.get("/Prod/api/Employees");

    expect(response.status(), "Expected 200 response status").toBe(200);
    responseData = await response.json();
  }).toPass({
    intervals: [1_000],
    timeout: 5_000,
  });

  return responseData;
}
