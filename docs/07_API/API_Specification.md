# API Specification Document

---

# 1. Document Information

| Field | Details |
|--------|---------|
| Document Name | API Specification |
| Project Name | WakuLaw – Explainable AI Legal Intelligence Platform |
| Document ID | WK-DOC-007 |
| Version | 1.0 |
| Status | Draft |
| Prepared By | Team WakuLaw |
| Reviewed By | Sir Zahid Sarwar |
| Department | Software Engineering |
| Last Updated | 03 July 2026 |

---

# 2. Revision History

| Version | Date | Author | Description |
|----------|------------|--------------|----------------|
| 1.0 | 03 July 2026 | Team WakuLaw | Initial API Specification |

---

# 3. Table of Contents

1. Introduction

2. API Standards

3. Authentication APIs

4. User APIs

5. Case APIs

6. Document APIs

7. AI APIs

8. Report APIs

9. Administration APIs

10. Error Responses

11. Status Codes

12. Versioning

---

# 4. Introduction

## Purpose

This document defines all REST APIs used by the WakuLaw platform.

It serves as the contract between the React frontend, Spring Boot backend, and FastAPI AI services.

Every endpoint specifies:

- URL
- HTTP Method
- Request Body
- Response Body
- Authentication
- Validation
- Status Codes

---

# 5. API Standards

## Base URL

```

/api/v1

```

---

## Response Format

Every API shall return the following structure.

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "timestamp": "2026-07-03T10:30:00Z"
}
```

---

## Authentication

JWT Bearer Token

Example

```

Authorization: Bearer <JWT_TOKEN>

```

---

## Content Type

```

application/json

```

---

## HTTP Methods

| Method | Purpose |
|---------|----------|
| GET | Retrieve Data |
| POST | Create |
| PUT | Replace |
| PATCH | Partial Update |
| DELETE | Delete |

---

# End of Part 1
---

# 6. Authentication APIs

The Authentication APIs provide secure user registration, authentication, authorization, session management, and password recovery.

---

# 6.1 Register User

## Endpoint

POST /api/v1/auth/register

---

## Description

Registers a new user account.

---

## Authentication

Not Required

---

## Request Body

```json
{
  "fullName": "Ahmed Khan",
  "email": "ahmed@example.com",
  "password": "StrongPassword123!",
  "role": "LAWYER"
}
```

---

## Validation Rules

- Full name is required.
- Email must be unique.
- Email format validated.
- Password must contain:
  - Minimum 8 characters
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character

---

## Success Response (201)

```json
{
  "success": true,
  "message": "Account created successfully.",
  "data": {
    "userId": "USR001"
  }
}
```

---

## Error Responses

| Status | Description |
|---------|-------------|
| 400 | Invalid request |
| 409 | Email already exists |
| 500 | Internal server error |

---

# 6.2 Login

## Endpoint

POST /api/v1/auth/login

---

## Description

Authenticates a registered user and returns a JWT access token.

---

## Authentication

Not Required

---

## Request Body

```json
{
  "email": "ahmed@example.com",
  "password": "StrongPassword123!"
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresIn": 3600
  }
}
```

---

## Error Responses

| Status | Description |
|---------|-------------|
| 401 | Invalid credentials |
| 403 | Account blocked |
| 500 | Server error |

---

# 6.3 Logout

## Endpoint

POST /api/v1/auth/logout

---

## Authentication

Required

---

## Description

Invalidates the current user session and refresh token.

---

## Success Response

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

# 6.4 Refresh Access Token

## Endpoint

POST /api/v1/auth/refresh-token

---

## Authentication

Refresh Token Required

---

## Request

```json
{
  "refreshToken": "your_refresh_token"
}
```

---

## Success Response

```json
{
  "accessToken": "new_access_token",
  "expiresIn": 3600
}
```

---

# 6.5 Forgot Password

## Endpoint

POST /api/v1/auth/forgot-password

---

## Authentication

Not Required

---

## Request

```json
{
  "email": "ahmed@example.com"
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Password reset link has been sent."
}
```

---

# 6.6 Reset Password

## Endpoint

POST /api/v1/auth/reset-password

---

## Authentication

Password Reset Token Required

---

## Request

```json
{
  "token": "reset_token",
  "newPassword": "NewStrongPassword123!"
}
```

---

## Validation Rules

- Token must be valid.
- Password must satisfy security policy.

---

# 6.7 Verify Email

## Endpoint

GET /api/v1/auth/verify-email/{token}

---

## Description

Verifies the user's email address.

---

## Success Response

```json
{
  "success": true,
  "message": "Email verified successfully."
}
```

---

# Authentication API Summary

| Method | Endpoint | Purpose |
|----------|-------------------------------|---------------------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login |
| POST | /auth/logout | Logout |
| POST | /auth/refresh-token | Refresh JWT |
| POST | /auth/forgot-password | Request password reset |
| POST | /auth/reset-password | Reset password |
| GET | /auth/verify-email/{token} | Verify email |

---

# End of Authentication APIs
---

# 7. User APIs

The User APIs allow authenticated users to manage their profile, account settings, and personal information.

---

# 7.1 Get Current User Profile

## Endpoint

GET /api/v1/users/me

---

## Description

Returns the authenticated user's profile information.

---

## Authentication

JWT Required

---

## Success Response (200)

```json
{
  "success": true,
  "message": "Profile retrieved successfully.",
  "data": {
    "id": "USR001",
    "fullName": "Ahmed Khan",
    "email": "ahmed@example.com",
    "role": "LAWYER",
    "phone": "+92-300-1234567",
    "status": "ACTIVE",
    "profileImage": "/uploads/profile/usr001.png"
  }
}
```

---

# 7.2 Get User by ID

## Endpoint

GET /api/v1/users/{userId}

---

## Authentication

JWT Required

Administrator or Owner only.

---

# 7.3 Update Profile

## Endpoint

PUT /api/v1/users/me

---

## Authentication

JWT Required

---

## Request

```json
{
  "fullName": "Ahmed Ali Khan",
  "phone": "+92-301-9876543"
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Profile updated successfully."
}
```

---

# 7.4 Upload Profile Picture

## Endpoint

POST /api/v1/users/me/avatar

---

## Authentication

JWT Required

---

## Request

Multipart Form Data

Field:

```
avatar
```

Supported Formats

- PNG
- JPG
- JPEG

Maximum Size

10 MB

---

# 7.5 Change Password

## Endpoint

POST /api/v1/users/me/change-password

---

## Authentication

JWT Required

---

## Request

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

---

## Validation Rules

- Current password must be correct.
- New password must satisfy password policy.
- New password must differ from old password.

---

# 7.6 Delete Account

## Endpoint

DELETE /api/v1/users/me

---

## Authentication

JWT Required

---

## Description

Soft deletes the authenticated user's account.

---

# 7.7 User Dashboard

## Endpoint

GET /api/v1/users/me/dashboard

---

## Authentication

JWT Required

---

## Description

Returns a summary of the authenticated user's activity.

---

## Example Response

```json
{
  "totalCases": 18,
  "activeCases": 7,
  "reportsGenerated": 42,
  "recentPredictions": 10,
  "notifications": 4
}
```

---

# 7.8 Notification Preferences

## Endpoint

PUT /api/v1/users/me/preferences

---

## Authentication

JWT Required

---

## Request

```json
{
  "emailNotifications": true,
  "systemNotifications": true,
  "aiReports": true
}
```

---

# 7.9 User Activity History

## Endpoint

GET /api/v1/users/me/activity

---

## Authentication

JWT Required

---

## Description

Returns recent user activities.

Examples

- Login
- Uploaded Document
- Prediction Generated
- Report Downloaded
- Summary Created

---

# User API Summary

| Method | Endpoint | Purpose |
|----------|------------------------------------|------------------------------|
| GET | /users/me | Current user profile |
| GET | /users/{userId} | User by ID |
| PUT | /users/me | Update profile |
| POST | /users/me/avatar | Upload avatar |
| POST | /users/me/change-password | Change password |
| DELETE | /users/me | Delete account |
| GET | /users/me/dashboard | Dashboard |
| PUT | /users/me/preferences | Notification preferences |
| GET | /users/me/activity | User activity history |

---

# End of User APIs
---

# 8. Case Management APIs

The Case Management APIs allow users to create, manage, analyze, and organize legal cases.

---

# 8.1 Create Case

## Endpoint

POST /api/v1/cases

---

## Description

Creates a new legal case.

---

## Authentication

JWT Required

---

## Request Body

```json
{
  "title": "Property Ownership Dispute",
  "description": "Dispute regarding ownership of residential property.",
  "caseType": "Civil",
  "courtName": "Peshawar High Court",
  "jurisdiction": "Pakistan"
}
```

---

## Success Response (201)

```json
{
  "success": true,
  "message": "Case created successfully.",
  "data": {
    "caseId": "CASE001"
  }
}
```

---

# 8.2 Get All Cases

## Endpoint

GET /api/v1/cases

---

## Authentication

JWT Required

---

## Query Parameters

| Parameter | Description |
|-----------|-------------|
| page | Page number |
| size | Page size |
| search | Search keyword |
| status | ACTIVE / CLOSED |
| caseType | Civil, Criminal, Family, etc. |

---

# 8.3 Get Case by ID

## Endpoint

GET /api/v1/cases/{caseId}

---

## Authentication

JWT Required

---

## Description

Returns complete case information.

---

# 8.4 Update Case

## Endpoint

PUT /api/v1/cases/{caseId}

---

## Authentication

JWT Required

---

# 8.5 Archive Case

## Endpoint

PATCH /api/v1/cases/{caseId}/archive

---

## Authentication

JWT Required

---

# 8.6 Restore Case

## Endpoint

PATCH /api/v1/cases/{caseId}/restore

---

## Authentication

JWT Required

---

# 8.7 Delete Case

## Endpoint

DELETE /api/v1/cases/{caseId}

---

## Authentication

Administrator or Owner

---

## Description

Performs a soft delete.

---

# 8.8 Upload Documents

## Endpoint

POST /api/v1/cases/{caseId}/documents

---

## Authentication

JWT Required

---

## Content Type

multipart/form-data

---

## Supported Files

- PDF
- DOCX
- TXT
- PNG
- JPG
- JPEG

Maximum Size

100 MB

---

# 8.9 Get Documents

## Endpoint

GET /api/v1/cases/{caseId}/documents

---

## Authentication

JWT Required

---

# 8.10 Delete Document

## Endpoint

DELETE /api/v1/documents/{documentId}

---

# 8.11 Upload Evidence

## Endpoint

POST /api/v1/cases/{caseId}/evidence

---

## Authentication

JWT Required

---

## Supported Evidence

- Documents
- Images
- Videos
- Audio
- Contracts
- Witness Statements

---

# 8.12 Get Evidence

## Endpoint

GET /api/v1/cases/{caseId}/evidence

---

# 8.13 Timeline Events

## Endpoint

GET /api/v1/cases/{caseId}/timeline

---

## Description

Returns AI-generated chronological timeline.

---

# 8.14 Hearings

## Endpoint

GET /api/v1/cases/{caseId}/hearings

---

# 8.15 Judgments

## Endpoint

GET /api/v1/cases/{caseId}/judgments

---

# 8.16 Search Cases

## Endpoint

GET /api/v1/cases/search

---

## Query Parameters

- keyword
- court
- caseType
- year
- status

---

# 8.17 Case Statistics

## Endpoint

GET /api/v1/cases/statistics

---

## Example Response

```json
{
  "totalCases": 42,
  "activeCases": 18,
  "closedCases": 20,
  "archivedCases": 4
}
```

---

# 8.18 Case Workspace (Enterprise API)

## Endpoint

GET /api/v1/workspaces/cases/{caseId}

---

## Authentication

JWT Required

---

## Description

Returns the complete AI workspace for a legal case.

This endpoint is optimized for the React frontend and aggregates information from multiple services into a single response.

---

## Response Structure

```json
{
  "case": {},
  "documents": [],
  "evidence": [],
  "timeline": [],
  "prediction": {},
  "summary": {},
  "similarCases": [],
  "strategyAnalysis": {},
  "reports": [],
  "notifications": []
}
```

---

## Benefits

- Single API request
- Faster dashboard loading
- Reduced network traffic
- Simplified frontend state management
- Better user experience

---

# Case Management API Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /cases | Create case |
| GET | /cases | List cases |
| GET | /cases/{caseId} | Get case |
| PUT | /cases/{caseId} | Update case |
| PATCH | /cases/{caseId}/archive | Archive case |
| PATCH | /cases/{caseId}/restore | Restore case |
| DELETE | /cases/{caseId} | Delete case |
| POST | /cases/{caseId}/documents | Upload documents |
| GET | /cases/{caseId}/documents | Get documents |
| DELETE | /documents/{documentId} | Delete document |
| POST | /cases/{caseId}/evidence | Upload evidence |
| GET | /cases/{caseId}/evidence | Get evidence |
| GET | /cases/{caseId}/timeline | Timeline |
| GET | /cases/{caseId}/hearings | Hearings |
| GET | /cases/{caseId}/judgments | Judgments |
| GET | /cases/search | Search cases |
| GET | /cases/statistics | Statistics |
| GET | /workspaces/cases/{caseId} | Complete case workspace |

---

# End of Case Management APIs
---

# 9. Artificial Intelligence APIs

The Artificial Intelligence APIs provide intelligent legal analysis through the WakuLaw AI Platform. These APIs communicate with the AI Orchestrator, which coordinates the execution of individual AI modules.

All AI APIs require JWT authentication.

---

# 9.1 AI Orchestrator

## Endpoint

POST /api/v1/ai/analyze

---

## Description

Executes a complete AI workflow for a legal case.

The AI Orchestrator automatically determines which AI modules must execute and combines the results into one unified response.

---

## Authentication

JWT Required

---

## Request Body

```json
{
  "caseId": "CASE001",
  "workflow": "COMPLETE_ANALYSIS"
}
```

---

## Success Response (200)

```json
{
  "success": true,
  "message": "Analysis completed successfully.",
  "data": {
    "requestId": "REQ001",
    "processingTime": 7.42,
    "prediction": {},
    "summary": {},
    "timeline": {},
    "similarCases": [],
    "strategyAnalysis": {},
    "reports": []
  }
}
```

---

# 9.2 Court Case Prediction

## Endpoint

POST /api/v1/ai/predict

---

## Description

Predicts the likely outcome of a legal case.

---

## Request

```json
{
  "caseId":"CASE001"
}
```

---

## Response

```json
{
  "prediction":"Plaintiff Likely to Win",
  "confidence":0.92,
  "modelVersion":"v1.0"
}
```

---

# 9.3 Similar Case Retrieval

## Endpoint

POST /api/v1/ai/similar-cases

---

## Description

Returns historically similar legal cases ranked by semantic similarity.

---

## Request

```json
{
  "caseId":"CASE001",
  "topK":10
}
```

---

# 9.4 Legal Document Summarization

## Endpoint

POST /api/v1/ai/summarize

---

## Description

Generates AI summaries for legal documents.

---

## Request

```json
{
  "documentId":"DOC001",
  "summaryType":"Executive"
}
```

---

# 9.5 Explainable AI

## Endpoint

GET /api/v1/ai/predictions/{predictionId}/explain

---

## Description

Returns an explanation describing why the AI generated a prediction.

---

## Response

```json
{
  "importantFeatures":[],
  "confidenceExplanation":"...",
  "relatedCases":[]
}
```

---

# 9.6 Evidence Analysis

## Endpoint

POST /api/v1/ai/evidence/analyze

---

## Description

Evaluates uploaded evidence.

---

## Request

```json
{
  "caseId":"CASE001"
}
```

---

## Response

```json
{
  "strength":"High",
  "missingEvidence":[],
  "recommendations":[]
}
```

---

# 9.7 Contradiction Detection

## Endpoint

POST /api/v1/ai/contradictions

---

## Description

Detects conflicting statements across legal documents.

---

## Request

```json
{
  "caseId":"CASE001"
}
```

---

## Response

```json
{
  "contradictions":[]
}
```

---

# 9.8 Timeline Intelligence

## Endpoint

POST /api/v1/ai/timeline

---

## Description

Constructs an AI-generated chronological timeline.

---

## Response

```json
{
  "events":[]
}
```

---

# 9.9 Legal Strategy Analyzer

## Endpoint

POST /api/v1/ai/strategy-analysis

---

## Description

Generates a structured legal analysis by combining outputs from multiple AI modules.

---

## Response

```json
{
  "strengths":[],
  "reviewAreas":[],
  "timelineInsights":[],
  "confidence":0.91
}
```

---

# 9.10 Courtroom Simulation

## Endpoint

POST /api/v1/ai/courtroom-simulation

---

## Description

Generates an educational courtroom simulation.

---

## Response

```json
{
  "plaintiffArguments":[],
  "defendantArguments":[],
  "judicialObservations":[]
}
```

---

# 9.11 AI Workflow Builder

## Endpoint

POST /api/v1/ai/workflows

---

## Description

Executes a custom AI workflow selected by the user.

---

## Request

```json
{
  "caseId":"CASE001",
  "modules":[
    "PREDICTION",
    "SUMMARY",
    "TIMELINE",
    "STRATEGY"
  ]
}
```

---

# 9.12 AI Memory

## Endpoint

GET /api/v1/ai/memory/{caseId}

---

## Description

Returns the persistent AI memory associated with a legal case.

---

## Response

```json
{
  "predictionHistory":[],
  "summaries":[],
  "timeline":[],
  "conversations":[]
}
```

---

# 9.13 AI Conversation

## Endpoint

POST /api/v1/ai/chat

---

## Description

Conversational AI interface for legal research and case discussion.

---

## Request

```json
{
  "caseId":"CASE001",
  "message":"Summarize the strongest evidence."
}
```

---

## Response

```json
{
  "response":"...",
  "conversationId":"CON001"
}
```

---

# 9.14 AI Model Information

## Endpoint

GET /api/v1/ai/models

---

## Description

Returns deployed AI models.

---

# 9.15 AI Health Check

## Endpoint

GET /api/v1/ai/health

---

## Description

Checks AI service availability.

---

## Example Response

```json
{
  "status":"UP",
  "prediction":"UP",
  "summarization":"UP",
  "similarity":"UP",
  "chat":"UP"
}
```

---

# Artificial Intelligence API Summary

| Method | Endpoint | Purpose |
|---------|----------|---------|
| POST | /ai/analyze | Complete AI analysis |
| POST | /ai/predict | Court case prediction |
| POST | /ai/similar-cases | Similar cases |
| POST | /ai/summarize | Document summary |
| GET | /ai/predictions/{id}/explain | Explain prediction |
| POST | /ai/evidence/analyze | Evidence analysis |
| POST | /ai/contradictions | Detect contradictions |
| POST | /ai/timeline | Timeline generation |
| POST | /ai/strategy-analysis | Strategy analysis |
| POST | /ai/courtroom-simulation | Courtroom simulation |
| POST | /ai/workflows | Custom workflow |
| GET | /ai/memory/{caseId} | AI memory |
| POST | /ai/chat | AI assistant |
| GET | /ai/models | AI models |
| GET | /ai/health | AI health |

---

# End of Artificial Intelligence APIs
---

# 10. Report APIs

The Report APIs manage the generation, retrieval, export, download, and history of AI-generated legal reports.

---

# 10.1 Generate Report

## Endpoint

POST /api/v1/reports/generate

---

## Description

Generates a professional legal report based on AI analysis.

---

## Authentication

JWT Required

---

## Request

```json
{
  "caseId": "CASE001",
  "reportType": "COMPLETE_ANALYSIS"
}
```

---

## Supported Report Types

- COMPLETE_ANALYSIS
- PREDICTION
- SUMMARY
- EVIDENCE
- TIMELINE
- STRATEGY

---

## Success Response

```json
{
  "success": true,
  "data": {
    "reportId": "REP001",
    "status": "GENERATED"
  }
}
```

---

# 10.2 Get Report

## Endpoint

GET /api/v1/reports/{reportId}

---

## Description

Returns report details.

---

# 10.3 Download Report

## Endpoint

GET /api/v1/reports/{reportId}/download

---

## Description

Downloads a generated report.

---

## Supported Formats

- PDF
- DOCX

---

# 10.4 Export Report

## Endpoint

POST /api/v1/reports/{reportId}/export

---

## Request

```json
{
  "format":"PDF"
}
```

---

# 10.5 Report History

## Endpoint

GET /api/v1/reports/history

---

## Description

Returns previously generated reports.

---

# 10.6 Delete Report

## Endpoint

DELETE /api/v1/reports/{reportId}

---

# Report API Summary

| Method | Endpoint | Purpose |
|---------|----------|---------|
| POST | /reports/generate | Generate report |
| GET | /reports/{reportId} | View report |
| GET | /reports/{reportId}/download | Download report |
| POST | /reports/{reportId}/export | Export report |
| GET | /reports/history | Report history |
| DELETE | /reports/{reportId} | Delete report |

---

# 11. Administration APIs

The Administration APIs allow administrators to manage users, AI models, datasets, system settings, and platform monitoring.

---

# 11.1 User Management

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | /admin/users | List users |
| GET | /admin/users/{userId} | View user |
| PATCH | /admin/users/{userId}/status | Update status |
| DELETE | /admin/users/{userId} | Delete user |

---

# 11.2 AI Model Management

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | /admin/models | List models |
| POST | /admin/models | Register model |
| PUT | /admin/models/{modelId} | Update model |
| DELETE | /admin/models/{modelId} | Archive model |

---

# 11.3 Dataset Management

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | /admin/datasets | List datasets |
| POST | /admin/datasets | Register dataset |
| PUT | /admin/datasets/{datasetId} | Update dataset |
| DELETE | /admin/datasets/{datasetId} | Archive dataset |

---

# 11.4 System Settings

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | /admin/settings | Get settings |
| PUT | /admin/settings | Update settings |

---

# 11.5 Monitoring

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | /admin/system-health | Platform health |
| GET | /admin/audit-logs | Audit logs |
| GET | /admin/activity-logs | Activity logs |

---

# 12. Standard Error Responses

| HTTP Code | Description |
|-----------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 413 | Payload Too Large |
| 422 | Validation Failed |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

# 13. API Versioning

Current Version

```
v1
```

Future versions

```
v2
v3
```

Older API versions shall remain backward compatible for an appropriate deprecation period.

---

# 14. API Security

The WakuLaw APIs implement:

- JWT Authentication
- Refresh Tokens
- Role-Based Access Control (RBAC)
- HTTPS Only
- Request Validation
- Rate Limiting
- Input Sanitization
- Audit Logging
- File Type Validation
- Malware Scanning (Future)

---

# 15. OpenAPI Compliance

The WakuLaw REST APIs are designed to comply with the OpenAPI 3.1 specification.

Each endpoint shall support:

- Swagger UI
- OpenAPI JSON
- Request Validation
- Response Validation
- Authentication Documentation
- Example Requests
- Example Responses

This enables automatic generation of API documentation, client SDKs, and testing tools.

---

# End of API Specification Document

**Document ID:** WK-DOC-007

**Version:** 1.0

**Status:** Draft

**Prepared By:** Team WakuLaw

**Reviewed By:** Sir Zahid Sarwar