import { test } from "@playwright/test";
import { CreatePageClass } from "../pages/pagesUtils.page";
import Authentication from "../pages/auth.page";

test("Adding Widget to page", async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  const auth = new Authentication(page);
  auth.login("atul.silori@314ecorp.com", "a");

  await page.getByRole("link", { name: "Website", exact: true }).click();
  await page
    .locator(".ant-layout-sider-zero-width-trigger")
    .evaluate((element) => (element.style.visibility = "hidden"));

  /**
   * creating new page
   **/
  const newpage = new CreatePageClass(page);
  const widgets = ["Hero Image Slider"];
  newpage.createPage();
  await page.getByRole("button", { name: "Create" }).click();

  /**
   * Editing page name
   **/
  const modal = await page.locator(".ant-modal-content");
  newpage.editPageName(modal);
  await modal.getByRole("button", { name: "Save", exact: true }).click();

  const stickyFooter = await page.locator(".sticky-page-footer");
  // const widgetspromises = [];
  for (let wid = 0; wid < widgets.length; wid++) {
    newpage.addWidgets(stickyFooter, widgets[wid]);
    // await page.waitForTimeout(2000);
  }
  newpage.save(stickyFooter);

  /**
   * deleting page
   **/
  // const pagename = await page.locator(`li[title="${newpage.pagename}"]`);
  // const pageOperationDropdown = await page.locator(
  //   ".ant-dropdown.ant-dropdown-placement-bottomLeft:not(.ant-dropdown-hidden)"
  // );
  // const menuitem = await pagename.locator(".ant-menu-title-content");
  // const btn = await menuitem.getByRole("button");
  // await menuitem.hover();
  // await btn.click();
  // await pageOperationDropdown
  //   .locator("span", { hasText: "Delete Page" })
  //   .click();
  // await page.getByRole("button", { name: "Delete", exact: true }).click();
});
