# Playwright UI and API Tests

This directory contains automated end-to-end tests for the Paylocity application, built using the Playwright framework. The tests are designed to validate the application's functionality by combining both User Interface (UI) interactions and direct Application Programming Interface (API) calls.

## Project Setup

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

First, clone the repository from GitHub to your local machine using the following command:

```bash
git clone https://github.com/diatom12/paylocity-d.git
```

Navigate into the newly created project directory:

```bash
cd paylocity-d
```

### 2. Install Dependencies

Install all the necessary project dependencies, including Playwright, by running:

```bash
npm install
```

### 3. Install Playwright Browsers

Playwright requires specific browser binaries to run the tests. Install them with the following command:

```bash
npx playwright install
```

## Running the Tests

Once the setup is complete, you can run the tests.

### Run All Tests

To execute the entire Playwright test suite, run the following command from the root of the project directory:

```bash
npx playwright test
```

The tests will run in a headless mode by default. After the test run is complete, a detailed HTML report will be generated.

### Run a Specific Test Locally

To run a single test file and see the browser interactions, you can run it in "headed" mode. This is useful for debugging. Use the following command, replacing the file path with the test you want to run:

```bash
npx playwright test tests/playwright/tests/employee.test.ts --config=tests/playwright/playwright.config.ts --headed
```

### View the Test Report

To view the results of the last test run, open the HTML report with this command:

```bash
npx playwright show-report
```
