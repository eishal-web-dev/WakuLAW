# Database Design Document

---

# 1. Document Information

| Field | Details |
|--------|---------|
| Document Name | Database Design Document |
| Project Name | WakuLaw – Explainable AI Legal Intelligence Platform |
| Document ID | WK-DOC-006 |
| Version | 1.0 |
| Status | Draft |
| Prepared By | Team WakuLaw |
| Reviewed By | Sir Zahid Sarwar |
| Department | Software Engineering |
| Last Updated | 03 July 2026 |

---

# 2. Revision History

| Version | Date | Author | Description |
|----------|------------|--------------|---------------------------|
| 1.0 | 03 July 2026 | Team WakuLaw | Initial Database Design |

---

# 3. Table of Contents

1. Introduction

2. Database Overview

3. Database Architecture

4. Collections

5. Relationships

6. Index Strategy

7. Validation Rules

8. Backup Strategy

9. Security

10. Future Expansion

---

# 4. Introduction

## Purpose

This document defines the MongoDB database architecture used by the WakuLaw platform.

It describes the document collections, logical relationships, indexing strategy, validation rules, backup procedures, and security mechanisms that support the AI Legal Intelligence Platform.

The database has been designed to efficiently support legal document storage, AI-generated metadata, semantic search, audit logging, and scalable future enhancements.

---

# 5. Database Overview

The WakuLaw platform uses MongoDB as its primary database because of its flexibility in handling structured and semi-structured legal information.

MongoDB was selected because it provides:

- Flexible document storage
- Horizontal scalability
- High performance
- JSON/BSON document model
- Efficient indexing
- Excellent Spring Boot integration

---

# 6. Database Architecture

The WakuLaw database follows a document-oriented architecture.

Major database domains include:

- Identity Management
- Case Management
- AI Intelligence
- Reporting
- Notifications
- Administration
- Audit Logging

Each domain consists of multiple collections responsible for storing related information.

---

# 7. Database Technology Stack

| Component | Technology |
|------------|------------|
| Database | MongoDB |
| Driver | MongoDB Java Driver |
| Spring Integration | Spring Data MongoDB |
| Storage Format | BSON |
| Backup | MongoDB Atlas Backup |
| Administration | MongoDB Compass |
| ORM Layer | Spring Data MongoDB |
---

# 8. Database Collections

The WakuLaw platform organizes data into logical MongoDB collections. Each collection stores information related to a specific business domain while maintaining references to associated collections where appropriate.

---

# 8.1 Users Collection

## Collection Name

users

---

## Purpose

Stores all registered users of the WakuLaw platform.

---

## Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| _id | ObjectId | Yes | Unique identifier |
| fullName | String | Yes | User's full name |
| email | String | Yes | Unique email address |
| passwordHash | String | Yes | Encrypted password |
| role | String | Yes | User role |
| phone | String | No | Contact number |
| profileImage | String | No | Profile image URL |
| status | String | Yes | ACTIVE / BLOCKED / PENDING |
| createdAt | Date | Yes | Account creation date |
| updatedAt | Date | Yes | Last update |

---

## Indexes

- email (Unique)
- role
- status

---

## Validation Rules

- Email must be unique.
- Password must be hashed.
- Role must exist.
- Email format validated.

---

## Relationships

One User

↓

Many Cases

↓

Many Reports

↓

Many Notifications

↓

Many Audit Logs

---

## Example Document

```json
{
  "_id": "USR001",
  "fullName": "Ahmed Khan",
  "email": "ahmed@example.com",
  "passwordHash": "$2a$10$exampleHash",
  "role": "LAWYER",
  "status": "ACTIVE",
  "createdAt": "2026-07-03T10:00:00Z"
}
```

---

# 8.2 Cases Collection

## Collection Name

cases

---

## Purpose

Stores legal case information uploaded by users.

---

## Fields

| Field | Type | Required |
|--------|------|----------|
| _id | ObjectId | Yes |
| userId | ObjectId | Yes |
| caseTitle | String | Yes |
| caseType | String | Yes |
| court | String | Yes |
| description | String | Yes |
| filingDate | Date | No |
| status | String | Yes |
| createdAt | Date | Yes |
| updatedAt | Date | Yes |

---

## Indexes

- userId
- caseType
- court
- filingDate

---

## Relationships

One Case

↓

Many Documents

↓

Many Predictions

↓

Many Reports

↓

Many Evidence Records

↓

Many Timeline Events

↓

One AI Memory

---

## Example Document

```json
{
  "_id": "CASE001",
  "userId": "USR001",
  "caseTitle": "Property Ownership Dispute",
  "caseType": "Civil",
  "court": "Peshawar High Court",
  "status": "ACTIVE",
  "createdAt": "2026-07-03T11:30:00Z"
}
```

---

# 8.3 Documents Collection

## Purpose

Stores uploaded legal documents.

---

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| caseId | ObjectId |
| fileName | String |
| fileType | String |
| storagePath | String |
| uploadedBy | ObjectId |
| uploadedAt | Date |

---

## Supported Types

- PDF
- DOCX
- TXT

---

## Indexes

- caseId
- uploadedBy

---

## Example Document

```json
{
  "_id": "DOC001",
  "caseId": "CASE001",
  "fileName": "Judgment.pdf",
  "fileType": "PDF",
  "storagePath": "/uploads/cases/DOC001.pdf",
  "uploadedAt": "2026-07-03T12:15:00Z"
}
```

---

# 8.4 Predictions Collection

## Purpose

Stores AI-generated prediction results.

---

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| caseId | ObjectId |
| predictedOutcome | String |
| confidence | Double |
| explanation | String |
| modelVersion | String |
| generatedAt | Date |

---

## Indexes

- caseId
- generatedAt

---

## Example Document

```json
{
  "_id": "PRED001",
  "caseId": "CASE001",
  "predictedOutcome": "Plaintiff Likely to Win",
  "confidence": 91.4,
  "modelVersion": "v1.0",
  "generatedAt": "2026-07-03T13:00:00Z"
}
```

---

# 8.5 AI Memory Collection

## Collection Name

ai_memory

---

## Purpose

Stores persistent AI context for every legal case.

---

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| caseId | ObjectId |
| predictionHistory | Array |
| summaries | Array |
| similarCases | Array |
| evidenceAnalysis | Array |
| contradictions | Array |
| conversations | Array |
| timeline | Array |
| updatedAt | Date |

---

## Indexes

- caseId (Unique)

---

## Relationships

One Case

↓

One AI Memory Profile

---

## Example Document

```json
{
  "_id": "MEM001",
  "caseId": "CASE001",
  "predictionHistory": [],
  "summaries": [],
  "similarCases": [],
  "timeline": [],
  "updatedAt": "2026-07-03T14:20:00Z"
}
```

---

# Collection Summary

| Collection | Purpose |
|------------|----------|
| users | Platform users |
| cases | Legal cases |
| documents | Uploaded files |
| predictions | AI predictions |
| ai_memory | Persistent AI context |
---

# 9. Database Domain Architecture

## 9.1 Overview

The WakuLaw database follows a Domain-Driven Design (DDD) approach, where collections are grouped according to business capabilities rather than existing as unrelated entities.

This architecture improves scalability, maintainability, readability, and future expansion.

The database is organized into the following domains:

- Identity Domain
- Case Management Domain
- Artificial Intelligence Domain
- Reporting Domain
- Administration Domain
- Research Domain
- System Domain

---

# 10. Identity Domain

The Identity Domain manages user authentication, authorization, and account information.

## Collections

### users

Stores registered platform users.

---

### roles

Stores system roles.

Example roles include:

- Administrator
- Lawyer
- Law Student
- Legal Researcher

---

### permissions

Stores granular system permissions.

Example:

- CREATE_CASE
- DELETE_CASE
- VIEW_REPORT
- MANAGE_USERS
- TRAIN_MODEL

---

### sessions

Stores active login sessions.

Fields:

- sessionId
- userId
- jwtToken
- loginTime
- expirationTime
- device
- ipAddress

---

# Identity Domain Relationships

Users

↓

Roles

↓

Permissions

↓

Sessions

---

# 11. Case Management Domain

This domain stores all legal case information.

Collections include:

### cases

Main legal case records.

---

### documents

Uploaded legal documents.

---

### evidence

Uploaded evidence.

---

### timeline_events

Chronological legal events extracted by AI.

---

### contradictions

Detected contradictions.

---

### parties

Stores involved parties.

Example:

- Plaintiff
- Defendant
- Witness
- Organization

---

### hearings

Stores hearing schedules.

---

### judgments

Stores judgment metadata.

---

# Case Domain Relationships

Case

↓

Documents

↓

Evidence

↓

Timeline

↓

Hearings

↓

Judgments

---

# 12. Artificial Intelligence Domain

This domain contains AI-generated information.

Collections include:

### predictions

Prediction history.

---

### summaries

Generated summaries.

---

### similar_cases

Semantic search results.

---

### ai_memory

Persistent case memory.

---

### workflows

Executed AI workflows.

---

### embeddings

Vector embedding metadata.

---

### model_registry

Registered AI models.

---

### inference_logs

AI inference history.

---

### explainability

Explainable AI results.

---

# AI Domain Relationships

Prediction

↓

Explainability

↓

Memory

↓

Workflow

↓

Inference Logs

---

# 13. Reporting Domain

Collections include:

### reports

Generated reports.

---

### report_templates

PDF templates.

---

### exports

Downloaded reports.

---

### report_history

Historical report versions.

---

# 14. Administration Domain

Collections include:

### settings

System settings.

---

### audit_logs

Security logs.

---

### activity_logs

Platform activity.

---

### notifications

Notifications.

---

### feedback

User feedback.

---

### announcements

System announcements.

---

# 15. Research Domain

Collections include:

### legal_entities

Named legal entities.

---

### citations

Legal citations.

---

### precedent_links

Relationships between cases.

---

### datasets

Training datasets.

---

### dataset_versions

Dataset version history.

---

### legal_categories

Legal classifications.

---

# 16. Complete Database Domains

| Domain | Collections |
|---------|-------------|
| Identity | users, roles, permissions, sessions |
| Case Management | cases, documents, evidence, parties, hearings, judgments, timeline_events, contradictions |
| Artificial Intelligence | predictions, summaries, similar_cases, ai_memory, workflows, embeddings, model_registry, inference_logs, explainability |
| Reporting | reports, report_templates, exports, report_history |
| Administration | settings, notifications, audit_logs, activity_logs, feedback, announcements |
| Research | legal_entities, citations, precedent_links, datasets, dataset_versions, legal_categories |

---

# Total Planned Collections

| Category | Count |
|----------|------:|
| Identity Domain | 4 |
| Case Domain | 8 |
| AI Domain | 9 |
| Reporting Domain | 4 |
| Administration Domain | 6 |
| Research Domain | 6 |

## Total MongoDB Collections

**37 Collections**

This modular design supports future expansion while keeping related business data organized and maintainable.

---

# End of Part 3
---

# 17. Enterprise Collection Specifications

Each MongoDB collection follows a standardized specification format to ensure consistency across the platform.

Each collection specification contains:

- Purpose
- Collection Name
- Ownership Domain
- Fields
- Validation Rules
- Index Strategy
- Relationships
- CRUD Operations
- Business Rules
- Example Document
- Growth Estimate
- Retention Policy

---

# 17.1 Users Collection

## Collection Name

users

---

## Domain

Identity Domain

---

## Purpose

Stores all registered users of the WakuLaw platform including administrators, lawyers, law students, and legal researchers.

---

## Fields

| Field | Type | Required | Default | Description |
|--------|------|----------|----------|-------------|
| _id | ObjectId | Yes | Auto | MongoDB ID |
| fullName | String | Yes | — | User full name |
| email | String | Yes | — | Unique email |
| passwordHash | String | Yes | — | BCrypt hash |
| roleId | ObjectId | Yes | — | Reference to role |
| phone | String | No | null | Contact number |
| profileImage | String | No | Default Avatar | Profile picture |
| status | String | Yes | ACTIVE | Account status |
| emailVerified | Boolean | Yes | false | Email verification |
| lastLogin | Date | No | null | Last login |
| createdAt | Date | Yes | Current Time | Creation timestamp |
| updatedAt | Date | Yes | Current Time | Last modification |

---

## Validation Rules

- Email must be unique.
- Email format validated.
- Password stored only as BCrypt hash.
- Role must exist.
- Status limited to:

```
ACTIVE
PENDING
BLOCKED
DELETED
```

---

## Indexes

| Field | Type |
|---------|------|
| email | Unique |
| roleId | Normal |
| status | Normal |

---

## Relationships

Users

↓

Roles

↓

Cases

↓

Reports

↓

Notifications

↓

Audit Logs

---

## CRUD Operations

Create User

Read User

Update Profile

Deactivate Account

Delete Account (Soft Delete)

---

## Business Rules

- Email cannot be duplicated.
- Deleted users remain in audit logs.
- Password never returned through APIs.
- Administrators cannot delete themselves.

---

## Example JSON

```json
{
  "_id": "USR001",
  "fullName": "Ahmed Khan",
  "email": "ahmed@example.com",
  "passwordHash": "$2a$10$exampleHash",
  "roleId": "ROLE002",
  "status": "ACTIVE",
  "emailVerified": true,
  "createdAt": "2026-07-03T10:15:00Z"
}
```

---

## Estimated Growth

100,000+ users

---

## Retention Policy

Retain permanently unless administrator performs soft deletion.

---

# 17.2 Roles Collection

## Purpose

Stores system roles.

---

## Fields

- _id
- roleName
- description
- permissions
- createdAt

---

## Default Roles

Administrator

Lawyer

Law Student

Legal Researcher

---

## Example JSON

```json
{
  "_id":"ROLE001",
  "roleName":"LAWYER",
  "description":"Licensed legal practitioner"
}
```

---

# 17.3 Permissions Collection

## Purpose

Stores granular permissions.

Examples include:

- CREATE_CASE
- EDIT_CASE
- DELETE_CASE
- TRAIN_MODEL
- EXPORT_REPORT
- VIEW_ANALYTICS

---

## Relationships

Role

↓

Permissions

---

## Example JSON

```json
{
   "_id":"PER001",
   "permission":"CREATE_CASE"
}
```

---

# 17.4 Sessions Collection

## Purpose

Stores authenticated user sessions.

---

## Fields

| Field | Type |
|--------|------|
| sessionId | String |
| userId | ObjectId |
| jwtId | String |
| device | String |
| ipAddress | String |
| loginTime | Date |
| expiryTime | Date |
| revoked | Boolean |

---

## Business Rules

Expired sessions automatically become invalid.

---

## Example JSON

```json
{
   "sessionId":"SES001",
   "userId":"USR001",
   "device":"Chrome Windows",
   "revoked":false
}
```

---

# Identity Domain Summary

| Collection | Purpose |
|------------|----------|
| users | Registered users |
| roles | User roles |
| permissions | System permissions |
| sessions | Login sessions |

---

# End of Identity Domain
---

# 18. Case Management Domain

The Case Management Domain stores and manages all information related to legal cases. It serves as the primary source of truth for uploaded documents, evidence, hearings, timeline events, and judgments.

---

# 18.1 Cases Collection

## Collection Name

cases

---

## Domain

Case Management Domain

---

## Purpose

Stores the primary information for every legal case managed by WakuLaw.

---

## Fields

| Field | Type | Required | Default | Description |
|--------|------|----------|----------|-------------|
| _id | ObjectId | Yes | Auto | MongoDB ID |
| caseNumber | String | Yes | Auto Generated | Unique case number |
| title | String | Yes | — | Case title |
| description | String | Yes | — | Case description |
| caseType | String | Yes | CIVIL | Legal category |
| courtName | String | Yes | — | Court handling the case |
| jurisdiction | String | Yes | — | Legal jurisdiction |
| status | String | Yes | ACTIVE | Case status |
| ownerId | ObjectId | Yes | — | User who created the case |
| createdAt | Date | Yes | Current Time | Creation timestamp |
| updatedAt | Date | Yes | Current Time | Last update |

---

## Validation Rules

- Case title required.
- Owner must exist.
- Case number unique.
- Status must be one of:

```
ACTIVE
PENDING
CLOSED
ARCHIVED
```

---

## Indexes

| Field | Type |
|--------|------|
| caseNumber | Unique |
| ownerId | Normal |
| status | Normal |
| caseType | Normal |
| courtName | Text |

---

## Relationships

One Case

↓

Many Documents

↓

Many Evidence Records

↓

Many Timeline Events

↓

Many Hearings

↓

Many Judgments

↓

One AI Memory

---

## CRUD Operations

- Create Case
- View Case
- Update Case
- Archive Case
- Restore Case

---

## Business Rules

- Only authorized users may modify their cases.
- Archived cases remain searchable.
- Closed cases become read-only except for administrators.

---

## Example JSON

```json
{
  "_id":"CASE001",
  "caseNumber":"WK-2026-00001",
  "title":"Property Ownership Dispute",
  "caseType":"Civil",
  "courtName":"Peshawar High Court",
  "status":"ACTIVE",
  "ownerId":"USR001"
}
```

---

# 18.2 Documents Collection

## Purpose

Stores all uploaded legal documents associated with a case.

---

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| caseId | ObjectId |
| fileName | String |
| originalName | String |
| fileType | String |
| fileSize | Long |
| storagePath | String |
| checksum | String |
| uploadedBy | ObjectId |
| uploadedAt | Date |

---

## Supported Formats

- PDF
- DOCX
- TXT
- PNG
- JPG
- JPEG

---

## Validation Rules

- Maximum upload size configurable.
- Unsupported file types rejected.
- Duplicate files detected using checksum.

---

## Indexes

- caseId
- uploadedBy
- uploadedAt

---

## Example JSON

```json
{
  "_id":"DOC001",
  "caseId":"CASE001",
  "fileName":"judgment.pdf",
  "fileType":"PDF",
  "uploadedBy":"USR001"
}
```

---

# 18.3 Evidence Collection

## Purpose

Stores evidence uploaded for legal cases.

---

## Fields

- _id
- caseId
- evidenceType
- title
- description
- documentId
- uploadedBy
- createdAt

---

## Evidence Types

- Document
- Image
- Audio
- Video
- Witness Statement
- Contract
- Financial Record

---

## Example JSON

```json
{
 "_id":"EVD001",
 "caseId":"CASE001",
 "evidenceType":"Document",
 "title":"Signed Agreement"
}
```

---

# 18.4 Parties Collection

## Purpose

Stores all parties associated with a legal case.

---

## Fields

- _id
- caseId
- name
- role
- organization
- contactInformation

---

## Supported Roles

- Plaintiff
- Defendant
- Witness
- Judge
- Lawyer
- Organization

---

## Example JSON

```json
{
 "_id":"PTY001",
 "caseId":"CASE001",
 "name":"Ali Khan",
 "role":"Plaintiff"
}
```

---

# 18.5 Hearings Collection

## Purpose

Stores court hearing schedules and outcomes.

---

## Fields

- _id
- caseId
- hearingDate
- courtroom
- judge
- status
- remarks

---

## Status Values

- Scheduled
- Completed
- Postponed
- Cancelled

---

## Example JSON

```json
{
 "_id":"HRG001",
 "caseId":"CASE001",
 "status":"Scheduled"
}
```

---

# 18.6 Judgments Collection

## Purpose

Stores judgment information related to completed cases.

---

## Fields

- _id
- caseId
- judgmentDate
- outcome
- judge
- summary
- uploadedDocument

---

## Example JSON

```json
{
 "_id":"JDG001",
 "caseId":"CASE001",
 "outcome":"Plaintiff Won"
}
```

---

# 18.7 Timeline Events Collection

## Purpose

Stores chronological events extracted by the Timeline Intelligence Engine.

---

## Fields

- _id
- caseId
- title
- description
- eventDate
- eventCategory
- relatedDocument
- confidenceScore

---

## Event Categories

- Filing
- Hearing
- Payment
- Notice
- Agreement
- Judgment
- Appeal

---

## Example JSON

```json
{
 "_id":"TIM001",
 "caseId":"CASE001",
 "title":"Case Filed",
 "eventDate":"2026-01-12"
}
```

---

# 18.8 Contradictions Collection

## Purpose

Stores contradictions detected by AI across legal documents.

---

## Fields

- _id
- caseId
- documentA
- documentB
- contradictionType
- severity
- explanation
- detectedAt

---

## Severity Levels

- Low
- Medium
- High
- Critical

---

## Example JSON

```json
{
 "_id":"CON001",
 "caseId":"CASE001",
 "severity":"High"
}
```

---

# Case Management Domain Summary

| Collection | Purpose |
|------------|----------|
| cases | Primary legal cases |
| documents | Uploaded files |
| evidence | Case evidence |
| parties | Plaintiffs, defendants, witnesses |
| hearings | Court hearings |
| judgments | Court decisions |
| timeline_events | AI-generated timeline |
| contradictions | AI-detected inconsistencies |

---

# End of Case Management Domain
---

# 19. Artificial Intelligence Domain

The Artificial Intelligence Domain stores all AI-generated data, model metadata, workflow execution history, embeddings, explainability reports, and persistent AI memory.

This domain enables reproducibility, transparency, explainability, and continuous AI improvement.

---

# 19.1 Predictions Collection

## Collection Name

predictions

---

## Purpose

Stores every AI-generated court case prediction.

---

## Fields

| Field | Type | Required |
|--------|------|----------|
| _id | ObjectId | Yes |
| caseId | ObjectId | Yes |
| modelId | ObjectId | Yes |
| predictedOutcome | String | Yes |
| confidenceScore | Double | Yes |
| probabilityDistribution | Object | No |
| predictionReason | String | Yes |
| processingTime | Long | Yes |
| generatedAt | Date | Yes |

---

## Indexes

- caseId
- modelId
- generatedAt

---

## Business Rules

- Every prediction references one case.
- Prediction history is never overwritten.
- Every prediction stores the model version.

---

## Example JSON

```json
{
  "_id":"PRD001",
  "caseId":"CASE001",
  "modelId":"MODEL001",
  "predictedOutcome":"Plaintiff Likely to Win",
  "confidenceScore":0.92
}
```

---

# 19.2 Summaries Collection

## Purpose

Stores AI-generated summaries.

---

## Fields

- _id
- caseId
- summaryType
- summary
- generatedByModel
- generatedAt

---

## Summary Types

- Executive Summary
- Legal Summary
- Evidence Summary
- Judgment Summary

---

## Example JSON

```json
{
 "_id":"SUM001",
 "caseId":"CASE001",
 "summaryType":"Executive Summary"
}
```

---

# 19.3 Similar Cases Collection

## Purpose

Stores semantic similarity search results.

---

## Fields

- _id
- sourceCaseId
- matchedCaseId
- similarityScore
- retrievedAt

---

## Business Rules

- Similarity score ranges from 0 to 1.
- Highest similarity displayed first.

---

## Example JSON

```json
{
 "_id":"SIM001",
 "sourceCaseId":"CASE001",
 "matchedCaseId":"CASE241",
 "similarityScore":0.94
}
```

---

# 19.4 AI Memory Collection

## Purpose

Stores persistent AI memory for every case.

---

## Fields

- _id
- caseId
- predictionHistory
- summaries
- evidenceInsights
- contradictionHistory
- timeline
- conversations
- updatedAt

---

## Business Rules

- One memory profile per case.
- Memory updates automatically after every AI execution.

---

## Example JSON

```json
{
 "_id":"MEM001",
 "caseId":"CASE001",
 "predictionHistory":[],
 "timeline":[]
}
```

---

# 19.5 Workflow Collection

## Purpose

Stores executed AI workflows.

---

## Fields

- _id
- workflowName
- selectedModules
- executionTime
- executedBy
- createdAt

---

## Example JSON

```json
{
 "_id":"WF001",
 "workflowName":"Complete Case Analysis"
}
```

---

# 19.6 Embeddings Collection

## Purpose

Stores metadata for semantic vector embeddings.

(Note: The actual vectors are stored in the vector database (Qdrant). MongoDB stores references and metadata.)

---

## Fields

- _id
- caseId
- documentId
- embeddingId
- vectorDatabaseId
- embeddingModel
- generatedAt

---

## Business Rules

- Embeddings are immutable after generation.
- Metadata must reference a valid document.

---

## Example JSON

```json
{
 "_id":"EMB001",
 "documentId":"DOC001",
 "embeddingModel":"all-mpnet-base-v2"
}
```

---

# 19.7 Model Registry Collection

## Purpose

Maintains all AI models available within WakuLaw.

---

## Fields

- _id
- modelName
- version
- framework
- accuracy
- precision
- recall
- f1Score
- trainingDataset
- deploymentStatus
- createdAt

---

## Business Rules

- Every deployed model has a unique version.
- Old models remain archived.

---

## Example JSON

```json
{
 "_id":"MODEL001",
 "modelName":"Court Outcome Predictor",
 "version":"v1.0",
 "accuracy":0.91
}
```

---

# 19.8 Explainability Collection

## Purpose

Stores Explainable AI (XAI) outputs.

---

## Fields

- _id
- predictionId
- importantFeatures
- confidenceExplanation
- generatedAt

---

## Example JSON

```json
{
 "_id":"EXP001",
 "predictionId":"PRD001"
}
```

---

# 19.9 Inference Logs Collection

## Purpose

Stores AI inference execution logs.

---

## Fields

- _id
- requestId
- caseId
- executedModules
- executionStatus
- processingTime
- timestamp

---

## Status Values

- SUCCESS
- FAILED
- PARTIAL_SUCCESS

---

## Example JSON

```json
{
 "_id":"LOG001",
 "requestId":"REQ001",
 "executionStatus":"SUCCESS"
}
```

---

# Artificial Intelligence Domain Summary

| Collection | Purpose |
|------------|----------|
| predictions | AI predictions |
| summaries | Generated summaries |
| similar_cases | Semantic search |
| ai_memory | Persistent AI memory |
| workflows | AI workflow history |
| embeddings | Embedding metadata |
| model_registry | AI model versions |
| explainability | Explainable AI outputs |
| inference_logs | AI execution logs |

---

# End of Artificial Intelligence Domain
---

# 20. Reporting Domain

The Reporting Domain manages AI-generated reports, exported documents, report templates, and report history.

---

# 20.1 Reports Collection

## Purpose

Stores generated AI reports.

### Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| reportId | String |
| caseId | ObjectId |
| generatedBy | ObjectId |
| reportType | String |
| reportStatus | String |
| reportPath | String |
| createdAt | Date |

### Report Types

- Complete Analysis
- Prediction Report
- Timeline Report
- Evidence Report
- Summary Report
- Strategy Report

### Example JSON

```json
{
 "_id":"REP001",
 "caseId":"CASE001",
 "reportType":"Complete Analysis"
}
```

---

# 20.2 Report Templates Collection

## Purpose

Stores reusable PDF templates.

### Fields

- _id
- templateName
- version
- createdAt

---

# 20.3 Exports Collection

## Purpose

Tracks exported reports.

### Fields

- _id
- reportId
- exportedBy
- exportFormat
- exportedAt

Supported Formats

- PDF
- DOCX
- JSON

---

# 20.4 Report History Collection

## Purpose

Stores historical report versions.

---

# Reporting Domain Summary

| Collection | Purpose |
|------------|----------|
| reports | Generated reports |
| report_templates | Templates |
| exports | Export history |
| report_history | Version history |

---

# 21. Administration Domain

The Administration Domain manages system-wide configuration, auditing, monitoring, and administration.

---

# 21.1 Settings Collection

Stores platform configuration.

Example fields:

- applicationName
- maintenanceMode
- aiEnabled
- maxUploadSize
- createdAt

---

# 21.2 Notifications Collection

Stores user notifications.

Example fields:

- userId
- title
- message
- type
- isRead
- createdAt

Notification Types

- System
- AI
- Security
- Reminder

---

# 21.3 Audit Logs Collection

Stores security-sensitive activities.

Logged Events

- Login
- Logout
- Password Change
- User Creation
- Case Update
- AI Prediction
- Report Export

---

# 21.4 Activity Logs Collection

Stores general user activities.

Examples

- Viewed Case
- Downloaded Report
- Uploaded Document
- Generated Summary

---

# 21.5 Feedback Collection

Stores user feedback.

Fields

- userId
- caseId
- aiModule
- rating
- comments
- submittedAt

---

# 21.6 Announcements Collection

Stores system announcements.

---

# Administration Domain Summary

| Collection | Purpose |
|------------|----------|
| settings | Platform configuration |
| notifications | User notifications |
| audit_logs | Security logs |
| activity_logs | User activities |
| feedback | AI feedback |
| announcements | System announcements |

---

# 22. Research Domain

The Research Domain supports legal research, AI training, and knowledge management.

---

# 22.1 Legal Entities Collection

Stores extracted legal entities.

Examples

- Courts
- Judges
- Lawyers
- Organizations
- Laws
- Sections

---

# 22.2 Citations Collection

Stores legal citations extracted from documents.

---

# 22.3 Precedent Links Collection

Stores relationships between legal cases.

Example

Case A

↓

Referenced by

↓

Case B

---

# 22.4 Datasets Collection

Stores metadata about AI datasets.

Fields

- datasetName
- source
- license
- version
- recordCount
- createdAt

---

# 22.5 Dataset Versions Collection

Tracks dataset evolution.

---

# 22.6 Legal Categories Collection

Stores supported legal categories.

Examples

- Civil
- Criminal
- Family
- Property
- Corporate
- Constitutional
- Labor
- Taxation

---

# 22.7 Conversations Collection

## Purpose

Stores AI conversation history separately from AI Memory.

### Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| caseId | ObjectId |
| userId | ObjectId |
| conversationTitle | String |
| messages | Array |
| aiModule | String |
| createdAt | Date |
| updatedAt | Date |

### Benefits

- Unlimited conversation history
- Better search performance
- Future RAG integration
- Cleaner AI Memory collection
- Analytics support

---

# Research Domain Summary

| Collection | Purpose |
|------------|----------|
| legal_entities | Named legal entities |
| citations | Legal citations |
| precedent_links | Case relationships |
| datasets | AI datasets |
| dataset_versions | Dataset versions |
| legal_categories | Legal categories |
| conversations | AI conversations |

---

# 23. Database Relationships

## Primary Relationships

Users

↓

Cases

↓

Documents

↓

Evidence

↓

Timeline Events

↓

Predictions

↓

Reports

↓

Conversations

↓

AI Memory

---

# 24. Database Index Strategy

The following indexes shall be created to improve performance.

### Unique Indexes

- email
- caseNumber
- reportId

### Compound Indexes

- (caseId, createdAt)
- (userId, createdAt)
- (caseId, status)

### Text Indexes

- caseTitle
- description
- summary
- judgment
- citations

---

# 25. Database Security

The database shall implement:

- Authentication
- Authorization
- Role-Based Access
- TLS Encryption
- Backup Encryption
- Soft Deletes
- Audit Logging

---

# 26. Backup and Disaster Recovery

The platform shall support:

- Daily Incremental Backups
- Weekly Full Backups
- Monthly Archive Snapshots
- Point-in-Time Recovery
- Automated Backup Verification

---

# 27. Database Performance Strategy

Performance shall be improved using:

- Proper indexing
- Pagination
- Lazy loading
- Aggregation pipelines
- Query optimization
- Connection pooling

---

# 28. Future Database Enhancements

Future versions may include:

- MongoDB Sharding
- Multi-region Replication
- Redis Cache
- Qdrant Vector Database
- Event Streaming
- Data Warehouse Integration
- AI Analytics Data Lake

---

# End of Database Design Document

**Document ID:** WK-DOC-006

**Version:** 1.0

**Status:** Draft

**Prepared By:** Team WakuLaw

**Reviewed By:** Sir Zahid Sarwar