# WakuLaw — MVP Architecture

This document describes the architecture of Version 1 (MVP). The full-vision architecture (Spring Boot gateway, MongoDB, Qdrant, microservices) documented in `docs/04_Architecture` and `docs/05_AI_Architecture` remains the long-term reference; the MVP uses a deliberately simpler single-backend design that can evolve toward it.

## 1. System overview

```
                 ┌──────────────────────────┐
                 │   React + Vite + TS      │
                 │   Tailwind CSS (apps/web)│
                 └────────────┬─────────────┘
                              │ HTTP (JSON, /api/v1)
                 ┌────────────▼─────────────┐
                 │   FastAPI (apps/api)     │
                 │  routers / services      │
                 └──┬───────┬───────┬───────┘
                    │       │       │
        ┌───────────▼──┐ ┌──▼────────────┐ ┌─▼──────────────────┐
        │ SQLite (SQL- │ │ FAISS index   │ │ AI modules (ai/)   │
        │ Alchemy ORM) │ │ (chunk embed- │ │ extract, clean,    │
        │ docs, chunks,│ │ dings, local  │ │ chunk, embed,      │
        │ summaries    │ │ file)         │ │ summarize, RAG     │
        └──────────────┘ └───────────────┘ └─────────┬──────────┘
                                                     │
                                          ┌──────────▼──────────┐
                                          │ Local models (free) │
                                          │ sentence-transformers│
                                          │ Ollama (LLM for RAG)│
                                          └─────────────────────┘
```

## 2. Components

### Frontend — `apps/web`
React + Vite + TypeScript + Tailwind CSS. Pages: Landing, Dashboard, Upload, Documents list, Document detail (+ summary), Legal Q&A, Similar cases. A thin API client module isolates all HTTP calls so dummy data can be swapped for real endpoints per page.

### Backend — `apps/api`
Single FastAPI application. Routers: `documents`, `search`, `qa`, `health`. Services layer calls the AI modules. SQLAlchemy + SQLite for persistence (a single file, gitignored); the ORM keeps a later PostgreSQL swap trivial.

### AI modules — `ai/`
Plain Python packages imported by the backend (no separate service in the MVP):
- `preprocessing/` — text extraction (pypdf), cleaning, chunking (~500–800 words, overlapping)
- `embeddings/` — sentence-transformers `all-MiniLM-L6-v2` (small, fast, free, runs on CPU)
- `retrieval/` — FAISS index build/persist/search
- `summarization/` — extractive summarizer first (free, deterministic); optional local abstractive model later
- `qa/` — RAG pipeline: retrieve top-k chunks → build grounded prompt → generate with a local LLM via Ollama → attach sources + confidence

### Key request flows
- **Upload:** file → validate → store → extract text → clean → chunk → embed → index → done (status returned to UI).
- **Ask:** question → embed → FAISS top-k → if max similarity below threshold: answer "not enough information" → else LLM generates answer from chunks only → response = answer + source chunks + confidence label + reason.
- **Similar cases:** query → embed → FAISS top-k → results with document name, paragraph, score.
- **Summarize:** document chunks → extractive selection per chunk → combined structured summary → cached in DB.

## 3. API surface (MVP)

```
GET  /api/v1/health
POST /api/v1/documents/upload
GET  /api/v1/documents
GET  /api/v1/documents/{id}
POST /api/v1/documents/{id}/summarize
POST /api/v1/ask
POST /api/v1/similar-cases
```

## 4. Technology decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Single backend | FastAPI only | Matches the approved proposal (Python Flask/FastAPI); one language for backend + AI; simplest for the team |
| Database | SQLite via SQLAlchemy | Zero setup, free; ORM allows PostgreSQL later without code rewrite |
| Vector search | FAISS (local file) | Free, no server, proposal-listed |
| Embeddings | all-MiniLM-L6-v2 | Free, CPU-friendly, well-documented quality |
| LLM for RAG | Ollama (local, e.g. llama3.2 3B / qwen2.5 3B) | Free, offline, no API keys; abstracted behind an interface so the model can be swapped |
| Summarization | Extractive first | Free, fast, no hallucination; abstractive is an upgrade path |

## 5. Evolution path to the full vision

- SQLite → PostgreSQL or MongoDB (ORM/ODM boundary already in place)
- FAISS file → Qdrant server (retrieval module interface stays the same)
- AI modules → separate FastAPI microservice if load requires it
- Add prediction service once a labeled dataset exists (M10)
