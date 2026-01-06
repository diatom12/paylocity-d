# PAYLOCITY UI Bug Report – Benefits Dashboard

---

## UI-01: Page crashes when opening Benefits detail

**Environment**

- OS: macOS 14.2
- Browser: Chrome 120
- Environment: test

**Steps to reproduce**

1. Login to the application
2. Navigate to Benefits Dashboard
3. Click on a benefit card

**Expected result**
Benefit detail page is displayed.

**Actual result**
White screen is shown, console error appears.

**Frequency**
Always

**Severity**
High

**Notes**

- Console error: `TypeError: undefined is not a function`
