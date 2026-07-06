# WakuLaw — Project Instructions

## What this project is
WakuLaw is a Final Year Project: an Explainable AI Legal Intelligence Platform for Pakistani legal research (supervisor-approved FYP proposal, session 2023–2027). The approved proposal describes a large platform; **we are building it MVP-first**. The authoritative scope for the current version is `docs/00_MVP/MVP_SCOPE.md`.

## Current state (update this section as the project progresses)
- Documentation foundation complete (`docs/00_MVP/`), issue backlog created (#1–#41, milestones M0–M10).
- No application code yet. Next up: M2 (frontend skeleton, issue #8) and M3 (backend skeleton, issue #16).
- The older docs in `docs/01_...`–`docs/12_...` describe the full long-term vision — treat them as future-scope reference, NOT as the current build target. Where they conflict with `docs/00_MVP/`, the MVP docs win.

## MVP scope (build ONLY this unless explicitly asked)
- Legal document upload (.txt, .pdf) + viewing
- Text cleaning + chunking
- Document summarization
- Legal Q&A grounded in uploaded documents (RAG) with visible sources
- Similar case search (embeddings + FAISS)
- Confidence labels + explainability panel
- Simple dashboard

## Future scope (do NOT implement unless explicitly asked)
Outcome/bail/sentencing/duration prediction, courtroom simulation, what-if analysis, fake-evidence/deepfake detection, voice input, Urdu support, bias detection, lawyer gigs/booking, contradiction detection, timeline generator, citation/forms generation.

## Tech stack (fixed — matches the approved proposal)
- Frontend: React + Vite + TypeScript + Tailwind CSS (`apps/web`)
- Backend: Python + FastAPI (`apps/api`) — single backend, NO Spring Boot
- AI: sentence-transformers (all-MiniLM-L6-v2), FAISS, RAG via local LLM (Ollama); extractive summarization first
- Database: SQLite via SQLAlchemy for MVP (PostgreSQL-swappable later)
- **Everything must be free**: no paid APIs, no paid hosting, no paid tools. Claude is a coding assistant only, never a runtime dependency of the app.
- **Local only**: the app runs entirely on the developer's machine. Do NOT deploy to any hosting service (no Vercel, no cloud) unless explicitly asked.

## AI rules
- Never claim legal certainty; the system is decision-support only, not legal advice.
- Every AI answer must show its source chunks or say there is not enough information.
- Prefer RAG over model training. No model training unless a clean labeled dataset exists (M10, optional).
- No fake/unverifiable accuracy claims anywhere (code, docs, report).

## Git workflow (strict)
- Never push directly to `main`. One branch per issue, then PR.
- Branch naming: `docs/<issue#>-short-title`, `frontend/<issue#>-...`, `backend/<issue#>-...`, `ai/<issue#>-...`, `test/<issue#>-...`, `chore/<issue#>-...`
- Commits: conventional style (`docs:`, `feat:`, `fix:`, `chore:`, `test:`, `refactor:`). No vague messages ("update", "final", "done").
- Commit messages and PRs must contain **no AI attribution lines of any kind** (no Co-Authored-By, no "generated with" footers).
- PRs reference their issue with `Closes #N`. Keep PRs small — one issue per PR.
- Work one issue at a time, in milestone order (M0 → M9). M10 is optional and last.

## Security rules
- Never commit: `.env`, API keys, private case files, large raw datasets, DB files, uploaded documents, model weights, FAISS indexes.
- `.env.example` documents required environment variables.

## Verification (run before every commit)
- Frontend: `npm run build` in `apps/web`
- Backend: `pytest` in `apps/api`
- Show the command output in the PR description under "Testing".

## Key references
- MVP scope: `docs/00_MVP/MVP_SCOPE.md`
- Roadmap/milestones: `docs/00_MVP/ROADMAP.md`
- Architecture: `docs/00_MVP/ARCHITECTURE_MVP.md`
- Datasets: `docs/00_MVP/DATASETS.md`
- Contribution workflow: `CONTRIBUTING.md`, `docs/00_MVP/GITHUB_WORKFLOW.md`
- Issue backlog: GitHub issues #1–#41 (milestones M0–M10)
