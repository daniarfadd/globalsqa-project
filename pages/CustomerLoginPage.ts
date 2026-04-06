import {type Page, type Locator} from '@playwright/test';

export class CustomerLoginPage {
    readonly page: Page;
    readonly userSelect: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userSelect = page.locator('#userSelect');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async selectUser(userName: string) { 
        await this.userSelect.selectOption({ label: userName });
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}