import { Page } from "@playwright/test";

export class PageComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
