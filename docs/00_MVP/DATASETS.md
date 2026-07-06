# WakuLaw — Dataset Registry & Collection Plan

Only **free, public, legally accessible** sources are used. No paid databases (e.g., PakistanLawSite), no private case files, no confidential documents.

## 1. Primary sources (Pakistani legal texts)

| Source | URL | Content | Access |
|--------|-----|---------|--------|
| Supreme Court of Pakistan | scp.gov.pk (Judgments section) | Reported judgments (PDF) | Free download |
| Lahore High Court | lhc.gov.pk (Judgments/Reported) | Judgments (PDF) | Free download |
| Sindh High Court | sindhhighcourt.gov.pk (Case law) | Judgments (PDF) | Free download |
| Peshawar High Court | peshawarhighcourt.gov.pk | Judgments (PDF) | Free download |
| Balochistan High Court | bhc.gov.pk | Judgments (PDF) | Free download |
| Federal Shariat Court | federalshariatcourt.gov.pk | Judgments | Free download |
| Islamabad High Court | ihc.gov.pk | Judgments (PDF) | Free download |
| Pakistan Code | pakistancode.gov.pk | Statutes & acts (official consolidated laws) | Free |

## 2. Supplementary open datasets (for experimentation only)

| Source | Notes |
|--------|-------|
| Hugging Face `pile-of-law` | Mostly US/EU law — useful for pipeline testing, NOT for Pakistani legal answers |
| Kaggle legal-judgment datasets (e.g., Indian Supreme Court) | Closest jurisdictional style to Pakistani law; useful for prototyping the prediction baseline (M10) |

Anything non-Pakistani is used only for engineering validation and must never be presented as Pakistani case law in the product.

## 3. Storage layout

```
datasets/
├── README.md          # this registry, kept in sync
├── sample/            # 5–10 SMALL cleaned judgments — COMMITTED (used by tests)
├── raw/               # bulk downloads (PDF) — GITIGNORED
└── processed/         # cleaned/chunked text — GITIGNORED
```

Rules:
- Committed samples must be small (< 200 KB each), public, and cleaned.
- Bulk raw data, processed corpora, embeddings, FAISS indexes and DB files are never committed.
- Every collected file records its source URL and download date in `datasets/README.md` or a manifest.

## 4. Collection plan (issue #24)

1. Manually download 20–50 judgments across courts and case types (civil, criminal, bail, constitutional).
2. Record source + date in a manifest (CSV or Markdown table).
3. Run extraction + cleaning; move 5–10 representative cleaned texts into `sample/` for tests and demos.
4. Only automate scraping later if needed, respecting each site's robots.txt and terms.

## 5. Labeled data for prediction (M10, optional)

No public labeled Pakistani dataset (case text → outcome) exists. If M10 is attempted: labels (e.g., bail granted/rejected) will be hand-annotated by the team from the collected judgments, the labeling guide will be documented, and dataset size/limitations will be reported honestly. Until then, no prediction feature is built.

## 6. Licensing & ethics notes

- Court judgments are public records; we still cite the issuing court and avoid redistributing bulk archives.
- Personal data appearing in judgments is not indexed beyond what the public document contains, and the platform stores documents locally only.
