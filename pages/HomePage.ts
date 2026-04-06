import {type Page, type Locator} from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly customerLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customerLoginButton = this.page.getByRole('button', { name: 'Customer Login' });

  }

  async navigate() {
    await this.page.goto('');
  }

  async clickCustomerLogin() {
    await this.customerLoginButton.click();
  }
}