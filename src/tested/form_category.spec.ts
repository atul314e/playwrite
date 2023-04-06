//adding and deleting a new form category
import { test, expect } from "@playwright/test";
import Authentication from "../pages/auth.page";

test("test", async ({ page }) => {
  const auth = new Authentication(page);
  auth.login("atul.silori@314ecorp.com", "a");
  await page.getByRole("link", { name: "Website", exact: true }).click();
  await page.getByText("Forms").click();
  await page
    .getByRole("menuitem", { name: "Forms caret-down" })
    .getByRole("button")
    .click();

  const name = Date.now().toString();
  await page.getByPlaceholder("Enter the category here").fill(name);
  await page.getByRole("button", { name: "Create" }).click();

  const formcategory = await page.locator(`li[title="${name}"]`);

  await formcategory.hover();
  await formcategory.getByRole("button").click();
  const dropdown = await page.locator(
    ".ant-dropdown:not(.ant-dropdown-hidden)"
  );
  await dropdown.locator("span", { hasText: "Delete Category" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
});
