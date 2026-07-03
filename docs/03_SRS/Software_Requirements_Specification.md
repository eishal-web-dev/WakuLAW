# Software Requirements Specification (SRS)

---

# 1. Document Information

| Field | Details |
|--------|---------|
| Document Name | Software Requirements Specification |
| Project Name | WakuLaw – Explainable AI Legal Intelligence Platform |
| Document ID | WK-DOC-003 |
| Version | 1.0 |
| Status | Draft |
| Prepared By | Team WakuLaw |
| Reviewed By | Sir Zahid Sarwar |
| Department | Software Engineering |
| Last Updated | 03 July 2026 |

---

# 2. Revision History

| Version | Date | Author | Description |
|----------|------------|----------------|-----------------------------|
| 1.0 | 03 July 2026 | Team WakuLaw | Initial Software Requirements Specification |

---

# 3. Table of Contents

1. Introduction

2. Overall Description

3. External Interface Requirements

4. System Features

5. Non-Functional Requirements

6. AI Requirements

7. Database Requirements

8. Security Requirements

9. Appendices

---

# 4. Introduction

## 4.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for WakuLaw, an Explainable AI Legal Intelligence Platform. The purpose of this document is to provide a complete technical specification that guides the design, development, testing, deployment, and maintenance of the system.

The SRS serves as the primary reference for developers, testers, project supervisors, and future contributors by describing how the system shall behave, the services it shall provide, and the constraints under which it must operate.

---

## 4.2 Scope

WakuLaw is a web-based Legal Intelligence Platform that integrates Artificial Intelligence, Machine Learning, Natural Language Processing, and Explainable AI to support legal research and case analysis.

The platform enables users to:

- Predict possible court case outcomes.
- Retrieve similar historical legal cases.
- Summarize lengthy legal documents.
- Analyze legal evidence.
- Detect contradictions.
- Simulate courtroom scenarios.
- Interact with an AI Legal Assistant.
- Manage legal cases through a secure web application.

The platform functions solely as a legal decision-support system and shall not replace legal professionals or judicial authorities.

---

## 4.3 Intended Audience

This document is intended for:

- Project Supervisor
- Software Developers
- AI Engineers
- UI/UX Designers
- Database Engineers
- Software Testers
- Future Project Contributors

---

## 4.4 Definitions, Acronyms and Abbreviations

| Term | Definition |
|------|------------|
| AI | Artificial Intelligence |
| ML | Machine Learning |
| NLP | Natural Language Processing |
| XAI | Explainable Artificial Intelligence |
| API | Application Programming Interface |
| JWT | JSON Web Token |
| RBAC | Role-Based Access Control |
| UI | User Interface |
| UX | User Experience |
| PRD | Product Requirements Document |
| SRS | Software Requirements Specification |

---

## 4.5 References

The requirements defined within this document are derived from:

- WakuLaw Product Vision Document (WK-DOC-001)
- WakuLaw Product Requirements Document (WK-DOC-002)
- IEEE 29148 Software Requirements Specification Standard
- SWEBOK (Software Engineering Body of Knowledge)
- Artificial Intelligence Research Publications
- Legal Technology (LegalTech) Literature

---

## 4.6 Document Overview

This document specifies the technical requirements for WakuLaw and serves as the engineering blueprint for system implementation.

Subsequent chapters describe the overall system architecture, software interfaces, functional requirements, non-functional requirements, AI requirements, database requirements, security requirements, and implementation constraints.
---

# 5. Overall Description

## 5.1 Product Perspective

WakuLaw is a standalone web-based Legal Intelligence Platform designed to support legal professionals, researchers, students, and educational institutions through Artificial Intelligence. The system combines legal case management with AI-powered decision-support tools, providing intelligent legal analysis while maintaining transparency and human oversight.

The platform follows a modular architecture consisting of four primary layers:

- Presentation Layer (React Frontend)
- Business Logic Layer (Spring Boot Backend)
- AI Intelligence Layer (Python FastAPI Services)
- Data Layer (MongoDB)

Each layer operates independently and communicates through secure RESTful APIs, allowing future scalability and modular expansion.

---

## 5.2 Product Functions

The major functions of WakuLaw include:

### User Management

- User Registration
- User Authentication
- Profile Management
- Role-Based Access Control

---

### Case Management

- Create New Case
- Upload Legal Documents
- Edit Case Information
- Delete Cases
- Search Cases
- View Case History

---

### AI Legal Intelligence

- Court Case Outcome Prediction
- Similar Case Retrieval
- Legal Document Summarization
- AI Legal Assistant
- Explainable AI

---

### Legal Analytics

- Evidence Strength Analysis
- Contradiction Detection
- Risk Assessment
- Legal Timeline Generation

---

### Courtroom Intelligence

- Courtroom Simulation
- What-If Scenario Analysis

---

### Dashboard & Reports

- Analytics Dashboard
- Prediction Reports
- Evidence Reports
- Downloadable PDF Reports

---

### Administration

- User Management
- Dataset Management
- AI Model Monitoring
- System Monitoring
- Audit Logs

---

## 5.3 User Classes and Characteristics

The system supports multiple categories of users.

| User Class | Description |
|------------|-------------|
| Administrator | Manages users, datasets, AI models, and overall platform configuration. |
| Lawyer | Uploads legal cases, performs legal research, analyzes evidence, and receives AI-assisted predictions. |
| Law Student | Uses the platform for educational purposes, learning legal concepts, and studying historical cases. |
| Legal Researcher | Performs legal analytics, judicial trend analysis, and research activities. |
| Guest User | May access public information but cannot perform protected operations without authentication. |

---

## 5.4 Operating Environment

The platform shall operate within the following environment.

### Client Side

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

---

### Server Side

- Ubuntu Linux Server
- Windows Server

---

### Backend

- Spring Boot
- Java 21

---

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

---

### AI Services

- Python
- FastAPI
- PyTorch
- Hugging Face Transformers
- Sentence Transformers
- Scikit-learn

---

### Database

- MongoDB

---

## 5.5 Design Constraints

The following constraints influence system development.

- Limited availability of Pakistani legal datasets.
- Academic development timeline.
- Budget limitations restrict commercial AI services.
- AI predictions are advisory only.
- Legal decisions remain the responsibility of qualified legal professionals.
- Internet connectivity is required for web access.

---

## 5.6 Assumptions and Dependencies

### Assumptions

- Users possess basic computer literacy.
- Historical legal datasets are available for AI model training.
- Users have stable internet access.
- The hosting environment supports Java, Python, and MongoDB.

---

### Dependencies

The platform depends on:

- React
- Spring Boot
- MongoDB
- FastAPI
- JWT Authentication
- Hugging Face
- FAISS
- GitHub
- Docker
---

# 6. External Interface Requirements

This section specifies how WakuLaw interacts with users, external software, hardware resources, databases, and communication protocols.

---

# 6.1 User Interface Requirements

The WakuLaw user interface shall provide a professional, intuitive, and responsive experience suitable for legal professionals, researchers, students, and administrators.

## UI-001 Responsive Design

The system shall adapt to different screen sizes including desktops, laptops, tablets, and modern mobile browsers.

---

## UI-002 Dashboard Interface

After authentication, users shall be redirected to a personalized dashboard according to their assigned role.

Dashboard components may include:

- Recent Cases
- AI Prediction Statistics
- Saved Reports
- Notifications
- AI Assistant
- Quick Actions

---

## UI-003 Navigation

The application shall provide a consistent navigation structure including:

- Sidebar Navigation
- Top Navigation Bar
- Breadcrumb Navigation
- User Profile Menu

---

## UI-004 Forms

All forms shall include:

- Client-side validation
- Server-side validation
- Error messages
- Success notifications
- Required field indicators

---

## UI-005 Reports

Generated reports shall support:

- On-screen viewing
- PDF Download
- Print Preview

---

# 6.2 Hardware Interface Requirements

WakuLaw is a web-based application and does not require specialized hardware.

Minimum client requirements include:

- Internet-enabled computer
- Keyboard
- Mouse or Touchpad
- Modern Web Browser

Recommended server resources:

- Multi-core Processor
- Minimum 8 GB RAM
- SSD Storage
- Stable Internet Connection

---

# 6.3 Software Interface Requirements

## Frontend

The frontend shall be developed using:

- React
- TypeScript
- Tailwind CSS
- Vite
- Axios

---

## Backend

The backend shall provide REST APIs using:

- Spring Boot
- Java 21
- Spring Security
- JWT Authentication

---

## AI Services

AI services shall be implemented using:

- Python
- FastAPI
- PyTorch
- Hugging Face Transformers
- Sentence Transformers
- Scikit-learn
- FAISS

---

## Database

Persistent data shall be stored using:

- MongoDB

---

## Development Tools

Development shall utilize:

- Git
- GitHub
- Docker
- Postman
- Visual Studio Code

---

# 6.4 Communication Interface Requirements

## CI-001 Communication Protocol

The frontend shall communicate with backend services using RESTful APIs over HTTPS.

---

## CI-002 Data Format

All requests and responses shall use JSON.

Example:

```json
{
  "caseId": "CASE-001",
  "prediction": "Plaintiff Likely to Win",
  "confidence": 92.6
}
```

---

## CI-003 Authentication

Protected endpoints shall require JWT authentication.

Authentication Header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## CI-004 Frontend–Backend Communication

React shall communicate with Spring Boot using HTTPS REST APIs.

---

## CI-005 Backend–AI Communication

Spring Boot shall communicate with Python AI services through secure REST APIs.

---

## CI-006 Backend–Database Communication

Spring Boot shall communicate with MongoDB using Spring Data MongoDB.

---

## CI-007 Error Handling

API responses shall return standardized HTTP status codes.

| Status Code | Description |
|------------|-------------|
| 200 | Request Successful |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

## CI-008 Logging

Important API requests and system events shall be logged for monitoring, debugging, and security auditing.
---

# 7. System Features

This chapter describes the functional behavior of the WakuLaw system. Each feature includes its purpose, actors, preconditions, normal workflow, alternative scenarios, postconditions, exceptions, and traceability to the Product Requirements Document (PRD).

---

# 7.1 System Feature SF-001 – User Registration

## Description

The User Registration feature enables new users to create an account within WakuLaw. Registered users can access AI-powered legal services according to their assigned role.

---

### Actors

- Lawyer
- Law Student
- Legal Researcher

---

### Preconditions

- User is not already registered.
- User has internet access.

---

### Trigger

The user clicks the **Create Account** button.

---

### Main Flow

1. User opens the registration page.
2. User enters personal information.
3. User selects a role.
4. User creates a password.
5. System validates all inputs.
6. System checks email uniqueness.
7. User account is created.
8. Confirmation message is displayed.
9. User is redirected to the Login page.

---

### Alternative Flow

- Email already exists.
- Password does not satisfy security rules.
- Required fields are empty.

The system shall display appropriate validation messages.

---

### Postconditions

- User account exists.
- User can log in.

---

### Exceptions

- Database unavailable.
- Server error.

---

### Related Requirements

- FR-001
- FR-003
- NFR-008
- SEC-001

---

# 7.2 System Feature SF-002 – User Authentication

## Description

The authentication feature verifies user identity and grants secure access to protected system resources.

---

### Actors

- Administrator
- Lawyer
- Law Student
- Legal Researcher

---

### Preconditions

- User account exists.

---

### Trigger

User clicks the **Login** button.

---

### Main Flow

1. User enters email.
2. User enters password.
3. Credentials are validated.
4. JWT token is generated.
5. User session is created.
6. Dashboard is displayed.

---

### Alternative Flow

- Invalid email.
- Incorrect password.
- Account disabled.

Appropriate error messages shall be displayed.

---

### Postconditions

- User is authenticated.
- Secure session established.

---

### Exceptions

- Authentication server unavailable.
- Database connection failure.

---

### Related Requirements

- FR-002
- FR-006
- NFR-008
- SEC-002

---

# 7.3 System Feature SF-003 – Case Management

## Description

This feature enables users to create, upload, edit, search, and manage legal cases.

---

### Actors

- Lawyer
- Legal Researcher

---

### Preconditions

- User is authenticated.

---

### Trigger

User selects **Create New Case**.

---

### Main Flow

1. User enters case information.
2. User uploads supporting documents.
3. System validates uploaded files.
4. Case information is stored.
5. Dashboard updates automatically.

---

### Alternative Flow

- Unsupported file type.
- Missing required information.
- Upload failure.

---

### Postconditions

- Case stored successfully.
- Ready for AI analysis.

---

### Exceptions

- Storage failure.
- Network interruption.

---

### Related Requirements

- FR-010
- FR-011
- FR-012
- FR-013
- FR-014
- FR-015
- FR-016

---

# 7.4 System Feature SF-004 – AI Court Case Prediction

## Description

The AI Prediction feature analyzes uploaded legal cases and predicts the most probable outcome using trained Machine Learning models. The feature is intended solely as a legal decision-support mechanism.

---

### Actors

- Lawyer
- Legal Researcher

---

### Preconditions

- User is authenticated.
- Case information has been uploaded.
- AI Prediction Service is available.

---

### Trigger

User clicks **Predict Case Outcome**.

---

### Main Flow

1. System validates uploaded case information.
2. Backend sends request to AI Prediction Service.
3. AI model processes case data.
4. Prediction is generated.
5. Confidence score is calculated.
6. Explainable AI report is generated.
7. Results are stored in the database.
8. Prediction dashboard is displayed.

---

### Alternative Flow

- Insufficient case information.
- AI service unavailable.
- Prediction timeout.

---

### Postconditions

- Prediction stored.
- User receives complete prediction report.

---

### Exceptions

- AI inference failure.
- Database write failure.

---

### Related Requirements

- FR-017
- FR-018
- FR-019
- FR-020
- AIR-001
- AIR-002
- AIR-014

---

# 7.5 Traceability Matrix (Partial)

| System Feature | Related Functional Requirements |
|----------------|---------------------------------|
| SF-001 | FR-001, FR-003 |
| SF-002 | FR-002, FR-006 |
| SF-003 | FR-010 – FR-016 |
| SF-004 | FR-017 – FR-020 |
---

# 7.6 System Feature SF-005 – Similar Case Retrieval

## Description

The Similar Case Retrieval feature enables users to identify historical legal cases that closely resemble the uploaded case using semantic similarity search powered by AI embeddings.

---

### Actors

- Lawyer
- Legal Researcher
- Law Student

---

### Preconditions

- User is authenticated.
- A legal case has been uploaded.
- Similarity Search Service is available.

---

### Trigger

User selects **Find Similar Cases**.

---

### Main Flow

1. User uploads or selects a legal case.
2. Backend extracts case text.
3. AI generates semantic embeddings.
4. Embeddings are compared against historical case vectors.
5. Most similar cases are ranked.
6. Similarity scores are calculated.
7. Results are displayed.

---

### Alternative Flow

- No similar cases found.
- AI service unavailable.
- Empty document uploaded.

---

### Postconditions

- Similar cases are displayed.
- Search history is saved.

---

### Exceptions

- Vector database unavailable.
- Embedding generation failure.

---

### Related Requirements

- FR-021
- FR-022
- FR-023
- FR-024
- FR-025
- AIR-005
- AIR-006
- AIR-007

---

# 7.7 System Feature SF-006 – Legal Document Summarization

## Description

The summarization feature automatically generates concise summaries of lengthy legal documents using Natural Language Processing.

---

### Actors

- Lawyer
- Student
- Researcher

---

### Preconditions

- User authenticated.
- Legal document uploaded.

---

### Trigger

User clicks **Generate Summary**.

---

### Main Flow

1. Document uploaded.
2. Text extracted.
3. AI processes content.
4. Summary generated.
5. Summary displayed.
6. User downloads report.

---

### Alternative Flow

- Unsupported document.
- Empty document.
- AI timeout.

---

### Postconditions

- Summary stored.
- Summary downloadable.

---

### Exceptions

- NLP model unavailable.
- Processing failure.

---

### Related Requirements

- FR-026
- FR-027
- FR-028
- FR-029
- AIR-008
- AIR-009
- AIR-010

---

# 7.8 System Feature SF-007 – AI Legal Assistant

## Description

The AI Legal Assistant provides conversational legal assistance for education and legal research.

---

### Actors

- Lawyer
- Student
- Researcher

---

### Preconditions

- User authenticated.

---

### Trigger

User submits a legal question.

---

### Main Flow

1. User types question.
2. Backend validates request.
3. AI generates response.
4. Conversation history updated.
5. Response displayed.

---

### Alternative Flow

- Question unclear.
- AI unavailable.

---

### Postconditions

- Conversation saved.

---

### Exceptions

- AI timeout.
- Network failure.

---

### Related Requirements

- FR-030
- FR-031
- FR-032
- FR-033
- FR-034
- AIR-011
- AIR-012
- AIR-013

---

# 7.9 System Feature SF-008 – Explainable AI

## Description

The Explainable AI module explains how predictions and recommendations were generated, improving transparency and user trust.

---

### Actors

- Lawyer
- Student
- Researcher

---

### Preconditions

- AI prediction completed.

---

### Trigger

Prediction generated.

---

### Main Flow

1. Prediction completed.
2. Feature importance calculated.
3. Confidence explanation generated.
4. Explanation displayed.

---

### Alternative Flow

- Explanation unavailable.

---

### Postconditions

- User understands prediction reasoning.

---

### Exceptions

- Explainability service unavailable.

---

### Related Requirements

- FR-035
- FR-036
- FR-037
- FR-038
- FR-039
- AIR-014
- AIR-015
- AIR-016
- AIR-017
- AIR-018

---

# 7.10 System Feature SF-009 – Evidence Analysis

## Description

The Evidence Analysis module evaluates uploaded evidence and estimates its relevance and strength.

---

### Actors

- Lawyer
- Researcher

---

### Preconditions

- Evidence uploaded.

---

### Trigger

User clicks **Analyze Evidence**.

---

### Main Flow

1. Evidence uploaded.
2. Evidence classified.
3. AI evaluates evidence.
4. Strength score generated.
5. Report displayed.

---

### Alternative Flow

- Unsupported evidence.
- Corrupted file.

---

### Postconditions

- Evidence report stored.

---

### Exceptions

- AI processing failure.

---

### Related Requirements

- FR-040
- FR-041
- FR-042
- FR-043
- FR-044

---

# 7.11 System Feature SF-010 – Contradiction Detection

## Description

The Contradiction Detection feature identifies inconsistencies across legal documents and evidence.

---

### Actors

- Lawyer
- Researcher

---

### Preconditions

- Multiple legal documents available.

---

### Trigger

User selects **Detect Contradictions**.

---

### Main Flow

1. Documents processed.
2. NLP comparison performed.
3. Contradictions identified.
4. Severity calculated.
5. Report generated.

---

### Alternative Flow

- No contradictions detected.

---

### Postconditions

- Contradiction report saved.

---

### Exceptions

- NLP service unavailable.

---

### Related Requirements

- FR-045
- FR-046
- FR-047
- FR-048

---

# 7.12 Updated Traceability Matrix

| System Feature | Functional Requirements |
|----------------|------------------------|
| SF-001 | FR-001 – FR-003 |
| SF-002 | FR-002, FR-006 |
| SF-003 | FR-010 – FR-016 |
| SF-004 | FR-017 – FR-020 |
| SF-005 | FR-021 – FR-025 |
| SF-006 | FR-026 – FR-029 |
| SF-007 | FR-030 – FR-034 |
| SF-008 | FR-035 – FR-039 |
| SF-009 | FR-040 – FR-044 |
| SF-010 | FR-045 – FR-048 |
---

# 7.13 System Feature SF-011 – Courtroom Simulation

## Description

The Courtroom Simulation module enables users to simulate courtroom proceedings using AI-generated legal reasoning based on uploaded case information. The simulation is intended for legal education, research, and decision-support purposes.

---

### Actors

- Lawyer
- Law Student
- Legal Researcher

---

### Preconditions

- User is authenticated.
- Legal case exists.
- AI services are available.

---

### Trigger

User clicks **Start Courtroom Simulation**.

---

### Main Flow

1. User selects a legal case.
2. System retrieves case information.
3. AI generates plaintiff arguments.
4. AI generates defendant arguments.
5. AI predicts possible judicial observations.
6. Simulation report is generated.
7. User reviews or downloads the report.

---

### Alternative Flow

- Case information incomplete.
- AI simulation unavailable.

---

### Postconditions

- Simulation report stored.
- User may download PDF.

---

### Exceptions

- AI service timeout.
- Simulation generation failure.

---

### Related Requirements

- FR-049
- FR-050
- FR-051
- FR-052

---

# 7.14 System Feature SF-012 – Analytics Dashboard

## Description

The Analytics Dashboard provides users with statistical insights regarding legal cases, AI predictions, reports, and overall platform activity.

---

### Actors

- Administrator
- Lawyer
- Researcher

---

### Preconditions

- User authenticated.

---

### Trigger

Dashboard opened.

---

### Main Flow

1. Dashboard loads.
2. Backend retrieves statistics.
3. Graphs generated.
4. KPIs displayed.
5. Recent activity shown.

---

### Alternative Flow

- No available data.

---

### Postconditions

- Dashboard statistics displayed.

---

### Exceptions

- Database unavailable.

---

### Related Requirements

- FR-053
- FR-054
- FR-055
- FR-056

---

# 7.15 System Feature SF-013 – Notification Management

## Description

The Notification System informs users about completed AI analyses, account activities, and important platform events.

---

### Actors

All authenticated users.

---

### Preconditions

User authenticated.

---

### Trigger

A notification event occurs.

---

### Main Flow

1. Event detected.
2. Notification generated.
3. Stored in database.
4. Displayed in Notification Center.
5. Email sent (if enabled).

---

### Alternative Flow

Email service unavailable.

---

### Postconditions

Notification delivered.

---

### Exceptions

Notification service unavailable.

---

### Related Requirements

- FR-057
- FR-058
- FR-059

---

# 7.16 System Feature SF-014 – Audit Logging

## Description

The Audit Logging feature records important user and system activities to improve security, traceability, and accountability.

---

### Actors

Administrator

---

### Preconditions

System running.

---

### Trigger

User performs important action.

---

### Main Flow

1. Event occurs.
2. Event details captured.
3. Log written.
4. Administrator reviews logs.

---

### Alternative Flow

Logging service unavailable.

---

### Postconditions

Audit log stored.

---

### Exceptions

Database failure.

---

### Related Requirements

- FR-060
- FR-061
- FR-062

---

# 7.17 System Feature SF-015 – Administration Module

## Description

The Administration Module enables administrators to manage users, AI models, datasets, and overall platform configuration.

---

### Actors

Administrator

---

### Preconditions

Administrator authenticated.

---

### Trigger

Administrator accesses Admin Dashboard.

---

### Main Flow

1. Dashboard loaded.
2. Users managed.
3. Roles assigned.
4. AI models monitored.
5. Datasets managed.
6. Platform statistics reviewed.

---

### Alternative Flow

Insufficient privileges.

---

### Postconditions

Administrative changes saved.

---

### Exceptions

Database unavailable.

---

### Related Requirements

- FR-063
- FR-064
- FR-065
- FR-066
- FR-067
- FR-068

---

# 7.18 Complete System Feature Traceability Matrix

| System Feature | Related Functional Requirements |
|----------------|---------------------------------|
| SF-001 | FR-001 – FR-005 |
| SF-002 | FR-006 – FR-009 |
| SF-003 | FR-010 – FR-016 |
| SF-004 | FR-017 – FR-020 |
| SF-005 | FR-021 – FR-025 |
| SF-006 | FR-026 – FR-029 |
| SF-007 | FR-030 – FR-034 |
| SF-008 | FR-035 – FR-039 |
| SF-009 | FR-040 – FR-044 |
| SF-010 | FR-045 – FR-048 |
| SF-011 | FR-049 – FR-052 |
| SF-012 | FR-053 – FR-056 |
| SF-013 | FR-057 – FR-059 |
| SF-014 | FR-060 – FR-062 |
| SF-015 | FR-063 – FR-068 |

---

# End of Chapter 7
---

# 8. Database Requirements

## 8.1 Overview

The WakuLaw platform shall utilize **MongoDB** as its primary database management system. MongoDB is selected due to its flexibility, scalability, schema-less document model, and ability to efficiently manage semi-structured legal documents and AI-generated metadata.

The database shall store user accounts, legal cases, uploaded documents, AI predictions, reports, audit logs, notifications, datasets, and system configuration data.

---

## 8.2 Database Technology

| Component | Technology |
|------------|------------|
| Database | MongoDB |
| ORM / ODM | Spring Data MongoDB |
| Database Driver | MongoDB Java Driver |
| Data Format | BSON Documents |
| Backup Strategy | Automated Scheduled Backup |

---

# 8.3 Database Collections

The system shall utilize the following primary collections.

| Collection | Purpose |
|------------|----------|
| users | Stores user accounts |
| roles | Stores system roles |
| cases | Stores legal case information |
| documents | Stores uploaded legal documents |
| predictions | Stores AI prediction results |
| summaries | Stores summarized legal documents |
| similar_cases | Stores semantic search results |
| evidence | Stores uploaded evidence |
| contradictions | Stores contradiction reports |
| simulations | Stores courtroom simulations |
| reports | Stores generated reports |
| notifications | Stores user notifications |
| audit_logs | Stores security and activity logs |
| datasets | Stores AI dataset metadata |
| ai_models | Stores AI model information |
| settings | Stores system configuration |

---

# 8.4 Users Collection

Purpose:

Stores registered platform users.

### Fields

- _id
- fullName
- email
- passwordHash
- roleId
- profileImage
- phone
- createdAt
- updatedAt
- accountStatus

Indexes

- email (Unique)
- roleId

---

# 8.5 Cases Collection

Purpose

Stores legal case information.

### Fields

- _id
- userId
- caseTitle
- caseType
- court
- description
- filingDate
- createdAt
- updatedAt
- status

Indexes

- userId
- caseType
- filingDate

---

# 8.6 Documents Collection

Purpose

Stores uploaded legal documents.

### Fields

- _id
- caseId
- fileName
- fileType
- fileSize
- storagePath
- uploadedBy
- uploadedAt

Indexes

- caseId

---

# 8.7 Predictions Collection

Purpose

Stores AI prediction results.

### Fields

- _id
- caseId
- prediction
- confidenceScore
- explanation
- aiModel
- predictionDate

Indexes

- caseId

---

# 8.8 Similar Cases Collection

Purpose

Stores semantic similarity search results.

### Fields

- _id
- caseId
- similarCaseId
- similarityScore
- createdAt

Indexes

- caseId
- similarityScore

---

# 8.9 Summaries Collection

Purpose

Stores AI-generated legal summaries.

### Fields

- _id
- caseId
- summary
- summaryType
- createdAt

Indexes

- caseId

---

# 8.10 Evidence Collection

Purpose

Stores uploaded legal evidence.

### Fields

- _id
- caseId
- evidenceType
- evidenceStrength
- filePath
- uploadedAt

Indexes

- caseId

---

# 8.11 Reports Collection

Purpose

Stores generated PDF reports.

### Fields

- _id
- reportType
- reportPath
- generatedBy
- generatedAt

Indexes

- generatedBy

---

# 8.12 Audit Logs Collection

Purpose

Stores system activity logs.

### Fields

- _id
- userId
- action
- ipAddress
- device
- timestamp

Indexes

- userId
- timestamp

---

# 8.13 Notifications Collection

Purpose

Stores user notifications.

### Fields

- _id
- userId
- title
- message
- isRead
- createdAt

Indexes

- userId

---

# 8.14 AI Models Collection

Purpose

Stores AI model metadata.

### Fields

- _id
- modelName
- version
- accuracy
- precision
- recall
- f1Score
- trainingDate
- status

Indexes

- modelName

---

# 8.15 Dataset Collection

Purpose

Stores AI training dataset metadata.

### Fields

- _id
- datasetName
- source
- version
- totalRecords
- uploadDate

Indexes

- datasetName

---

# 8.16 Database Relationships

Although MongoDB is a NoSQL database, logical relationships exist between collections.

| Parent Collection | Child Collection | Relationship |
|------------------|-----------------|--------------|
| Users | Cases | One-to-Many |
| Cases | Documents | One-to-Many |
| Cases | Predictions | One-to-Many |
| Cases | Evidence | One-to-Many |
| Cases | Reports | One-to-Many |
| Users | Notifications | One-to-Many |
| Users | Audit Logs | One-to-Many |

---

# 8.17 Data Validation Rules

The system shall enforce the following validation rules:

- Email addresses shall be unique.
- Passwords shall be securely hashed.
- Uploaded documents shall support only approved file formats.
- AI prediction records shall always reference an existing case.
- Deleted users shall not automatically remove historical audit logs.
- Required fields shall never be null.

---

# 8.18 Backup and Recovery

The database shall support:

- Daily automated backups.
- Manual backup generation.
- Recovery from backup.
- Backup verification.
- Disaster recovery procedures.

---

# 8.19 Database Security

The database shall implement:

- Authentication.
- Authorization.
- Encrypted connections.
- Role-based access.
- Backup encryption.
- Audit logging.

---

# 8.20 Future Database Expansion

The MongoDB schema shall be designed to support future modules including:

- Mobile application data.
- Court integration.
- OCR document processing.
- Voice assistant history.
- Multi-language legal datasets.
- AI feedback collection.

---

# End of Chapter 8
---

# 9. Artificial Intelligence Requirements

## 9.1 AI Architecture Overview

The Artificial Intelligence subsystem shall function as an independent microservice developed using Python and FastAPI. It shall communicate with the Spring Boot backend through secure REST APIs and perform all intelligent processing tasks.

The AI subsystem consists of the following modules:

- Court Case Prediction Engine
- Similar Case Retrieval Engine
- Legal Document Summarization Engine
- AI Legal Assistant
- Explainable AI Engine
- Evidence Analysis Engine
- Contradiction Detection Engine
- Courtroom Simulation Engine

Each module shall be independently deployable and maintainable.

---

# 9.2 AI Technology Stack

| Component | Technology |
|------------|------------|
| Programming Language | Python 3.12+ |
| Framework | FastAPI |
| Machine Learning | Scikit-learn |
| Deep Learning | PyTorch |
| NLP | Hugging Face Transformers |
| Embeddings | Sentence Transformers |
| Vector Search | FAISS |
| Data Processing | Pandas |
| Numerical Computing | NumPy |
| Model Serialization | Joblib / PyTorch |
| API Communication | REST |

---

# 9.3 Court Case Prediction Engine

## Purpose

Predict the probable outcome of a legal case using trained Machine Learning models.

### Inputs

- Case Description
- Case Type
- Legal Arguments
- Evidence Summary
- Court Information
- Historical Features

### Outputs

- Predicted Outcome
- Confidence Score
- Explainable AI Report

### Processing Steps

1. Receive request from Backend.
2. Validate input.
3. Preprocess text.
4. Generate features.
5. Execute prediction model.
6. Generate confidence score.
7. Generate explanation.
8. Return response.

---

# 9.4 Similar Case Retrieval Engine

## Purpose

Retrieve legally similar historical cases using semantic similarity.

### Processing Pipeline

1. Extract document text.
2. Clean text.
3. Generate embeddings.
4. Search vector database.
5. Rank results.
6. Return Top-K matches.

### Output

- Similar Cases
- Similarity Score
- Case Metadata

---

# 9.5 Legal Document Summarization

## Purpose

Generate concise summaries of lengthy legal documents.

### Processing

1. Read document.
2. Clean text.
3. Chunk large documents.
4. Generate summary.
5. Validate summary.
6. Store result.

Output:

- Summary
- Key Facts
- Legal Issues
- Decision Summary

---

# 9.6 AI Legal Assistant

## Purpose

Provide conversational legal assistance.

Capabilities include:

- Legal Question Answering
- Legal Explanation
- Context Awareness
- Follow-up Conversations
- Uploaded Document Understanding

The chatbot shall maintain conversation history for authenticated users.

---

# 9.7 Explainable AI Engine

Purpose

Improve transparency by explaining every AI prediction.

The engine shall provide:

- Confidence Explanation
- Important Features
- Similar Case Reasoning
- Human-readable Explanation
- Prediction Transparency

The system shall clearly state that AI predictions are recommendations and not legally binding decisions.

---

# 9.8 Evidence Analysis Engine

Purpose

Analyze uploaded legal evidence.

Capabilities include:

- Evidence Classification
- Evidence Strength Estimation
- Missing Evidence Suggestions
- Evidence Reports

---

# 9.9 Contradiction Detection Engine

Purpose

Detect conflicting information across legal documents.

Processing Steps

1. Parse documents.
2. Extract statements.
3. Compare statements.
4. Detect contradictions.
5. Assign severity.
6. Generate report.

---

# 9.10 Courtroom Simulation Engine

Purpose

Generate AI-powered courtroom simulations.

Outputs include:

- Plaintiff Arguments
- Defendant Arguments
- Possible Judicial Observations
- Simulation Report

---

# 9.11 AI Model Training Pipeline

The training workflow shall consist of:

1. Dataset Collection
2. Data Cleaning
3. Text Preprocessing
4. Feature Engineering
5. Dataset Splitting
6. Model Training
7. Hyperparameter Tuning
8. Model Evaluation
9. Model Validation
10. Model Deployment

---

# 9.12 Dataset Requirements

The AI subsystem shall support datasets containing:

- Historical Court Cases
- Case Descriptions
- Court Decisions
- Legal Categories
- Judgments
- Evidence Metadata

Datasets shall be divided into:

- Training Set
- Validation Set
- Testing Set

---

# 9.13 Feature Engineering

Features extracted may include:

- Case Type
- Legal Keywords
- Named Entities
- Court Name
- Document Length
- Citation Count
- Legal Categories
- TF-IDF Features
- Sentence Embeddings

---

# 9.14 Model Evaluation

Each AI model shall be evaluated using appropriate metrics.

Classification Metrics

- Accuracy
- Precision
- Recall
- F1 Score

Similarity Search

- Precision@K
- Recall@K
- Mean Reciprocal Rank (MRR)

Summarization

- ROUGE Score
- BLEU Score

---

# 9.15 Model Versioning

Every trained model shall include:

- Model Name
- Version
- Training Dataset
- Training Date
- Evaluation Results
- Deployment Status

Older versions shall remain archived.

---

# 9.16 AI Inference Pipeline

Runtime workflow:

1. Request received.
2. Input validated.
3. Preprocessing.
4. Model inference.
5. Explainability generated.
6. Response returned.
7. Results logged.

---

# 9.17 AI Performance Requirements

The AI subsystem shall:

- Process prediction requests efficiently for demonstration purposes.
- Support concurrent AI requests during normal usage.
- Maintain consistent prediction quality.
- Log all AI requests for monitoring.

---

# 9.18 AI Security Requirements

The AI subsystem shall:

- Validate all inputs.
- Reject malicious files.
- Log prediction requests.
- Restrict model management to administrators.
- Protect training datasets.

---

# 9.19 Future AI Enhancements

Future versions may include:

- Large Language Models (LLMs)
- Retrieval-Augmented Generation (RAG)
- OCR for scanned legal documents
- Voice-based Legal Assistant
- Urdu Language Support
- Multi-language Legal Research
- Reinforcement Learning
- Federated Learning

---

# End of Chapter 9
---

# 10. Security Requirements

## 10.1 Overview

WakuLaw processes confidential legal information and AI-generated analyses. Therefore, the platform shall implement multiple layers of security to protect user accounts, uploaded documents, AI models, and stored data against unauthorized access, modification, and disclosure.

The security architecture shall follow the principles of:

- Confidentiality
- Integrity
- Availability
- Accountability
- Least Privilege
- Defense in Depth

---

# 10.2 Authentication

## SEC-001 User Authentication

The platform shall require users to authenticate before accessing protected resources.

---

## SEC-002 Password Security

Passwords shall:

- Never be stored in plain text.
- Be hashed using BCrypt.
- Meet minimum complexity requirements.

---

## SEC-003 JWT Authentication

Authenticated users shall receive a signed JSON Web Token (JWT) after successful login.

JWT shall be required for all protected API endpoints.

---

## SEC-004 Session Expiration

User sessions shall automatically expire after a configurable period of inactivity.

---

# 10.3 Authorization

## SEC-005 Role-Based Access Control (RBAC)

Access to platform resources shall be controlled through role-based permissions.

Supported roles include:

- Administrator
- Lawyer
- Law Student
- Legal Researcher

---

## SEC-006 Resource Ownership

Users shall only access resources they own unless administrative privileges exist.

---

# 10.4 Data Security

## SEC-007 Encryption in Transit

All communication between client, backend, AI services, and database shall use HTTPS/TLS.

---

## SEC-008 Encryption at Rest

Sensitive data and backup files shall be encrypted before storage.

---

## SEC-009 Sensitive Data Protection

Sensitive information including passwords and authentication tokens shall never be exposed in API responses.

---

# 10.5 File Upload Security

## SEC-010 File Validation

Uploaded files shall be validated before processing.

Validation includes:

- File Type
- File Size
- File Extension
- Malware Scanning (Future Enhancement)

---

## SEC-011 Storage Isolation

Uploaded legal documents shall be stored outside the publicly accessible web directory.

---

# 10.6 API Security

## SEC-012 Protected Endpoints

All protected API endpoints shall require authentication.

---

## SEC-013 Input Validation

All API requests shall be validated before processing.

---

## SEC-014 Error Handling

The API shall never expose stack traces or sensitive server information to end users.

---

# 10.7 AI Security

## SEC-015 AI Request Validation

Every AI request shall undergo validation before inference.

---

## SEC-016 AI Model Protection

Only administrators shall upload, replace, or retrain AI models.

---

## SEC-017 Dataset Protection

Training datasets shall only be accessible to authorized administrators.

---

# 10.8 Audit Logging

## SEC-018 User Activity Logging

The platform shall record:

- Login
- Logout
- File Upload
- Prediction Request
- Report Download

---

## SEC-019 Administrative Logging

Administrative actions shall be logged separately.

---

## SEC-020 Security Event Logging

The system shall log:

- Failed Login Attempts
- Unauthorized Access Attempts
- Token Validation Failures
- Administrative Changes

---

# 10.9 Backup & Recovery

The platform shall support:

- Automated Backups
- Manual Backups
- Backup Verification
- Disaster Recovery
- Secure Restoration

---

# 10.10 Future Security Enhancements

Future versions may include:

- Multi-Factor Authentication (MFA)
- Hardware Security Keys
- AI-Based Threat Detection
- Zero Trust Architecture
- Single Sign-On (SSO)
- Security Information and Event Management (SIEM)

---

# End of Chapter 10
---

# 11. System Constraints

## 11.1 Technical Constraints

The development and deployment of WakuLaw shall be subject to the following technical constraints:

- The frontend shall be developed using React with TypeScript.
- The backend shall be implemented using Spring Boot (Java 21).
- AI services shall be developed using Python and FastAPI.
- MongoDB shall be used as the primary database.
- Communication between services shall occur through RESTful APIs using JSON.
- The system shall be deployable using Docker containers.

---

## 11.2 Resource Constraints

The project shall consider the following limitations:

- Limited GPU availability for AI model training.
- Limited publicly available Pakistani legal datasets.
- Academic project timeline.
- Limited financial resources for commercial AI APIs.

---

## 11.3 Legal Constraints

The system shall operate as a legal decision-support platform only.

The platform:

- Shall not replace judges.
- Shall not replace lawyers.
- Shall not issue legally binding judgments.
- Shall clearly state that AI predictions are advisory only.

---

# 12. Assumptions and Dependencies

## 12.1 Assumptions

The following assumptions have been made during the development of WakuLaw:

- Users have access to a stable internet connection.
- Users possess basic computer literacy.
- Historical legal datasets are available for AI model training.
- MongoDB supports the required data volume.
- AI models can be retrained when new datasets become available.
- System administrators maintain server infrastructure.

---

## 12.2 External Dependencies

The platform depends upon:

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Spring Boot
- Spring Security
- JWT

### AI

- FastAPI
- PyTorch
- Hugging Face Transformers
- Sentence Transformers
- FAISS
- Scikit-learn

### Database

- MongoDB

### DevOps

- Docker
- Git
- GitHub

---

# 13. Acceptance Criteria

The WakuLaw platform shall be considered complete when the following conditions are satisfied.

## Functional Acceptance

- User Registration functions correctly.
- Secure Login implemented.
- Case Management operational.
- Court Case Prediction operational.
- Similar Case Retrieval operational.
- Legal Document Summarization operational.
- AI Legal Assistant operational.
- Evidence Analysis operational.
- Contradiction Detection operational.
- Courtroom Simulation operational.
- Dashboard operational.
- Administration Panel operational.

---

## Non-Functional Acceptance

- Authentication is secure.
- Role-Based Access Control functions correctly.
- Responsive user interface.
- Stable backend services.
- AI services communicate successfully.
- MongoDB stores and retrieves data correctly.
- REST APIs function as expected.
- Error handling implemented.

---

## AI Acceptance

- AI prediction model successfully performs inference.
- Similarity search returns relevant historical cases.
- Summarization model generates meaningful summaries.
- Explainable AI provides prediction reasoning.
- Confidence scores are generated.
- AI models are version controlled.

---

## Security Acceptance

- JWT authentication implemented.
- Passwords encrypted.
- HTTPS enabled.
- Audit logging operational.
- Role permissions enforced.
- Sensitive data protected.

---

# 14. Glossary

| Term | Description |
|------|-------------|
| AI | Artificial Intelligence |
| ML | Machine Learning |
| NLP | Natural Language Processing |
| XAI | Explainable Artificial Intelligence |
| API | Application Programming Interface |
| JWT | JSON Web Token |
| RBAC | Role-Based Access Control |
| CRUD | Create, Read, Update, Delete |
| REST | Representational State Transfer |
| JSON | JavaScript Object Notation |
| PDF | Portable Document Format |

---

# 15. Appendix

## Appendix A – Technology Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite
- Axios

---

### Backend

- Java 21
- Spring Boot
- Spring Security
- JWT
- Maven

---

### Database

- MongoDB

---

### AI

- Python
- FastAPI
- PyTorch
- Hugging Face Transformers
- Sentence Transformers
- FAISS
- Scikit-learn
- Pandas
- NumPy

---

### Development Tools

- Git
- GitHub
- Docker
- Visual Studio Code
- Postman

---

## Appendix B – Document Traceability

| Document ID | Document Name |
|--------------|-----------------------------|
| WK-DOC-001 | Product Vision |
| WK-DOC-002 | Product Requirements Document |
| WK-DOC-003 | Software Requirements Specification |
| WK-DOC-004 | Software Architecture Document |
| WK-DOC-005 | AI Architecture Document |
| WK-DOC-006 | Database Design Document |
| WK-DOC-007 | API Specification |
| WK-DOC-008 | UI/UX Design System |

---

# 16. Revision Approval

| Role | Name | Status |
|------|------|--------|
| Prepared By | Team WakuLaw | Completed |
| Reviewed By | Sir Zahid Sarwar | Pending Review |
| Version | 1.0 | Draft |

---

# End of Software Requirements Specification

**Document ID:** WK-DOC-003

**Version:** 1.0

**Status:** Draft

**Project:** WakuLaw – Explainable AI Legal Intelligence Platform
