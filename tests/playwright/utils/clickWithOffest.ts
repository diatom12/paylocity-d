import { Locator, Page } from "../core/types";

/**
 * Clicks on the given locator with an implicit wait before the click action.
 *
 * @param locator - The locator to click on.
 * @param page - The Playwright page object.
 * @param offset - The offset in milliseconds to wait before clicking.
 */
export async function clickWithOffset(
  locator: Locator,
  page: Page,
  offset: number = 1000
) {
  await page.waitForTimeout(offset);
  await locator.click();
  await page.waitForTimeout(offset);
}
