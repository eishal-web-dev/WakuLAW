# Contributing to WakuLaw

Thank you for contributing! This project follows a strict but simple workflow — please read this fully before your first contribution.

## Ground rules

1. **Never push directly to `main`.** All changes go through pull requests.
2. **One issue → one branch → one PR.** Every PR references its issue with `Closes #N`.
3. **Free-only stack.** Do not introduce paid APIs, services, or tools.
4. **No secrets or data in git.** `.env`, datasets, DB files, uploads, and model artifacts are gitignored — keep it that way.
5. **Honest AI.** Features must show sources for AI outputs and must not claim legal accuracy.

## Workflow

See [`docs/00_MVP/GITHUB_WORKFLOW.md`](docs/00_MVP/GITHUB_WORKFLOW.md) for the full guide. Short version:

```bash
git checkout main && git pull
git checkout -b <type>/<issue#>-short-title
# ... make changes, verify (npm run build / pytest) ...
git commit -m "feat: short description"
git push -u origin <branch>
gh pr create   # fill the PR template, include "Closes #N"
```

Branch types: `docs/`, `frontend/`, `backend/`, `ai/`, `test/`, `chore/`.
Commit style: `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`.

## Project structure

- `apps/web` — React + Vite + TypeScript + Tailwind frontend
- `apps/api` — FastAPI backend
- `ai/` — preprocessing, embeddings, retrieval, summarization, QA modules
- `docs/00_MVP/` — authoritative scope and architecture for the current version
- `docs/01_...`–`docs/12_...` — full long-term vision documentation
- `datasets/` — dataset registry and small committed samples only

## What to work on

Check the [open issues](../../issues) — they are ordered by milestone (M0 → M10). Issues labeled `status: ready` and `good first issue` are the best entry points.

## Code review

Every PR is reviewed by the other team member before merge. Reviews check: correctness, scope (matches the issue), tests/build passing, no secrets, and consistency with `docs/00_MVP/`.

## Questions

Open a GitHub issue or discuss in the issue thread of the task you're working on.
