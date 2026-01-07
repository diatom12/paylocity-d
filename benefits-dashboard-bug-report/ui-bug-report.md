# PAYLOCITY UI Bug Report – Benefits Dashboard

## Environment

- **Test Environment**: Test
- **OS**: macOS
- **Browser**: Google Chrome
- **Login URL**: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn

---

## UI-01: First Name and Last Name columns are swapped in employee table

**Steps to reproduce**

1. Start on page https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn
2. Login to the application
3. redirect after login - Navigate to Benefits Dashboard
4. Observe employee table
5. First Name and Last Name values are displayed in opposite columns.

Expected result
First Name column displays employee’s first name and Last Name column displays employee’s last name.

Actual result
First Name and Last Name values are displayed in opposite columns.

Frequency
Always

Severity
Medium

Notes

Edit Employee modal shows correct values, indicating UI mapping issue only

---

## UI-02: Login page links to inaccessible page (401)

Steps to reproduce

1. Open Login page - https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn
2. Login form is empty
3. Text in left side - Click on “Paylocity Benefits Dashboard” link
4. User is redirected to a page where adding employee is not possible due to 401 Unauthorized response.

Expected result
The header text can serve as a logo to return to the homepage.

Actual result
User is redirected to a page where adding employee is not possible due to 401 Unauthorized response.

Frequency
Always

Severity
Medium

Notes

Expected homepage: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod

---

## UI-03: No user feedback (error message) when First and Last Name exceeds maximum length

**Steps to reproduce**

1. Open Login page - https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn
2. Login to the application - with right credentials
3. After logging in, the benefit table is displayed. https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Benefits
4. Below the table there is a button - Add employee.
5. Click on button
6. A modal window for adding a user will open
7. Fill in the FirstName field with text (Enter First and Last Name longer than 50 characters) - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
8. Click on button Add (Submit form). User addition failed, network error http status 405
9. Fill in the LastName field with text (Enter First and Last Name longer than 50 characters) - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
10. Click on button Add (Submit form). User addition failed, network error http status 405
11. Fill Dependents field with 0
12. Click on button Add (Submit form). User addition failed, network error http status 400. Error message for FirstName and LastName: "The field FirstName must be a string with a maximum length of 50."
13. The user has no visual information about the error.

**Expected result**

User is informed via UI validation message that First Name and Last Name must not exceed 50 characters.

**Actual result**

Form submission fails silently. Network errors (HTTP 405 / 400) are visible in console, but no validation message is shown to the user.

**Frequency**

Always

**Severity**

Medium

**Notes**

API error message: The field FirstName and LastName must be a string with a maximum length of 50.

---

## UI-04: First Name and Last Name fields allow numeric, special characters and single-character values

**Steps to reproduce**

1. Login to the application
2. Navigate to Benefits Dashboard
3. Click **Add** button
4. In **First Name** field enter value: `1` or `.`
5. In **Last Name** field enter value: `2` or `.`
6. Set **Dependents** to any valid number
7. Click **Add**

**Expected result**
First Name and Last Name fields should enforce meaningful name validation rules (e.g. alphabetic characters, minimum length).

**Actual result**

- Numeric and special characters are accepted
- Single-character First Name and Last Name values are accepted
- Employee is successfully created

**Frequency**
Always

**Severity**
Low

**Notes**

- Current behavior follows technical validation rules
- This represents a business / UX validation gap rather than a technical failure

---

## UI-05: Cannot submit Add New User form when required fields are empty and no required field indicators are shown

**Steps to reproduce**

1. Login to the application
2. Navigate to Benefits Dashboard
3. Click **Add** button below the employee table
4. Add Employee modal is displayed
5. Leave all input fields empty
6. Observe **Add** button state

**Expected result**

- Required fields should be clearly marked (e.g. with \* indicator or helper text)
- User should be informed which fields are required
- User should receive validation feedback when trying to submit empty form

**Actual result**

- Add button cannot be used to submit the form
- No visual indication of required fields is present
- No validation or helper message is displayed

**Frequency**
Always

**Severity**
Medium

**Notes**

- Required fields are not visually distinguishable
- User is blocked without explanation

---

## UI-06: Dependents field is required but missing UI validation and feedback for invalid values

**Steps to reproduce**

1. Login to the application
2. Navigate to Benefits Dashboard
3. Click **Add** button below the employee table
4. Add Employee modal is displayed
5. Fill **First Name** and **Last Name** with valid values
6. Leave **Dependents** field empty
7. Click **Add**

**Expected result**

User is informed that **Dependents** is a required field and form cannot be submitted without it.

**Actual result**

User cannot create an employee, but no UI validation message indicates that **Dependents** is required.

---

8. Enter a string value (e.g. `abc`) into **Dependents**
9. Click **Add**

**Actual result**

Form submission fails. Network request payload shows:

```json
{ "firstName": "1", "lastName": "1", "dependants": null }
```

Backend returns HTTP 405, but no error message is displayed in the UI.

10. Enter value 100 into **Dependents**
11. Click **Add**

**Expected result**

User is informed that allowed values for Dependents are between 0 and 32 (inclusive).

**Actual result**

Backend returns validation error (allowed range 0–32), but error message is visible only in Network tab and not in the UI.

**Frequency**

Always

**Severity**

Medium

**Notes**

- Dependents is a required parameter, but this is not communicated in the UI
- Invalid input (string) is converted to null in request payload
- Validation error messages are not surfaced to the user

---

## UI-07: Missing favicon causes 403 error

**Steps to reproduce**

1. Open application
2. Inspect network requests

**Expected result**

Favicon loads successfully.

**Actual result**

`/favicon.ico` request returns 403.

**Frequency**

Always

**Severity**

Low

**Notes**

URL: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/favicon.ico

---

## UI-08: Paylocity logo misaligned on small screen resolutions

**Steps to reproduce**

1. Resize viewport to width between 373–425 px - page https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn
2. Observe header

**Expected result**

Logo remains properly aligned.

**Actual result**

Logo is visually misaligned.

**Frequency**

Always

**Severity**

Low

**Notes**

Reproducible on responsive view in DevTools

---

## UI-09: Benefits page accessible for anonymous user without navigation option

Steps to reproduce

1. Open Login page - https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn
2. Login form is empty
3. Text in left side - Click on “Paylocity Benefits Dashboard” link
4. Open Benefits page without logging in
5. As an anonymous user, you do not see the log in button on the benefit dashboard, only an empty table is displayed and the button to add employees is active, but after entering the data, the employee is not added.

Expected result
User is redirected to login page or sees disabled UI with navigation option.

Actual result
Benefits page is accessible but contains no option to return to login page.

Frequency
Always

Severity
Medium

Notes
Add Employee action is not available due to 401

---

## UI-10: Application crashes after specific credential submission

**Steps to reproduce**

1. Open Login page
2. Login using username `admin` and password `nimda`
3. Click on Log in button
4. Page crashes
5. Click in the browser to return to the previous page
6. If you are in an incognito window, you will have a blank form when you return.
7. If you have previously successfully logged in using cookies, your login details will be added and you will be taken to your user account.

**Expected result**

User is either logged in successfully or receives error message.

**Actual result**

Page crashes; after navigating back user appears logged in, but is logged out after refresh.

**Frequency**

Always

**Severity**

High

**Notes**

- Possible cached authentication state
- Inconsistent session handling observed

---

## UI-11: Missing lang attribute on HTML element

**Steps to reproduce**

1. Open application
2. Inspect HTML element

**Expected result**

`<html>` element includes lang attribute.

**Actual result**

lang attribute is missing.

**Frequency**

Always

**Severity**

Low

**Notes**

Accessibility issue

---

## UI-12: User is not redirected to Login page after session timeout until manual refresh

**Steps to reproduce**

1. Login to the application with valid credentials
2. Navigate to Benefits Dashboard
3. Leave the application idle for a period of time (session timeout)
4. Observe that the page does not refresh automatically
5. Manually refresh the page

**Expected result**

After session timeout:

- User is automatically logged out
- User is redirected to the Login page
- Access to Benefits Dashboard is blocked for unauthenticated users

**Actual result**

- Page remains on Benefits Dashboard after session timeout
- Only after manual page refresh is the user logged out
- User stays visually on the Benefits Dashboard as an anonymous user instead of being redirected to Login page

**Frequency**

Always

**Severity**

Medium

**Notes**

- Session expiration is not handled proactively on the UI side
- User ends up in an inconsistent state (anonymous user on authenticated page)

---

## UI Improvement Suggestions

The following items are not reported as bugs, as the application behaves according to current requirements.
However, these improvements could significantly enhance usability, accessibility, and overall user experience.

### 1. Password visibility toggle

- Add an eye icon to allow users to show or hide the password during login.
- Improves usability and reduces login errors caused by mistyped passwords.

### 2. "Forgot password" / Reset password option

- Provide a visible option on the Login page to reset or recover a forgotten password.
- Aligns the application with common authentication UX standards.

### 3. Required field indicators

- Visually mark required fields (e.g. using `*` or helper text).
- Helps users understand mandatory inputs before submitting the form.

### 4. Inline validation messages

- Display validation feedback directly next to the affected input fields.
- Reduces confusion caused by silent form submission failures.

### 5. Sorting and filtering in employee table

- Add sorting (by name, dependents, net pay) and basic filtering capabilities.
- Improves usability when managing larger datasets.

### 6. Clear navigation for unauthenticated users

- Provide a visible option to return to the Login page when accessing restricted pages as an anonymous user.
- Prevents users from being stranded on inaccessible views.

```

```
