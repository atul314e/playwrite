import { expect, test } from "@playwright/test";
import Authentication from "../pages/auth.page";

test("redirect page test", async ({ page }, testInfo) => {
  const auth = new Authentication(page);
  auth.login("atul.silori@314ecorp.com", "a");

  const redirectname = "/playwright_test";

  await page.getByRole("link", { name: "Website", exact: true }).click();
  await page
    .getByRole("menuitem", { name: "Admin caret-right" })
    .getByText("Admin")
    .click();
  await page.getByRole("link", { name: "Redirects" }).click();
  let container = page.locator(".ant-spin-container");

  /**
   *  adding new redirect
   **/

  if ((await page.locator(`input[value="${redirectname}"]`).count()) > 0) {
    await container.locator('svg[data-icon="circle-plus"]').click();
    const redirectList = await container.locator(".ant-list-item");
    const newSourceUrlInput = await page.locator("#last-added-redirect-source");
    await newSourceUrlInput.fill(redirectname);

    let lastListItem = await redirectList.last();
    let selectors = await lastListItem.locator(".ant-select-selector");
    const destinationLinkSelector = await selectors.nth(2);
    await destinationLinkSelector.click();
    let dropdown = await page.locator(
      ".ant-select-dropdown.ant-select-dropdown-placement-topLeft:not(.ant-select-dropdown-hidden)"
    );
    await dropdown.locator('div[title="Test page"]').click();
    await container.locator("span", { hasText: "Save" }).click();

    await page.waitForTimeout(1500);

    let redirectItem;

    for (let index = 0; index < (await redirectList.count()); index++) {
      const redirectListItem = await redirectList.nth(index);
      let input;
      const inputs = await redirectListItem.locator(".ant-input");
      if ((await inputs.count()) > 1) {
        input = await inputs.nth(0);
      } else {
        input = inputs;
      }
      if ((await input.inputValue()) == redirectname) {
        redirectItem = redirectListItem;
      }
    }

    await page.waitForTimeout(1500);

    /**
     *  changing language
     **/

    // lastListItem = await redirectList.last();
    selectors = await redirectItem.locator(".ant-select-selector");
    const languagetypeSelector = await selectors.nth(1);
    await languagetypeSelector.click();
    dropdown = await page.locator(
      ".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
    );
    await dropdown.locator('div[title="Spanish"]').click();
    await container.locator("span", { hasText: "Save" }).click();

    await page.waitForTimeout(1500);

    /**
     *  changing link type
     **/
    // lastListItem = await redirectList.last();
    selectors = await redirectItem.locator(".ant-select-selector");
    const linktypeSelector = await selectors.nth(0);
    await linktypeSelector.click();
    dropdown = await page.locator(
      ".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
    );
    await dropdown.locator('div[title="External Link"]').click();
    const linkInput = await container.locator('input.ant-input[value=""]');
    await linkInput.fill("www.google.com");
    await container.locator("span", { hasText: "Save" }).click();

    await page.waitForTimeout(1500);
    /**
     *  deleting redirect link
     **/
    await redirectItem.getByRole("button").click();
    await container.locator("span", { hasText: "Save" }).click();
  }
});
