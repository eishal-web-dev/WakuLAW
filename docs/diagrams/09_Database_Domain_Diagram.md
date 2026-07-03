# Database Domain Diagram

```text
Users
 │
 ├──────── Cases
 │             │
 │             ├──── Documents
 │             ├──── Evidence
 │             ├──── Hearings
 │             ├──── Judgments
 │             ├──── Timeline
 │             ├──── Reports
 │             └──── AI Memory
 │
 └──────── Notifications

AI

Prediction

Summary

Strategy

Explainability

Similarity

↓

MongoDB

↓

Qdrant
```

## Description

Shows the high-level relationships between the main MongoDB collections.