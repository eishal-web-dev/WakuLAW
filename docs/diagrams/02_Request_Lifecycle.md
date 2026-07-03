# Request Lifecycle

```text
User Click

↓

React UI

↓

Axios Request

↓

NGINX

↓

Spring Boot

↓

Authentication

↓

Authorization

↓

Business Logic

↓

FastAPI AI (Optional)

↓

MongoDB / Qdrant

↓

Spring Boot Response

↓

React UI Update
```

## Description

Every request follows the same secure processing pipeline before returning a response to the frontend.