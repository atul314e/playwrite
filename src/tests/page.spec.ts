import { test } from "@playwright/test";
import { CreatePageClass } from "../pages/pagesUtils.page";
import Authentication from "../pages/auth.page";

test("page test case", async ({ page }, testInfo) => {
  const auth = new Authentication(page);
  auth.login("atul.silori@314ecorp.com", "a");

  await page.getByRole("link", { name: "Website", exact: true }).click();

  await page
    .locator(".ant-layout-sider-zero-width-trigger")
    .evaluate((element) => (element.style.visibility = "hidden"));

  // creating new page
  const newpage = new CreatePageClass(page);
  newpage.createPage();
  await page.getByRole("button", { name: "Create" }).click();

  await page.getByRole("link", { name: "Website", exact: true }).click(); // refresh the website so menuitems are visible

  const admin = await page
    .getByRole("menuitem", { name: "Admin caret-right" })
    .getByText("Admin");
  await admin.scrollIntoViewIfNeeded();

  const pagename = await page.locator(`li[title="${newpage.pagename}"]`);
  const pageOperationDropdown = await page.locator(
    ".ant-dropdown.ant-dropdown-placement-bottomLeft:not(.ant-dropdown-hidden)"
  );
  const menuitem = await pagename.locator(".ant-menu-title-content");

  // marking page as inactive
  await menuitem.hover();
  await menuitem.getByRole("button").click();
  await pageOperationDropdown
    .locator("span", { hasText: "Mark as Inactive" })
    .click();
  await page
    .getByRole("button", { name: "Mark Inactive", exact: true })
    .click();

  await admin.scrollIntoViewIfNeeded();

  // marking page as Active
  await menuitem.hover();
  await menuitem.getByRole("button").click();
  await pageOperationDropdown
    .locator("span", { hasText: "Mark as Active" })
    .click();
  await page.getByRole("button", { name: "Mark Active", exact: true }).click();

  await admin.scrollIntoViewIfNeeded();

  // creating child page
  await menuitem.hover();
  await menuitem.getByRole("button").click();
  await pageOperationDropdown
    .locator("span", { hasText: "Add Child Page" })
    .click();
  newpage.createChildPage();
  await page.getByRole("button", { name: "Create" }).click();

  await admin.scrollIntoViewIfNeeded();

  const childpagename = await page.locator(
    `li[title="${newpage.childPageName}"]`
  );
  const childmenuitem = await childpagename.locator(".ant-menu-title-content");
  await childmenuitem.hover();
  await childmenuitem.getByRole("button").click();
  await pageOperationDropdown
    .locator("span", { hasText: "Delete Page" })
    .click();
  await page.getByRole("button", { name: "Delete", exact: true }).click();

  await admin.scrollIntoViewIfNeeded();

  // deleting page
  await menuitem.hover();
  await menuitem.getByRole("button").click();
  await pageOperationDropdown
    .locator("span", { hasText: "Delete Page" })
    .click();
  await page.getByRole("button", { name: "Delete", exact: true }).click();
});
