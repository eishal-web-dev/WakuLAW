# Software Architecture Document (SAD)

---

# 1. Document Information

| Field | Details |
|--------|---------|
| Document Name | Software Architecture Document |
| Project Name | WakuLaw – Explainable AI Legal Intelligence Platform |
| Document ID | WK-DOC-004 |
| Version | 1.0 |
| Status | Draft |
| Prepared By | Team WakuLaw |
| Reviewed By | Sir Zahid Sarwar |
| Department | Software Engineering |
| Last Updated | 03 July 2026 |

---

# 2. Revision History

| Version | Date | Author | Description |
|----------|------------|--------------|--------------------------|
| 1.0 | 03 July 2026 | Team WakuLaw | Initial Architecture Document |

---

# 3. Table of Contents

1. Introduction

2. Architectural Goals

3. High-Level Architecture

4. Architectural Principles

5. Technology Stack

6. System Components

7. Data Flow

8. Deployment Architecture

9. Security Architecture

10. Scalability

11. Future Enhancements

---

# 4. Introduction

## 4.1 Purpose

This Software Architecture Document (SAD) defines the architectural design of the WakuLaw platform. It provides a comprehensive overview of the system structure, major software components, communication mechanisms, technology stack, deployment strategy, scalability considerations, and security architecture.

This document serves as the primary technical blueprint for software developers, AI engineers, testers, and future contributors during implementation.

---

## 4.2 Scope

The architecture covers the complete WakuLaw platform including:

- React Frontend
- Spring Boot Backend
- Python AI Services
- MongoDB Database
- REST APIs
- Authentication Services
- AI Processing Pipeline
- Deployment Infrastructure

---

## 4.3 Architectural Objectives

The architecture is designed to achieve the following objectives:

- High Maintainability
- Modular Design
- Scalability
- Security
- Performance
- Reliability
- Explainable Artificial Intelligence
- Easy Deployment
- Future Expandability

---

# 5. Architectural Goals

The architecture of WakuLaw has been designed according to modern software engineering principles.

Primary goals include:

## AG-001

Develop a modular architecture allowing independent development of frontend, backend, AI services, and database components.

---

## AG-002

Provide secure communication using REST APIs secured with JWT authentication.

---

## AG-003

Support future horizontal scaling without significant architectural redesign.

---

## AG-004

Separate business logic from AI processing logic.

---

## AG-005

Allow independent deployment of AI services.

---

## AG-006

Support future cloud deployment.

---

## AG-007

Provide maintainable and testable software architecture.

---

# 6. High-Level Architecture

WakuLaw follows a multi-layer modular architecture consisting of independent services.

The major architectural layers are:

- Presentation Layer
- API Layer
- Business Logic Layer
- AI Intelligence Layer
- Data Layer

The architecture follows a client-server model where the frontend communicates with backend services using RESTful APIs, while the backend communicates with AI microservices and MongoDB.

---

## High-Level Architecture Overview

Presentation Layer

↓

React Frontend

↓

Spring Boot REST API

↓

Business Services

↓

Python FastAPI AI Services

↓

MongoDB Database

---

# End of Part 1
---

# 7. Architectural Principles

The architecture of WakuLaw is designed according to modern software engineering principles to ensure maintainability, scalability, reliability, and security.

---

## AP-001 Separation of Concerns

Each major component of the platform shall perform a single well-defined responsibility.

Examples:

- React handles presentation.
- Spring Boot handles business logic.
- FastAPI handles AI processing.
- MongoDB handles data persistence.

---

## AP-002 Loose Coupling

Software components shall communicate through REST APIs to minimize dependencies between modules.

---

## AP-003 High Cohesion

Related functionality shall be grouped within the same service.

Example:

- Authentication logic remains inside Authentication Service.
- AI logic remains inside AI Service.

---

## AP-004 Scalability

The architecture shall support independent scaling of:

- Frontend
- Backend
- AI Services
- Database

---

## AP-005 Security by Design

Security mechanisms shall be integrated throughout the architecture rather than added after development.

---

## AP-006 Reusability

Business logic shall be reusable across different modules.

---

## AP-007 Fault Isolation

Failure of one subsystem shall not cause complete system failure.

Example:

If AI Summarization fails,

Prediction Service should continue operating.

---

# 8. Technology Stack

## Frontend Layer

| Technology | Purpose |
|------------|----------|
| React | User Interface |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Vite | Build Tool |
| Axios | REST Communication |

---

## Backend Layer

| Technology | Purpose |
|------------|----------|
| Java 21 | Programming Language |
| Spring Boot | REST Backend |
| Spring Security | Authentication |
| JWT | Authorization |
| Maven | Dependency Management |

---

## AI Layer

| Technology | Purpose |
|------------|----------|
| Python | AI Development |
| FastAPI | AI APIs |
| PyTorch | Deep Learning |
| Scikit-learn | Machine Learning |
| Hugging Face | NLP Models |
| Sentence Transformers | Embeddings |
| FAISS | Semantic Search |

---

## Database Layer

| Technology | Purpose |
|------------|----------|
| MongoDB | NoSQL Database |

---

## DevOps

| Technology | Purpose |
|------------|----------|
| Docker | Containerization |
| GitHub | Source Control |
| GitHub Actions | CI/CD |
| Postman | API Testing |

---

# 9. System Components

The WakuLaw platform is divided into independent software components.

---

## 9.1 Frontend Component

Responsibilities

- User Interface
- Authentication Pages
- Dashboard
- Forms
- Report Viewer
- AI Chat Interface

Technology

React + TypeScript

---

## 9.2 Backend Component

Responsibilities

- Business Logic
- REST APIs
- Authentication
- Authorization
- Validation
- Database Communication

Technology

Spring Boot

---

## 9.3 AI Component

Responsibilities

- Prediction Engine
- Similar Case Search
- Summarization
- AI Assistant
- Explainable AI
- Evidence Analysis
- Contradiction Detection
- Courtroom Simulation

Technology

Python + FastAPI

---

## 9.4 Database Component

Responsibilities

- User Storage
- Case Storage
- Prediction Storage
- Reports
- Audit Logs
- Notifications
- AI Metadata

Technology

MongoDB

---

## 9.5 Authentication Component

Responsibilities

- Login
- Registration
- JWT Token Generation
- Password Encryption
- Role Management

---

## 9.6 Reporting Component

Responsibilities

- PDF Generation
- AI Reports
- Prediction Reports
- Evidence Reports
- Dashboard Reports

---

# 10. Component Interaction

The interaction between system components follows a layered architecture.

Workflow

1. User performs action in React Frontend.
2. Frontend sends REST request to Spring Boot.
3. Spring Boot validates request.
4. Business logic executes.
5. If AI processing required:
   - Backend calls FastAPI AI Service.
6. AI returns prediction.
7. Backend stores results in MongoDB.
8. Backend sends response to Frontend.
9. Frontend displays results.

---

# End of Part 2
---

# 11. Layered Architecture

The WakuLaw platform follows a five-layer architecture to separate responsibilities and improve maintainability.

---

## 11.1 Presentation Layer

### Purpose

The Presentation Layer provides the graphical user interface (GUI) through which users interact with the platform.

### Responsibilities

- User Authentication Screens
- Dashboard
- Case Management Pages
- AI Prediction Pages
- AI Chat Interface
- Reports
- Notifications
- Settings

### Technology

- React
- TypeScript
- Tailwind CSS
- Vite

---

## 11.2 API Layer

### Purpose

Acts as the communication gateway between the frontend and backend services.

### Responsibilities

- Receive HTTP Requests
- Validate Requests
- JWT Authentication
- Route Requests
- Return JSON Responses

### Technology

- Spring Boot REST Controllers

---

## 11.3 Business Logic Layer

### Purpose

Contains the application's core business rules.

### Responsibilities

- User Management
- Case Management
- Prediction Requests
- Report Generation
- Notification Processing
- Audit Logging

### Technology

- Spring Boot Services

---

## 11.4 AI Intelligence Layer

### Purpose

Provides all Artificial Intelligence capabilities.

### AI Modules

- Court Case Prediction
- Similar Case Retrieval
- Legal Summarization
- AI Legal Assistant
- Explainable AI
- Evidence Analysis
- Contradiction Detection
- Courtroom Simulation

### Technology

- Python
- FastAPI
- PyTorch
- Hugging Face
- Sentence Transformers

---

## 11.5 Data Layer

### Purpose

Stores persistent system data.

### Stored Data

- Users
- Cases
- Documents
- AI Predictions
- Reports
- Notifications
- Audit Logs
- AI Metadata

### Technology

MongoDB

---

# 12. Request Lifecycle

The following sequence describes how a typical AI prediction request is processed.

---

## Step 1

User uploads a legal case using the React web application.

---

## Step 2

The frontend validates the input.

---

## Step 3

A secure HTTPS request is sent to the Spring Boot backend.

---

## Step 4

Spring Security validates the JWT token.

---

## Step 5

The backend validates all business rules.

---

## Step 6

The backend stores uploaded files and case metadata inside MongoDB.

---

## Step 7

The backend forwards the prediction request to the FastAPI AI Service.

---

## Step 8

The AI Service performs:

- Text Preprocessing
- Feature Extraction
- Model Inference
- Explainability Generation

---

## Step 9

Prediction results are returned to Spring Boot.

---

## Step 10

Prediction results are stored inside MongoDB.

---

## Step 11

The backend returns the prediction response.

---

## Step 12

React updates the dashboard and displays:

- Prediction
- Confidence Score
- Explanation
- Similar Cases

---

# 13. Service Responsibilities

## React Frontend

Responsible for:

- User Interface
- State Management
- Form Validation
- API Communication
- Dashboard Rendering

---

## Spring Boot Backend

Responsible for:

- Business Logic
- Authentication
- Authorization
- Validation
- MongoDB Operations
- AI Service Communication

---

## FastAPI AI Service

Responsible for:

- Machine Learning
- Natural Language Processing
- AI Inference
- Explainability
- Similarity Search
- Summarization

---

## MongoDB

Responsible for:

- Persistent Storage
- Indexing
- Query Execution
- Data Retrieval

---

# 14. API Communication Architecture

The platform communicates using REST APIs.

Communication flow:

React Frontend

↓

Spring Boot Backend

↓

FastAPI AI Services

↓

MongoDB

Communication format:

- HTTPS
- JSON
- JWT Authentication

---

# 15. Error Handling Architecture

The architecture shall gracefully handle failures.

Examples include:

- Invalid Requests
- Authentication Failure
- AI Service Timeout
- Database Connection Failure
- File Upload Failure
- Prediction Failure

Each error shall:

- Return a standardized HTTP status code.
- Generate an audit log.
- Display a user-friendly error message.
- Avoid exposing internal implementation details.

---

# End of Part 3
---

# 16. Deployment Architecture

## 16.1 Overview

The WakuLaw platform follows a distributed service architecture where each major component can be deployed independently. This architecture improves maintainability, scalability, fault isolation, and deployment flexibility.

The deployment consists of four primary services:

- React Frontend
- Spring Boot Backend
- FastAPI AI Service
- MongoDB Database

These services communicate over secure HTTPS using RESTful APIs.

---

## 16.2 Frontend Deployment

### Responsibilities

- Render user interface
- Handle routing
- Manage authentication state
- Communicate with backend APIs

### Deployment Platform

Examples:

- Vercel
- Netlify
- Nginx Server

---

## 16.3 Backend Deployment

### Responsibilities

- Business Logic
- Authentication
- Authorization
- Database Operations
- API Gateway
- AI Communication

### Deployment Platform

Examples:

- Docker Container
- VPS
- AWS EC2
- Azure VM
- DigitalOcean

---

## 16.4 AI Service Deployment

### Responsibilities

- Machine Learning Inference
- NLP Processing
- Semantic Search
- Explainability
- Summarization
- Evidence Analysis

### Deployment Platform

- Docker Container

The AI service shall operate independently from the backend to allow future horizontal scaling.

---

## 16.5 Database Deployment

### Database

MongoDB

Deployment Options

- MongoDB Atlas
- Self-Hosted MongoDB
- Docker MongoDB Container

The database shall only be accessible through authorized backend services.

---

# 17. Scalability Architecture

The architecture is designed for future scalability.

---

## Horizontal Scaling

Each service can be independently replicated.

Example:

React

↓

Spring Boot (2 Instances)

↓

FastAPI (3 Instances)

↓

MongoDB Replica Set

---

## Vertical Scaling

Hardware resources such as CPU, RAM, and Storage may be increased as system demand grows.

---

## Future Cloud Scaling

The architecture supports migration to cloud platforms including:

- AWS
- Microsoft Azure
- Google Cloud Platform

without requiring major architectural redesign.

---

# 18. Reliability Architecture

The platform shall maximize reliability through:

- Independent Services
- Centralized Logging
- Graceful Error Handling
- Database Backup
- AI Service Isolation
- Retry Mechanisms

---

## Fault Isolation

Failure of one subsystem shall not stop the remaining services.

Examples:

- AI Chatbot failure shall not affect Login.
- Prediction failure shall not affect Dashboard.
- Notification failure shall not affect Case Management.

---

# 19. Security Architecture

The security architecture follows a multi-layered approach.

---

## Authentication Layer

Responsible for:

- Login
- Registration
- JWT Token Generation
- Password Encryption

---

## Authorization Layer

Responsible for:

- Role Validation
- Permission Checking
- Protected API Access

---

## API Security Layer

Responsible for:

- HTTPS
- JWT Validation
- Input Validation
- Rate Limiting (Future)

---

## Database Security

Responsible for:

- Access Control
- Backup Encryption
- Authentication
- Secure Connections

---

## AI Security

Responsible for:

- Input Validation
- Model Protection
- Dataset Protection
- Request Logging

---

# 20. Logging and Monitoring

The system shall maintain centralized logs.

Logs include:

- Authentication Logs
- User Activity Logs
- Prediction Logs
- AI Service Logs
- Error Logs
- Security Logs

Future monitoring tools may include:

- Grafana
- Prometheus
- ELK Stack

---

# 21. Future Architecture Enhancements

Future versions of WakuLaw may introduce:

- Kubernetes Deployment
- API Gateway
- Redis Caching
- RabbitMQ Message Queue
- OCR Microservice
- Voice AI Service
- Multi-language AI Models
- Large Language Models (LLMs)
- Retrieval-Augmented Generation (RAG)
- Vector Database Integration (Qdrant or Pinecone)

---

# 22. Architectural Decisions

| Decision ID | Decision |
|-------------|----------|
| ADR-001 | React selected for frontend development. |
| ADR-002 | Spring Boot selected for backend services. |
| ADR-003 | Python FastAPI selected for AI services. |
| ADR-004 | MongoDB selected as the primary database. |
| ADR-005 | REST APIs selected for service communication. |
| ADR-006 | JWT selected for authentication. |
| ADR-007 | Docker selected for containerization. |
| ADR-008 | FAISS selected for semantic similarity search. |
| ADR-009 | Hugging Face Transformers selected for NLP tasks. |
| ADR-010 | Modular microservice-inspired architecture adopted for scalability. |

---

# End of Software Architecture Document

**Document ID:** WK-DOC-004

**Version:** 1.0

**Status:** Draft

**Prepared By:** Team WakuLaw

**Reviewed By:** Sir Zahid Sarwar