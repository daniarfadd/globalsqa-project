import {type Page, type Locator} from '@playwright/test';

export class BankPage {
    readonly page: Page;
    readonly depositTab: Locator;
    readonly withdrawalTab: Locator;
    readonly amountInput: Locator;
    readonly depositButton: Locator;
    readonly withdrawalButton: Locator;
    readonly transactionButton: Locator;
    readonly message: Locator;

    constructor(page: Page) {
        this.page = page;
        this.depositTab = page.locator('button[ng-click="deposit()"]');
        this.withdrawalTab = page.locator('button[ng-click="withdrawl()"]');
        this.amountInput = page.locator('input[ng-model="amount"]');
        this.depositButton = page.locator('button[type="submit"]:has-text("Deposit")');
        this.withdrawalButton = page.locator('button[type="submit"]:has-text("Withdraw")');
        this.transactionButton = page.locator('button[ng-click="transactions()"]');
        this.message = page.locator('span[ng-show="message"]');
    }

    async clickDepositTab() {
        await this.depositTab.click();
    }

    async clickWithdrawalTab() {
        await this.withdrawalTab.click();
    }

    async depositAmount(amount: string) {
        await this.amountInput.fill(amount);
        await this.depositButton.click();
    }

    async withdrawAmount(amount: string) {
        await this.amountInput.fill(amount);
        await this.withdrawalButton.click();
    }

    async clickTransactionButton() {
        await this.transactionButton.click();
    }
}