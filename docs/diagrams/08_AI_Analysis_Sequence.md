# AI Analysis Sequence Diagram

```text
User
 │
 │ Run Analysis
 ▼
React
 │
 ▼
Spring Boot
 │
 ▼
FastAPI
 │
 ├── Prediction
 ├── Summary
 ├── Timeline
 ├── Similar Cases
 └── Strategy Analysis
 │
 ▼
MongoDB + Qdrant
 │
 ▼
FastAPI
 │
 ▼
Spring Boot
 │
 ▼
React Dashboard
```

## Description

Shows how the AI Orchestrator coordinates multiple AI modules and returns a unified response.