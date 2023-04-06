import { test } from "@playwright/test";
import Authentication from "../pages/auth.page";

test("website forms", async ({ page }) => {
  const auth = new Authentication(page);
  const id = Date.now().toString();
  auth.login("atul.silori@314ecorp.com", "a");
  await page.getByRole("link", { name: "Website", exact: true }).click();
  await page
    .locator(".ant-layout-sider-zero-width-trigger")
    .evaluate((element) => (element.style.visibility = "hidden"));

  await page.getByText("Forms", { exact: true }).click();
  await page.getByText("All", { exact: true }).click();

  let content = await page.locator(".ant-page-header-content");
  const activeformEditor = await page
    .locator(".fb-editor-wrapper")
    .locator(".ant-tabs-tabpane-active");

  await content.getByRole("button", { name: "Add Form" }).click();

  /**
   * adding form name
   **/
  await page.waitForTimeout(1000);
  await content.locator('input[name="name"]').fill(id);

  /**
   * adding form title
   **/
  await page.waitForTimeout(1000);
  await content.locator('input[name="title"]').fill(id);

  /**
   * adding form category
   **/
  await page.waitForTimeout(1000);
  await content.locator(".ant-select-selection-search-input").click();
  const dropdown = await page.locator(
    ".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
  );
  await dropdown.locator('div[title="Appointments"]').click();

  /**
   * editing form
   **/
  await page.waitForTimeout(1000);
  const formElements = ["Select", "Radio Group", "Checkbox Group", "Submit"];

  const submitField = await activeformEditor.locator(
    ".button-field.form-field"
  );
  await submitField.hover();
  await submitField.locator('a[type="remove"]').click();
  await page
    .locator(".form-builder-dialog")
    .getByRole("button", { name: "Yes" })
    .click();

  for (let index = 0; index < formElements.length; index++) {
    await activeformEditor.getByText(`${formElements[index]}`).click();
  }

  await content.getByRole("button", { name: "Save" }).click();

  /**
   * deleting form
   **/
  await page.waitForTimeout(2500);
  const formsList = await page
    .locator(".ant-page-header-content")
    .locator(".ant-space-item");
  for (let index = 0; index < (await formsList.count()); index++) {
    const form = formsList.nth(index);
    if ((await form.getByText(`${id}`).count()) > 0) {
      await form.locator('svg[data-icon="trash-can"]').click();
      await page.getByRole("button", { name: "Delete" }).click();
      break;
    }
  }
});
