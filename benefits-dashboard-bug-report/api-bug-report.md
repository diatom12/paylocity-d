# PAYLOCITY API Bug Report – Benefits Dashboard

---

## API-01: API returns HTTP 405 for validation errors instead of 400 Bad Request

**Environment**

- **OS**: macOS
- **Browser**: Chrome
- **Environment**: test
- **API tested via**: Browser Network tab

**Steps to reproduce**

1. Login to the application
2. Open Add Employee modal
3. Enter more than 50 characters into First Name or Last Name
4. Submit the form

**Expected result**

API should return HTTP 400 (Bad Request) for input validation errors.

**Actual result**

API returns HTTP 405 (Method Not Allowed) for validation failures.

**Frequency**

Always

**Severity**

Medium

**Notes**

- HTTP 405 is not appropriate for input validation errors
- Incorrect status code makes client-side error handling unreliable

---

## API-02: Invalid dependents input is silently converted to null in request payload

**Environment**

- **OS**: macOS
- **Browser**: Chrome
- **Environment**: test
- **API tested via**: Browser Network tab

**Steps to reproduce**

1. Login to the application
2. Open Add Employee modal
3. Enter valid First Name and Last Name
4. Enter a string value (e.g. `abc`) into Dependents field
5. Submit the form

**Expected result**

API should reject invalid data types with a clear validation error.

**Actual result**

Request payload contains:

```json
{ "firstName": "1", "lastName": "1", "dependants": null }
```

API returns HTTP 405 without explicitly stating that the input type was invalid.

**Frequency**

Always

**Severity**

Medium

**Notes**

- Input value is silently converted to null
- API does not clearly communicate the root cause of the validation failure

---

## API-03: Inconsistent validation behavior for Dependents field

**Environment**

- **OS**: macOS
- **Browser**: Chrome
- **Environment**: test
- **API tested via**: Browser Network tab

**Steps to reproduce**

1. Login to the application
2. Open Add Employee modal
3. Test different invalid Dependents values:
   - Leave field empty
   - Enter string value (e.g. `abc`)
   - Enter numeric value outside allowed range (e.g. `100`)
4. Submit the form

**Expected result**

API should apply consistent validation rules and return uniform error responses.

**Actual result**

- Empty or string value → HTTP 405
- Numeric value outside range (0–32) → validation error returned
- Different invalid inputs lead to different API behaviors

**Frequency**

Always

**Severity**

Medium

**Notes**

- Validation logic is inconsistent across different invalid inputs
- Makes client-side validation and error handling difficult

---

## API-04: DELETE employee endpoint returns 500 instead of 401 when called without authentication

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
DELETE {{baseUrl}}/Prod/api/Employees/{{employeeId}}
```

**Steps to reproduce**

1. Open Postman
2. Send DELETE request to `/api/Employees/{id}`
3. Do not include authentication header
4. Execute the request

**Expected result**

API should reject the request with **401 Unauthorized** (or 403 Forbidden) when authentication is missing.

**Actual result**

API responds with **500 Internal Server Error**.

**Response body**

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.6.1",
  "title": "An error occurred while processing your request.",
  "status": 500,
  "traceId": "0HNIE1A9FR59P"
}
```

**Frequency**

Always

**Severity**

High

**Notes**

- 500 Internal Server Error indicates server-side failure and should not be used for authentication issues
- Endpoint behavior does not align with REST API standards
- Issue confirmed using Postman

---

## API-05: DELETE employee endpoint returns 200 OK even when deleting a non-existing employee

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
DELETE {{baseUrl}}/Prod/api/Employees/{employeeId}
```

**Steps to reproduce**

1. Open Postman
2. Send DELETE request to `/api/Employees/{employeeId}` with valid authentication
3. Observe response status (200 OK)
4. Send the same DELETE request again using the same `employeeId`
5. Repeat the request multiple times

**Expected result**

- First DELETE request removes the employee and returns success (e.g. 200 OK or 204 No Content)
- Subsequent DELETE requests for the same `employeeId` should return:
  - 404 Not Found (resource no longer exists), or
  - another appropriate error status indicating the resource was already deleted

**Actual result**

- API returns **200 OK** for every DELETE request
- No indication that the employee record no longer exists

**Frequency**

Always

**Severity**

High

**Notes**

- API does not differentiate between existing and non-existing resources
- Behavior hides data integrity issues and breaks REST semantics
- Makes it impossible for API consumers to reliably determine deletion state

---

## API-06: DELETE employee endpoint returns 405 when required path parameter is missing

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
DELETE {{baseUrl}}/Prod/api/Employees/{id}
```

**Steps to reproduce**

1. Open Postman
2. Send DELETE request to `/api/Employees` (without `{id}`)
3. Do not include employee ID in the URL
4. Execute the request

**Expected result**

API should reject the request with:

- **404 Not Found** (endpoint does not exist without ID), or
- **400 Bad Request** indicating missing required path parameter

**Actual result**

API returns **405 Method Not Allowed**.

**Frequency**

Always

**Severity**

Medium

**Notes**

- According to Swagger documentation, `id` is a required path parameter
- HTTP 405 is misleading in this scenario and does not accurately describe the error
- This behavior complicates client-side error handling and debugging

---

## API-07: DELETE employee endpoint returns 405 for invalid employeeId format instead of validation error

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
DELETE {{baseUrl}}/Prod/api/Employees/{employeeId}
```

**Steps to reproduce**

1. Open Postman
2. Send DELETE request to `/api/Employees/1234`
3. Include valid authentication header
4. Execute the request

**Expected result**

API should reject the request with:

- **400 Bad Request** indicating invalid UUID format, or
- **404 Not Found** if the resource cannot be resolved

**Actual result**

API returns **405 Method Not Allowed**.

**Frequency**

Always

**Severity**

Medium

**Notes**

- Swagger specifies `employeeId` format as UUID
- HTTP 405 is misleading and does not reflect input validation failure
- Makes API error handling ambiguous for consumers

---

## API-08: GET employee endpoint returns 500 instead of 401 when called without authentication

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
GET {{baseUrl}}/Prod/api/Employees/{employeeId}
```

**Steps to reproduce**

1. Open Postman
2. Send GET request to `/api/Employees/{employeeId}` using a valid UUID
3. Do not include authentication header
4. Execute the request

**Expected result**

API should reject the request with **401 Unauthorized** (or 403 Forbidden) when authentication is missing.

**Actual result**

API responds with **500 Internal Server Error**.

**Frequency**

Always

**Severity**

High

**Notes**

- Missing authentication should not cause a server error
- Response hides the real cause of the failure
- Behavior is inconsistent with REST standards and Swagger expectations

---

## API-09: GET employee endpoint returns 500 for invalid employeeId format instead of validation error

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
GET {{baseUrl}}/Prod/api/Employees/{employeeId}
```

**Steps to reproduce**

1. Open Postman
2. Send GET request to `/api/Employees/1234`
3. Include valid authentication header
4. Execute the request

**Expected result**

API should reject the request with:

- **400 Bad Request** for invalid UUID format, or
- **404 Not Found** if the resource cannot be resolved

**Actual result**

API responds with **500 Internal Server Error**.

**Frequency**

Always

**Severity**

High

**Notes**

- Swagger defines `employeeId` format as UUID
- Invalid path parameter causes unhandled server exception
- API exposes internal error instead of controlled validation response

---

## API-10: GET employees endpoint returns 500 instead of 401 when called without authentication

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
GET {{baseUrl}}/Prod/api/Employees
```

**Steps to reproduce**

1. Open Postman
2. Send GET request to `/api/Employees`
3. Do not include authentication header
4. Execute the request

**Expected result**

API should reject the request with **401 Unauthorized** (or 403 Forbidden) when authentication is missing.

**Actual result**

API responds with **500 Internal Server Error**.

**Frequency**

Always

**Severity**

High

**Notes**

- Missing authentication should not result in a server error
- Behavior is inconsistent with REST standards
- Same issue observed across multiple endpoints, indicating a systemic authentication handling problem

---

## API-11: PUT employee endpoint ignores provided salary value and silently overwrites it

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
PUT {{baseUrl}}/Prod/api/Employees
```

**Request payload**

```json
{
  "username": "TestUser857",
  "id": "0c60bcc1-f257-4573-85e8-598c644b1d5e",
  "firstName": "testerko",
  "lastName": "testovanie",
  "dependants": 11,
  "expiration": "2026-01-07T17:37:02.060Z",
  "salary": 0
}
```

**Steps to reproduce**

1. Open Postman
2. Send PUT request to `/api/Employees` with valid authentication
3. Include request body with salary set to 0
4. Execute the request

**Expected result**

API should either:

- respect the provided salary value, or
- reject the request with a validation error if the value is not allowed, or
- document that salary is system-controlled and ignore it explicitly

**Actual result**

API responds with 200 OK and returns a different salary value than provided.

**Response body (excerpt)**

```json
{
  "salary": 53000,
  "gross": 2038.4615,
  "benefitsCost": 250,
  "net": 1788.4615
}
```

**Frequency**

Always

**Severity**

High

**Notes**

- `salary` is not marked as `readOnly` in Swagger documentation
- API silently overwrites client-provided data
- Business logic affecting salary and derived fields is not documented

---

## API-12: PUT employee endpoint accepts empty username and silently overwrites it

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
PUT {{baseUrl}}/Prod/api/Employees
```

**Request payload**

```json
{
  "username": "",
  "id": "0c60bcc1-f257-4573-85e8-598c644b1d5e",
  "firstName": "A",
  "lastName": "B",
  "dependants": 11,
  "expiration": "2026-01-07T17:37:02.060Z",
  "salary": 0
}
```

**Steps to reproduce**

1. Open Postman
2. Send PUT request to `/api/Employees` with valid authentication
3. Provide an empty string for username
4. Execute the request

**Expected result**

API should reject the request with 400 Bad Request, indicating that username is required and cannot be empty.

**Actual result**

API responds with 200 OK and returns a non-empty username value different from the request.

**Frequency**

Always

**Severity**

High

**Notes**

- `username` is marked as required in Swagger documentation
- API silently modifies client-provided data
- Behavior is undocumented and breaks API contract

---

## API-13: PUT employee endpoint applies inconsistent validation and silently overwrites invalid input values

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
PUT {{baseUrl}}/Prod/api/Employees
```

---

### Tested scenarios

The following invalid or edge-case request bodies were tested:

#### 1. Required field with minimal length

```json
{
  "username": "A",
  "id": "0c60bcc1-f257-4573-85e8-598c644b1d5e",
  "firstName": "A",
  "lastName": "A",
  "dependants": 11,
  "salary": 0
}
```

**Result:** 200 OK
API overwrote salary and recalculated derived fields.

#### 2. Required field as string "null"

```json
{
  "username": "null",
  "id": "0c60bcc1-f257-4573-85e8-598c644b1d5e",
  "firstName": "A",
  "lastName": "B",
  "dependants": 11,
  "salary": 0
}
```

**Result:** 200 OK
API ignored provided value and returned a different username.

#### 3. Required field with invalid type

```json
{
  "username": true,
  "id": "0c60bcc1-f257-4573-85e8-598c644b1d5e",
  "firstName": "A",
  "lastName": "B",
  "dependants": 11,
  "salary": 0
}
```

**Result:** 405 Method Not Allowed
Validation error returned as incorrect HTTP status.

#### 4. Read-only fields provided in request

```json
{
  "username": "user1",
  "firstName": "A",
  "lastName": "B",
  "gross": 1,
  "net": 1,
  "benefitsCost": 1
}
```

**Result:** 405 Method Not Allowed
Read-only fields are not consistently rejected with a validation error.

#### 5. Unknown / schema-level field included

```json
{
  "username": "user1",
  "id": "0c60bcc1-f257-4573-85e8-598c644b1d5e",
  "firstName": "A",
  "lastName": "B",
  "dependants": 11,
  "salary": 0,
  "additionalProperties": false
}
```

**Result:** 200 OK
Extra field was accepted despite `additionalProperties: false` in Swagger schema.

**Expected result**

- API should consistently validate request bodies according to Swagger schema
- Invalid types, missing or malformed required fields should return 400 Bad Request
- Read-only fields should be ignored explicitly or rejected with a validation error
- API should never silently overwrite client-provided values without documentation

**Actual result**

- API behavior varies depending on input:
  - Some invalid requests return 200 OK
  - Others return 405 Method Not Allowed
- Required fields are accepted with invalid values
- Client-provided data is silently modified
- Swagger contract (`required`, `additionalProperties`, `readOnly`) is not enforced

**Frequency**

Always

**Severity**

High

**Notes**

- Indicates missing centralized validation and inconsistent error handling
- Makes API behavior unpredictable for consumers
- Breaks API contract defined by Swagger documentation

---

## API-14: POST employee endpoint applies inconsistent authentication and validation rules and allows creation of invalid or duplicate records

**Environment**

- **OS**: macOS
- **Tool**: Postman
- **Environment**: test
- **Base URL**: `{{baseUrl}}`

**Endpoint**

```
POST {{baseUrl}}/Prod/api/Employees
```

---

### Tested scenarios

The following scenarios were tested using Postman:

#### 1. Missing authentication

Request sent without authentication headers

**Result:**

API returns **500 Internal Server Error**

**Expected:**

API should return **401 Unauthorized** (or 403 Forbidden).

---

#### 2. Missing ID field

```json
{
  "username": "jdoe",
  "firstName": "John",
  "lastName": "Doe",
  "dependants": 2,
  "salary": 55000
}
```

**Result:**

API returns **405 Method Not Allowed**

**Expected:**

API should either:

- accept the request and generate the ID, or
- return 400 Bad Request with a validation error

405 is not appropriate for request body validation.

---

#### 3. Required field username sent as empty string

```json
{
  "id": "0c60bcc1-f257-4573-85e8-598c644b1345",
  "username": "",
  "firstName": "John",
  "lastName": "Doe",
  "dependants": 2,
  "salary": 55000
}
```

**Result:**

API returns **200 OK** and creates the employee.

**Expected:**

API should reject the request with 400 Bad Request, as username is a required field.

---

#### 4. Duplicate employee creation using the same ID

```json
{
  "id": "0c60bcc1-f257-4573-85e8-598c644b1345",
  "username": "TestUser857",
  "firstName": "John",
  "lastName": "Doe",
  "dependants": 2,
  "salary": 55000
}
```

**Result:**

API returns **200 OK** and creates a new employee record.
In the UI, the newly created employee appears with a different ID than the one provided.

**Expected:**

API should:

- prevent duplicate creation using the same ID, or
- return 409 Conflict, or
- clearly document ID generation behavior.

**Expected result**

- API should consistently enforce authentication and return proper HTTP status codes
- All required fields (`username`, `firstName`, `lastName`) should be validated uniformly
- Empty strings for required fields should not be accepted
- Duplicate or conflicting IDs should be rejected or handled explicitly
- API should not silently modify or regenerate identifiers without documentation

**Actual result**

- Missing authentication results in 500 Internal Server Error
- Missing or invalid fields return inconsistent status codes (200, 405, 500)
- `username` validation is not enforced, while other required fields are validated
- Duplicate records can be created using the same ID, with the API silently assigning a different ID

**Frequency**

Always

**Severity**

High

**Notes**

- Indicates missing centralized authentication handling
- Required field validation is inconsistent
- Data integrity and API contract are not enforced
- Behavior does not align with Swagger documentation

```

```
