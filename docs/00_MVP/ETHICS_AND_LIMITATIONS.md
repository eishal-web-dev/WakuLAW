# WakuLaw — Ethics & Limitations

This document states, honestly and specifically, what WakuLaw can and cannot do. It is intended to be reproduced in the final FYP report.

## 1. Core position

WakuLaw is a **decision-support and research tool**. It is not legal advice, and it is not a replacement for lawyers, judges, or courts. Every AI output is advisory and must be verified against the original documents, which the system always displays alongside its answers.

## 2. Known limitations by feature

| Feature | Limitation |
|---------|------------|
| Legal Q&A (RAG) | Answers only from uploaded documents. If the documents don't contain the answer, the system says so rather than guessing. Generated text can still occasionally misread context — sources are shown so users can verify. |
| Summarization | Extractive summaries may omit nuance; they select sentences, they do not interpret law. |
| Similar case search | Similarity is semantic (meaning-based), not legal-doctrine-based. A textually similar case is not necessarily a legal precedent. |
| Confidence labels | Derived from retrieval similarity scores — an engineering signal, not a legal certainty measure. |
| Outcome prediction (future) | Not in the MVP. No public labeled Pakistani dataset exists; any future prototype will report measured metrics on a small hand-labeled dataset and must not be used for real decisions. |
| Bias detection (future) | Requires demographic-labeled data that does not publicly exist for Pakistan; deferred with this stated reason. |
| Fake evidence detection (future) | Deepfake/forgery detection is a separate research field; out of scope for this project. |
| Urdu support (future) | Open-source Urdu legal NLP is immature; the MVP is English-only. |

## 3. Responsible AI commitments

1. **Transparency:** every answer shows its sources; no sourceless answers.
2. **Honesty:** no fabricated accuracy numbers; all reported metrics come from documented evaluations.
3. **Refusal:** the system prefers "not enough information" over speculation.
4. **Privacy:** only public legal documents; local storage; no data sent to external services.
5. **Human oversight:** outputs are inputs to human judgment, never automated decisions.
6. **Misuse awareness:** the report will discuss risks of over-reliance on AI in legal contexts.

## 4. Data ethics

Judgments are public records, but they contain names of real people. WakuLaw stores and processes them locally, does not enrich them with external personal data, and does not publish bulk archives.

## 5. Academic integrity

The final report will describe the actual measured behavior of the system, including failures found during testing (`docs/11_Testing`). Future-scope features are presented as future work, not as completed functionality.
