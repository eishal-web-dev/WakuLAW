import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Sparkles } from 'lucide-react'
import { listCases, listCaseDocuments, errorMessage } from '../lib/api'
import type { Case, DocumentMeta } from '../lib/api'
import { formatBytes, formatDate } from '../lib/format'
import { Card, Badge, G } from '../components/design'
import ErrorAlert from '../components/ErrorAlert'
import Spinner from '../components/Spinner'

/**
 * Evidence Analysis: shows the selected case's documents — this IS the case
 * documents view for now (deeper AI evidence scoring is on the roadmap).
 */
export default function Evidence() {
  const navigate = useNavigate()
  const [cases, setCases] = useState<Case[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [docs, setDocs] = useState<DocumentMeta[]>([])
  const [loadingCases, setLoadingCases] = useState(true)
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listCases()
      .then((res) => {
        if (cancelled) return
        setCases(res.items)
        if (res.items.length > 0) setSelectedId(res.items[0].id)
      })
      .catch((err) => {
        if (!cancelled) setError(errorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoadingCases(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (selectedId === null) return
    let cancelled = false
    setLoadingDocs(true)
    listCaseDocuments(selectedId)
      .then((res) => {
        if (!cancelled) setDocs(res.items)
      })
      .catch((err) => {
        if (!cancelled) setError(errorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoadingDocs(false)
      })
    return () => {
      cancelled = true
    }
  }, [selectedId])

  const selected = cases.find((c) => c.id === selectedId) ?? null
  const withSummary = docs.filter((d) => d.has_summary).length

  return (
    <div className="p-8 space-y-7 overflow-y-auto h-full">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Evidence Analysis</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {selected
              ? `Documents on file for ${selected.case_number} ${selected.title}`
              : 'Select a case to review its documents'}
          </p>
        </div>
        {cases.length > 0 && (
          <select
            value={selectedId ?? ''}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="rounded-xl border border-border bg-muted/40 text-foreground text-sm px-4 py-2.5 focus:outline-none focus:border-primary/50"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.case_number} — {c.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {error && <ErrorAlert message={error} />}

      {loadingCases ? (
        <div className="py-10 flex justify-center"><Spinner label="Loading cases…" /></div>
      ) : cases.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">
          No cases yet — create a case and upload documents to analyze evidence.
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            {[
              [String(docs.length), 'Total Items'],
              [String(withSummary), 'Summarized'],
              [String(docs.length - withSummary), 'Pending Summary'],
              [selected?.status ?? '—', 'Case Status'],
            ].map(([v, l]) => (
              <Card key={l} className="p-4 text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: G }}>{v}</div>
                <div className="text-xs text-muted-foreground">{l}</div>
              </Card>
            ))}
          </div>

          {loadingDocs ? (
            <div className="py-10 flex justify-center"><Spinner label="Loading documents…" /></div>
          ) : docs.length === 0 ? (
            <Card className="p-10 text-center text-sm text-muted-foreground">
              No documents in this case yet — upload from the case page.
            </Card>
          ) : (
            <div className="space-y-3">
              {docs.map((item) => (
                <Card key={item.id} className="p-5 hover:border-white/10 transition-all cursor-pointer">
                  <button
                    className="flex items-start gap-4 w-full text-left"
                    onClick={() => navigate(`/documents/${item.id}`)}
                  >
                    <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: `${G}15` }}>
                      <FileText size={16} style={{ color: G }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="text-sm font-semibold text-foreground">{item.title}</div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{item.filename}</span>
                            <Badge label={`${item.num_chunks} chunks`} />
                            {item.has_summary && (
                              <span className="flex items-center gap-1 text-[10px]" style={{ color: G }}>
                                <Sparkles size={10} /> Summarized
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 text-xs text-muted-foreground">
                          <div>{formatBytes(item.size_bytes)}</div>
                          <div className="mt-0.5">{formatDate(item.created_at)}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
