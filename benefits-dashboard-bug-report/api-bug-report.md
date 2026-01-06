# PAYLOCITY API Bug Report – Benefits Dashboard

---

## API-01: GET /api/benefits returns 500 for valid request

**Endpoint**
GET /api/benefits

**Environment**

- Environment: test
- Auth: Bearer token

**Steps to reproduce**

1. Send GET request to `/api/benefits`
2. Use valid authorization header

**Expected result**

- Status code: 200
- List of benefits returned

**Actual result**

- Status code: 500
- Internal Server Error

**Response body**

```json
{
  "error": "Unexpected error"
}
```
