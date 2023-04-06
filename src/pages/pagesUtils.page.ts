import type { Page } from "@playwright/test";
export class CreatePageClass {
  readonly page: Page;
  pagename: string;
  childPageName: string;
  constructor(page: Page) {
    this.page = page;
    this.pagename = "";
    this.childPageName = "";
  }
  async createPage() {
    await this.page
      .getByRole("menuitem", { name: "Pages caret-down" })
      .getByRole("button")
      .click();
    this.pagename = Date.now().toString();
    await this.page
      .getByPlaceholder("Enter the page name here")
      .fill(this.pagename);
  }

  async editPageName(modal) {
    await this.page.locator("span.anticon.anticon-edit").first().click();
    this.pagename = Date.now().toString();
    await modal
      .getByPlaceholder("Enter the page name here")
      .fill(this.pagename);
  }

  async addWidgets(stickyFooter, name) {
    const button = stickyFooter.getByRole("button", {
      name: "Add Widget",
      exact: true,
    });
    await Promise.allSettled([
      button.click(),
      this.page
        .locator(".ant-popover-content")
        .getByText(name, { exact: true })
        .click(),
    ]);
  }

  async createChildPage() {
    this.childPageName = Date.now().toString();
    await this.page
      .getByPlaceholder(`${this.pagename} > Page name`)
      .fill(this.childPageName);
  }

  async save() {
    await this.page
      .locator("")
      .getByRole("button", { name: "Save", exact: true })
      .click();
  }
}
