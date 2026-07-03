# Deployment Architecture Document

---

# 1. Document Information

| Field | Details |
|--------|---------|
| Document Name | Deployment Architecture Document |
| Project Name | WakuLaw – Explainable AI Legal Intelligence Platform |
| Document ID | WK-DOC-010 |
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
| 1.0 | 03 July 2026 | Team WakuLaw | Initial Deployment Architecture |

---

# 3. Table of Contents

1. Introduction

2. Deployment Objectives

3. Technology Stack

4. System Architecture

5. Infrastructure

6. Docker

7. Networking

8. Monitoring

9. Backup

10. Scalability

11. Future Cloud Deployment

---

# 4. Introduction

This document defines how WakuLaw is deployed in development, testing, staging, and production environments.

The deployment architecture emphasizes scalability, maintainability, security, and reliability while supporting AI-powered legal analysis services.

---

# 5. Deployment Objectives

The deployment architecture aims to:

- Simplify local development.
- Standardize deployments.
- Support containerization.
- Isolate services.
- Enable horizontal scaling.
- Protect sensitive data.
- Simplify maintenance.
- Prepare for future cloud deployment.

---

# 6. Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React + Vite |
| Backend | Spring Boot |
| AI Services | FastAPI |
| Database | MongoDB |
| Vector Database | Qdrant |
| Reverse Proxy | Nginx |
| Containers | Docker |
| Container Orchestration | Docker Compose |
| Version Control | Git + GitHub |

---

# End of Part 1
---

# 7. System Deployment Architecture

The WakuLaw platform follows a layered deployment architecture where each service has a clearly defined responsibility.

---

## Deployment Flow

Client Browser

↓

Nginx Reverse Proxy

↓

Spring Boot API Gateway

↓

Business Services

↓

FastAPI AI Platform

↓

MongoDB

+

Qdrant Vector Database

---

## Service Responsibilities

### React Frontend

Responsibilities

- User Interface
- Authentication Screens
- Dashboard
- AI Workspace
- Reports
- Timeline
- Strategy Dashboard

Deployment

Static Build served through Nginx.

---

### Nginx Reverse Proxy

Responsibilities

- HTTPS Termination
- Reverse Proxy
- Static File Serving
- Request Routing
- Compression
- Security Headers
- Rate Limiting

---

### Spring Boot Backend

Responsibilities

- Authentication
- Authorization
- Business Logic
- REST APIs
- MongoDB Access
- AI Platform Communication
- Report Generation

---

### FastAPI AI Platform

Responsibilities

- AI Orchestrator
- Prediction Engine
- Similarity Engine
- Summarization
- Explainability
- Strategy Analyzer
- Timeline Intelligence
- AI Chat

---

### MongoDB

Responsibilities

- Users
- Cases
- Documents
- Reports
- Audit Logs
- AI Metadata

---

### Qdrant

Responsibilities

- Semantic Embeddings
- Similar Case Search
- Vector Search
- AI Retrieval

---

# 8. Docker Architecture

Every major component executes inside its own Docker container.

Containers

- frontend
- nginx
- backend
- ai-service
- mongodb
- qdrant

Each container is independently deployable.

---

## Docker Network

All containers communicate using a private Docker bridge network.

```
waku-network
```

Only Nginx exposes public ports.

---

# 9. Container Communication

React

↓

Nginx

↓

Spring Boot

↓

FastAPI

↓

MongoDB

↓

Qdrant

Spring Boot communicates internally with FastAPI.

FastAPI communicates internally with MongoDB and Qdrant.

No direct client access is allowed.

---

# 10. Environment Configuration

Each service shall maintain its own environment variables.

Examples

Frontend

```
VITE_API_BASE_URL
```

Backend

```
SPRING_DATA_MONGODB_URI

JWT_SECRET

AI_SERVICE_URL

QDRANT_URL
```

AI Platform

```
MODEL_PATH

MONGODB_URI

QDRANT_URL

OPENAI_API_KEY (Optional)

HF_TOKEN (Optional)
```

Secrets shall never be committed to Git.

---

# 11. Storage Strategy

Persistent volumes shall be used for:

MongoDB

↓

Database Storage

Qdrant

↓

Vector Storage

Reports

↓

Generated PDFs

Uploads

↓

Legal Documents

Logs

↓

Application Logs

---

# 12. Reverse Proxy Configuration

Nginx routes requests.

Example

```
/

↓

React Frontend

/api

↓

Spring Boot

/ai

↓

Spring Boot → FastAPI

/uploads

↓

Document Storage
```

---

# End of Part 2
---

# 13. CI/CD Pipeline

The WakuLaw platform uses Continuous Integration and Continuous Deployment (CI/CD) to automate testing, building, and deployment.

---

## Pipeline Flow

Developer Push

↓

GitHub Repository

↓

GitHub Actions

↓

Automated Tests

↓

Build Docker Images

↓

Security Checks

↓

Deployment

---

## Pipeline Stages

### Stage 1

Source Code Checkout

---

### Stage 2

Dependency Installation

---

### Stage 3

Static Code Analysis

---

### Stage 4

Unit Testing

---

### Stage 5

Integration Testing

---

### Stage 6

Docker Image Build

---

### Stage 7

Container Deployment

---

### Stage 8

Health Checks

---

### Stage 9

Deployment Complete

---

# 14. GitHub Actions

The repository shall include automated workflows.

## Frontend Workflow

- Install Dependencies
- Run ESLint
- Build React Application
- Execute Tests

---

## Backend Workflow

- Build Spring Boot
- Execute Unit Tests
- Generate Test Report

---

## AI Workflow

- Install Python Dependencies
- Run AI Tests
- Validate Models

---

## Deployment Workflow

- Build Docker Images
- Push Images
- Deploy Containers
- Verify Deployment

---

# 15. Monitoring and Logging

The platform continuously monitors application health.

---

## Health Monitoring

Monitored Services

- Frontend
- Backend
- AI Platform
- MongoDB
- Qdrant
- Nginx

---

## Performance Metrics

Collected Metrics

- CPU Usage
- Memory Usage
- API Response Time
- AI Processing Time
- Error Rate
- Active Users

---

## Application Logs

Logs include

- API Requests
- Authentication Events
- AI Execution
- File Uploads
- Report Generation
- Database Errors

---

# 16. Backup Strategy

The platform implements automated backups.

---

## Backup Schedule

| Backup Type | Frequency |
|-------------|-----------|
| Incremental | Daily |
| Full Backup | Weekly |
| Archive Backup | Monthly |

---

## Backup Targets

- MongoDB
- Uploaded Documents
- Generated Reports
- Configuration Files
- AI Metadata

---

# 17. Disaster Recovery

The deployment supports disaster recovery procedures.

Recovery includes

- Database Restore
- File Restore
- Container Recreation
- Configuration Recovery

Target Recovery Objectives

Recovery Time Objective (RTO)

Less than 2 Hours

Recovery Point Objective (RPO)

Less than 24 Hours

---

# 18. High Availability

Future production deployments shall support:

- Multiple Backend Instances
- Load Balancing
- Database Replication
- Automatic Restart Policies
- Health Monitoring
- Rolling Updates

---

# 19. Performance Optimization

Performance improvements include:

- HTTP Compression
- Browser Caching
- API Pagination
- Lazy Loading
- Database Indexing
- Connection Pooling
- Asynchronous Processing

---

# 20. Cloud Deployment Readiness

The deployment architecture is designed to support future migration to cloud platforms.

Supported Platforms

- Amazon Web Services (AWS)
- Microsoft Azure
- Google Cloud Platform (GCP)
- DigitalOcean
- Oracle Cloud

---

## Future Enhancements

Future releases may include:

- Kubernetes
- Horizontal Auto Scaling
- CDN Integration
- Object Storage
- Distributed Caching
- Multi-Region Deployment
- Blue-Green Deployment
- Canary Releases

---

# 21. Deployment Architecture Summary

The WakuLaw deployment architecture provides:

- Docker-Based Deployment
- Reverse Proxy with Nginx
- React Frontend
- Spring Boot Backend
- FastAPI AI Platform
- MongoDB Database
- Qdrant Vector Database
- CI/CD Pipeline
- GitHub Actions
- Automated Backups
- Monitoring and Logging
- Disaster Recovery
- Cloud Readiness
- High Availability
- Performance Optimization

---

# End of Deployment Architecture Document

**Document ID:** WK-DOC-010

**Version:** 1.0

**Status:** Draft

**Prepared By:** Team WakuLaw

**Reviewed By:** Sir Zahid Sarwar