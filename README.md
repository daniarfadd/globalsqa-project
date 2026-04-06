# GlobaSQA Banking App - Playwright Automation

## About
Automated test suite for the GlobalsQA demo banking application using Playwright and TypeScript.

## Tech Stack
- Playwright
- TypeScript

## Project Structure
- tests/          → test files
- pages/          → page object classes
- screenshots/    → captured screenshots from the test

## Test Cases
- Successful deposit and transaction verification
- Successful withdrawal and transaction verification
- Invalid deposit amount (negative test)

## How to Run
Install dependencies:
```bash
npm install
```

Run all tests:
```bash
npx playwright test
```

Run with headed mode:
```bash
npx playwright test --headed
```

View HTML report:
```bash
npx playwright show-report
```

## Approach
- Page Object Model (POM) to separate selectors and actions from test logic
- `beforeEach` handles login flow shared across all tests
- Screenshots captured at key steps saved to `screenshots/` folder
- Negative test cases to ensure the application does not process with invalid deposit amounts
- Explicit waitForTimeout because the application requires a brief delay to reflect the transaction amount in the transaction history after a deposit or withdrawal is submitted
