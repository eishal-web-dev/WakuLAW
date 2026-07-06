# WakuLaw — MVP Scope

**Status:** Approved working scope for Version 1
**Relationship to other docs:** The documents in `docs/01_Product_Vision` through `docs/12_User_Guide` describe the complete long-term vision of WakuLaw as submitted in the FYP proposal. This document defines the subset that Version 1 (the MVP) implements. Where documents disagree, this document is authoritative for the current build.

---

## 1. Why an MVP

The approved proposal contains 19 objectives spanning prediction, simulation, fairness analysis, and multilingual support. Implementing all of them at production quality within an FYP timeline is not realistic, and several depend on labeled Pakistani legal datasets that do not publicly exist. The MVP therefore focuses on the features that are (a) achievable with free, open-source tools, (b) genuinely useful to the target users, and (c) demonstrably explainable — the core theme of the project.

## 2. MVP features (Version 1)

| # | Feature | Description |
|---|---------|-------------|
| 1 | Document upload | Upload legal documents (.txt, .pdf) with validation |
| 2 | Document viewing | List uploaded documents and view extracted text |
| 3 | Text processing | Cleaning and chunking of legal text for search |
| 4 | Summarization | Structured summary of a document (issue, facts, legal points, outcome if found) |
| 5 | Legal Q&A (RAG) | Ask questions answered **only** from uploaded documents, with source paragraphs shown |
| 6 | Similar case search | Semantic search returning the most similar chunks/cases with scores |
| 7 | Explainability | Every AI output shows its sources, similarity scores, and a confidence label with a reason |
| 8 | Dashboard | Simple overview: documents, recent activity |

### Definition of done for the MVP
A user can upload a Pakistani court judgment, read it, generate a summary, ask a question and receive an answer with visible source paragraphs and a confidence label, and find similar cases — all running locally on free software.

## 3. Explicitly out of scope for Version 1 (future scope)

| Feature | Why deferred |
|---------|--------------|
| Court outcome / bail / sentencing / duration prediction | Requires a labeled dataset (case text → outcome) that must first be collected and hand-labeled; deferred to optional M10 prototype |
| Courtroom simulation & what-if analysis | Depends on strong generative models and on prediction |
| Fake evidence / deepfake detection | Separate research field; not feasible within FYP scope |
| Bias & fairness detection | Requires demographic-labeled data that does not exist publicly |
| Urdu support & voice input | Limited open-source Urdu legal NLP; adds large complexity |
| Contradiction detection | Prototype-quality only with current free NLI models; revisit after MVP |
| Timeline generator, citation/forms generation | Valuable but non-core; candidate for Version 1.1 |
| Lawyer/client profiles, gigs, booking | Marketplace features are orthogonal to the AI core |
| Mobile app | Listed in proposal as future implementation |

These remain part of the project vision and are documented in the existing SRS/PRD; they will be presented in the final report as future work with an honest feasibility assessment (see `ETHICS_AND_LIMITATIONS.md`).

## 4. Constraints

- **Cost:** Zero. Only free and open-source tools, models, and data sources. No paid APIs at runtime.
- **Privacy:** No private or confidential case files; only public legal documents.
- **Honesty:** No claims of legal accuracy or guaranteed predictions anywhere in the product or report.

## 5. Legal disclaimer

WakuLaw is a decision-support and research tool. It does not provide legal advice and is not a replacement for lawyers, judges, or courts. All AI outputs are advisory, may contain errors, and must be verified against original sources.
