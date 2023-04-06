import { expect, test } from "@playwright/test";
import Authentication from "../pages/auth.page";

test.describe("testing navigation secondary menu", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const auth = new Authentication(page);
    auth.login("atul.silori@314ecorp.com", "a");

    await page.getByRole("link", { name: "Website", exact: true }).click();
    await page
      .getByRole("menuitem", { name: "Admin caret-right" })
      .getByText("Admin")
      .click();
    await page.getByRole("link", { name: "Navigation Menu" }).click();
    await page.waitForTimeout(1500);
    await page.getByText("Secondary Menu").click();
  });

  test("test desktop tab", async ({ page }) => {
    const secondaryMenuTabPane = page.locator(".ant-tabs-tabpane-active");
    // const secondaryMenuTabPane = activeTabPanes.nth(0);

    const desktopTabContent = secondaryMenuTabPane.locator(
      ".ant-tabs-tabpane-active"
    );

    /**
     * toggle Social Media Icon
     */
    await desktopTabContent
      .locator("span", {
        hasText: "Social Media Icons",
      })
      .click();

    /**
     * toggle Centered Content
     */
    await desktopTabContent
      .locator("span", {
        hasText: "Centered Content",
      })
      .click();

    /**
     * add content to texteditor
     */
    await desktopTabContent.locator(".ck-editor__editable.ck-blurred").click();
    await page.keyboard.type(
      `test_content_${Math.floor(Math.random() * Math.pow(10, 4))} `
    );
    await page.getByRole("button", { name: "Save" }).click();
  });

  test("test mobile tab", async ({ page }) => {
    const secondaryMenuTabPane = page.locator(".ant-tabs-tabpane-active");

    /**
     * changing tab from desktop to mobile
     */
    await secondaryMenuTabPane
      .locator('div[role="tab"]', { hasText: "Mobile" })
      .click();

    const mobileTabContent = secondaryMenuTabPane.locator(
      ".ant-tabs-tabpane-active"
    );

    /**
     * toggle Mobile tab Enable Secondary Menu
     */
    await mobileTabContent
      .locator("span", {
        hasText: "Enable Secondary Menu",
      })
      .click();

    /**
     * centered content is disabled
     */
    const isdisabled = await mobileTabContent
      .locator("span", {
        hasText: "Centered Content",
      })
      .isDisabled();
    expect(isdisabled).toBe(true);

    /**
     * enable and toggle centered content
     */
    await mobileTabContent
      .locator("span", {
        hasText: "Enable Secondary Menu",
      })
      .click();

    await mobileTabContent
      .locator("span", {
        hasText: "Centered Content",
      })
      .click();

    /**
     * add content to texteditor
     */
    //   await page.waitForTimeout(4000); // wait for save to fade out
    await mobileTabContent.locator(".ck-editor__editable.ck-blurred").click();
    await page.keyboard.type(
      `test_content_${Math.floor(Math.random() * Math.pow(10, 4))} `
    );
    await page.getByRole("button", { name: "Save" }).click();
  });
});
