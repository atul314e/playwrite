import type { Page } from "@playwright/test";
export class NavigationPageClass {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async uncheck(locator1, locator2) {
    if (await locator1.isChecked()) {
      await locator1.uncheck();
    }
    if (await locator2.isChecked()) {
      await locator2.uncheck();
    }
    if (await this.page.getByRole("button", { name: "Save" }).isDisabled()) {
      await this.page.getByRole("button", { name: "Save" }).click();
    }
  }

  async check(locator1, locator2) {
    if (await locator1.isChecked()) {
      console.log("........l");
    } else {
      await locator1.check();
    }
    if (await locator2.isChecked()) {
      console.log("........l");
    } else {
      await locator2.check();
    }
    if (await this.page.getByRole("button", { name: "Save" }).isDisabled()) {
      await this.page.getByRole("button", { name: "Save" }).click();
    }
  }
}
