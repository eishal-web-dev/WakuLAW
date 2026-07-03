# Login Sequence Diagram

```text
User
 │
 │ Login
 ▼
React
 │
 │ POST /login
 ▼
Spring Boot
 │
 │ Validate Credentials
 ▼
MongoDB
 │
 │ Return User
 ▼
Spring Boot
 │
 │ Generate JWT
 ▼
React
 │
 │ Store Token
 ▼
Dashboard
```

## Description

Illustrates the complete authentication flow using JWT.