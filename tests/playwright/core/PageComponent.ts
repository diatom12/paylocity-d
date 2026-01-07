import { Page, expect as playwrightExpect, test } from "@playwright/test";

export class PageComponent {
  readonly page: Page;
  readonly expect: typeof playwrightExpect;
  readonly step: typeof test.step;

  constructor(
    page: Page,
    expect: typeof playwrightExpect,
    step: typeof test.step
  ) {
    this.page = page;
    this.expect = expect;
    this.step = step;
  }
}
