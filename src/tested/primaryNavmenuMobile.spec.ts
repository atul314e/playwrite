import { test, expect } from "@playwright/test";

import Authentication from "../pages/auth.page";

test("mobile navigation", async ({ page }) => {
  const auth = new Authentication(page);
  auth.login("atul.silori@314ecorp.com", "a");
  await page.getByRole("link", { name: "Website", exact: true }).click();
  await page
    .getByRole("menuitem", { name: "Admin caret-right" })
    .getByText("Admin")
    .click();

  await page.getByRole("link", { name: "Navigation Menu" }).click();
  await page.getByRole("tab", { name: "Mobile" }).click();
  const mobileTabLocator = await page.locator("#rc-tabs-0-panel-mobile");
  const listItem = await mobileTabLocator.locator(".ant-list-item");
  const headerItem = await listItem.nth(1);
  const footerItem = await listItem.nth((await listItem.count()) - 1);

  const modal = await page.locator(".ant-modal-content"); // ant-checkbox-wrapper

  await headerItem.locator(".ant-checkbox-wrapper").click();
  await headerItem.locator(".anticon-edit").click();
  const checkboxes = await modal.locator(".ant-checkbox-input");
  await checkboxes.nth(0).click();
  let checkboxState = await checkboxes.nth(1).isChecked();
  if (checkboxState) {
    let isdisabled = await modal.locator(".ant-switch").isDisabled();
    expect(isdisabled).toBe(false);
    await checkboxes.nth(1).click();
    isdisabled = await modal.locator(".ant-switch").isDisabled();
    expect(isdisabled).toBe(true);
  } else {
    let isdisabled = await modal.locator(".ant-switch").isDisabled();
    expect(isdisabled).toBe(true);
    await checkboxes.nth(1).click();
    isdisabled = await modal.locator(".ant-switch").isDisabled();
    expect(isdisabled).toBe(false);
    await modal.locator(".ant-switch-handle").click();
  }
  await modal.getByRole("button", { name: "Done" }).click();

  await footerItem.locator(".ant-checkbox-wrapper").click();
  await footerItem.locator(".anticon-edit").click();
  await checkboxes.nth(0).click();
  checkboxState = await checkboxes.nth(1).isChecked();
  if (checkboxState) {
    let isdisabled = await modal.locator(".ant-switch").isDisabled();
    expect(isdisabled).toBe(false);
    await checkboxes.nth(1).click();
    isdisabled = await modal.locator(".ant-switch").isDisabled();
    expect(isdisabled).toBe(true);
  } else {
    let isdisabled = await modal.locator(".ant-switch").isDisabled();
    expect(isdisabled).toBe(true);
    await checkboxes.nth(1).click();
    isdisabled = await modal.locator(".ant-switch").isDisabled();
    expect(isdisabled).toBe(false);
    await modal.locator(".ant-switch-handle").click();
  }
  await modal.getByRole("button", { name: "Done" }).click();

  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(3000);
});
