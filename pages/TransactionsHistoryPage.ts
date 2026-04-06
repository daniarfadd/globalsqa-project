import { type Page, type Locator } from '@playwright/test';

export class TransactionsHistoryPage {
    readonly page: Page;
    readonly transactionRows: Locator;
    readonly amountHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transactionRows = page.locator('table tbody tr');
        this.amountHeader = page.getByText('Amount', { exact: true });
    }

    getRowsByType(type: string): Locator {
        return this.transactionRows.filter({ hasText: type });
    }

}
