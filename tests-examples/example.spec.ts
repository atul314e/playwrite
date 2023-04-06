//example.spec.ts
import { test, expect } from '@playwright/test';
import {LoginClass} from '../src/pages/login.page'

test.beforeEach(async ({ page }) => {
  console.log('start')
  let loginclass = new LoginClass(page);
  await page.goto('https://test1.practifly.app/sprint');
  loginclass.typeCredentials()
  page.waitForSelector(".header-navigation-menu")
});

test('analytics screen', async ({ page }) => {
  //const dropdownNode = page.frameLocator('.navbar__item.dropdown.dropdown--hoverable').getByText('Node.js')
  const navigationMenu = await page.locator('.header-navigation-menu')
  const selectedElement = await navigationMenu.locator('.ant-menu-item-selected')
  
  const text = await selectedElement.getByRole('link').textContent()
  expect(text).toContain('Analytics');
});

test('filling dates in date picker', async ({page})=>{
  const antdDatePicker = await page.locator('.ant-picker.ant-picker-range.custom-range')
  let datePickerPanel = await page.locator('.ant-picker-panels')

  let activePicker = await antdDatePicker.locator('.ant-picker-input-active')
  await activePicker.click()
  let date = datePickerPanel.locator('td[title="2023-02-26"]')
  await date.nth(0).click()

  activePicker = await antdDatePicker.locator('.ant-picker-input-active')
  await activePicker.click()
  date = datePickerPanel.locator('td[title="2023-02-26"]')
  await date.nth(1).click()
  page.pause()
})