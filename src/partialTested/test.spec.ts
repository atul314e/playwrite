import { test } from "@playwright/test";
import { CreatePageClass } from "../pages/pagesUtils.page";
import Authentication from "../pages/auth.page";

test("page test case", async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  const auth = new Authentication(page);
  auth.login("atul.silori@314ecorp.com", "a");

  await page.getByRole("link", { name: "Website", exact: true }).click();

  const pagename = await page
    .getByRole("menuitem", { name: "Admin caret-right" })
    .getByText("Admin");
  await pagename.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 45);
  const pageOperationDropdown = await page.locator(
    ".ant-dropdown:not(.ant-dropdown-hidden)"
  );
  const menuitem = await pagename.locator(".ant-menu-title-content");

  await menuitem.hover();
  await menuitem.getByRole("button").click();
  await page.waitForTimeout(1500);
  await pageOperationDropdown
    .locator("span", { hasText: "Mark as Inactive" })
    .click();
  await page
    .getByRole("button", { name: "Mark Inactive", exact: true })
    .click();
  await page.pause();
});
