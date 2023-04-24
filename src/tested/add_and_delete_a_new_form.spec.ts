//adding a new form, adding all the possible fields to it, deleting the new form
import { test, expect } from "@playwright/test";

import Authentication from "../pages/auth.page";

test("test", async ({ page }) => {
  const auth = new Authentication(page);
  auth.login("atul.silori@314ecorp.com", "a");

  await page.getByRole("link", { name: "Website", exact: true }).click();

  await page
    .locator(".ant-layout-sider-zero-width-trigger")
    .evaluate((element) => (element.style.visibility = "hidden"));
  await page.getByText("Forms").click();
  await page.getByRole("link", { name: "Playwright testing" }).click();
  await page.getByRole("button", { name: "Add Form" }).first().click();

  const formName = Date.now().toString();
  const formTitle = "form test";
  let content = await page.locator(".ant-page-header-content");

  const activeformEditor = await page
    .locator(".fb-editor-wrapper")
    .locator(".ant-tabs-tabpane-active");

  await page.waitForTimeout(2000);

  /**
   * adding form name
   **/
  await content.getByLabel("Form Name").fill(formName);

  /**
   * adding form title
   **/
  await content.getByLabel("Form Title").fill(formTitle);

  /**
   * editing form
   **/
  const formElements = ["Select", "Radio Group", "Checkbox Group", "Submit"];
  await page.waitForTimeout(1000);
  const submitField = await activeformEditor.locator(
    ".button-field.form-field"
  );

  // removing submit field so we can add form elements in given order
  await submitField.hover();
  await submitField.locator('a[type="remove"]').click();
  await page
    .locator(".form-builder-dialog")
    .getByRole("button", { name: "Yes" })
    .click();

  await page.waitForTimeout(1000);

  // adding form elements
  for (let index = 0; index < formElements.length; index++) {
    await activeformEditor
      .locator("li", { hasText: formElements[index] })
      .click();
    await page.waitForTimeout(1000);
  }

  // saving form
  await content.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(1000);

  // discarding the page not saved modal, opens in safari after form is saved
  const discardButton = await page.getByRole("button", { name: "Discard" });
  if (await discardButton.isVisible()) {
    await discardButton.click();
  }

  /**
   * deleting form
   **/
  const formsList = await page
    .locator(".ant-page-header-content")
    .locator(".ant-space-item");

  // iterating over formlist
  for (let index = 0; index < (await formsList.count()); index++) {
    const form = await formsList.nth(index);
    const form_name = await form.locator(".ant-col").nth(0);
    // finding new added form
    if ((await form_name.innerText()) == formName) {
      const form_actions = await form.locator(".ant-col").nth(1);
      await form_actions.locator('svg[data-icon="trash-can"]').click();
      // deleting the form
      await page.getByRole("button", { name: "Delete" }).click();
      break;
    }
    await page.waitForTimeout(1000);
  }
});
