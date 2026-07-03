# Component Diagram

```text
                WakuLaw System

                       │

 ┌─────────────────────────────────────────────┐
 │                 Frontend                    │
 │ Login │ Dashboard │ Cases │ AI │ Reports    │
 └─────────────────────────────────────────────┘
                       │
                       ▼
 ┌─────────────────────────────────────────────┐
 │              Spring Boot API                │
 │ Auth │ Cases │ Reports │ Users │ AI Client  │
 └─────────────────────────────────────────────┘
                       │
                       ▼
 ┌─────────────────────────────────────────────┐
 │               FastAPI AI                    │
 │ Prediction │ Summary │ Timeline │ Strategy  │
 └─────────────────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
     MongoDB                  Qdrant
```

## Description

This diagram illustrates the major software components and their relationships.