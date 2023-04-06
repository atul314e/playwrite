import type { Page } from "@playwright/test";

class Authentication {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.goto("https://test1.practifly.app/sprint/");
    await this.page.locator('input[id="username"]').fill(username);
    await this.page.locator('input[id="password"]').fill(password);
    await this.page.getByRole("button", { name: "Sign In" }).click();
  }
}

export default Authentication;
