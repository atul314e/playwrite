import type { Page } from "@playwright/test";

class Form {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async elementToTypeMapping() {
    return {
      Select: "select",
      "Radio Group": "radio-group",
      "Checkbox Group": "checkbox-group",
      Submit: "button-7011",
    };
  }
}

export default Form;
