import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { BankPage } from '../pages/BankPage';
import { TransactionsHistoryPage } from '../pages/TransactionsHistoryPage';

let homePage: HomePage;
let customerLoginPage: CustomerLoginPage;
let bankPage: BankPage;
let transactionsHistoryPage: TransactionsHistoryPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    customerLoginPage = new CustomerLoginPage(page);
    bankPage = new BankPage(page);
    transactionsHistoryPage = new TransactionsHistoryPage(page);

    // Navigate to the homepage and click on the customer login button
    await homePage.navigate();
    await expect(page).toHaveTitle(/XYZ Bank/);
    await homePage.clickCustomerLogin();
    // select the user and click on the login button
    await customerLoginPage.selectUser('Harry Potter');
    await customerLoginPage.clickLogin();
});


test('Successfully deposit money and shown in transaction history', async ({ page }) => {

    await page.screenshot({ path: 'screenshots/successfully-landed-on-homepage.png', fullPage: true });

    // click on the deposit tab, input the amount and click on the deposit button
    await bankPage.clickDepositTab();
    await page.screenshot({ path: 'screenshots/deposit-login-success.png', fullPage: true });
    await bankPage.depositAmount('100');
    await page.screenshot({ path: 'screenshots/input-success.png', fullPage: true });
    await expect(bankPage.message).toHaveText('Deposit Successful');

    // Wait for exactly 800 mseconds
    await page.waitForTimeout(800);

    // click on the transaction button and verify that the amount of deposit is displayed in the transaction history
    await bankPage.clickTransactionButton();
    await expect(transactionsHistoryPage.transactionRows).not.toHaveCount(0);
    await expect(transactionsHistoryPage.getRowsByType('Credit')).toContainText('100');
    await page.screenshot({ path: 'screenshots/amount-of-deposit-displayed.png', fullPage: true });
});


test('Successfully withdraw money and updated in transaction history', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/withdrawal-login-success.png', fullPage: true });

    // click on the deposit tab, input the amount and click on the deposit button
    await bankPage.clickDepositTab();
    await page.screenshot({ path: 'screenshots/withdrawal-login-success.png', fullPage: true });
    await bankPage.depositAmount('900');
    await expect(bankPage.message).toHaveText('Deposit Successful');

    // Wait for exactly 800 mseconds
    await page.waitForTimeout(800);

    // click on the withdrawal tab, input the amount and click on the withdrawal button
    await bankPage.clickWithdrawalTab();
    await page.waitForTimeout(800);
    await bankPage.withdrawAmount('50');
    await expect(bankPage.message).toHaveText('Transaction successful');
    await page.screenshot({ path: 'screenshots/successful-withdrawal.png', fullPage: true });

    // Wait for exactly 800 mseconds
    await page.waitForTimeout(800);

    // click on the transaction button and verify that the amount of withdrawal is displayed in the transaction history
    await bankPage.clickTransactionButton();
    await expect(transactionsHistoryPage.transactionRows).not.toHaveCount(0);
    await expect(transactionsHistoryPage.getRowsByType('Debit')).toContainText('50');
    await page.screenshot({ path: 'screenshots/amount-of-withdrawal-displayed.png', fullPage: true });
});

test('Should not deposit with invalid amount', async ({ page }) => {
  await bankPage.clickDepositTab();
  await bankPage.depositAmount('');
  await expect(bankPage.message).not.toBeVisible();
});

