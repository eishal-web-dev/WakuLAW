import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Brain, FileText, ExternalLink } from 'lucide-react'
import { findSimilarCases, errorMessage } from '../lib/api'
import type { Source } from '../lib/api'
import { groupSources, passageSummary } from '../lib/sources'
import { formatScore, excerpt } from '../lib/format'
import { Btn, Card, G, B } from '../components/design'
import Disclaimer from '../components/Disclaimer'
import ErrorAlert from '../components/ErrorAlert'
import Spinner from '../components/Spinner'

export default function SimilarCases() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Source[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async () => {
    const q = query.trim()
    if (!q || busy) return
    setBusy(true)
    setError(null)
    try {
      const res = await findSimilarCases(q)
      setResults(res.results)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const groups = results ? groupSources(results) : []

  return (
    <div className="p-8 space-y-7 overflow-y-auto h-full">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Similar Case Search</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Semantic search across your uploaded case documents
        </p>
      </div>

      <Card className="p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void search()
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#D4AF37]/50"
              placeholder="Describe case facts, legal issues, or paste a case summary..."
            />
          </div>
          <Btn size="lg" icon={<Brain size={14} />} onClick={() => void search()} disabled={busy}>
            {busy ? 'Searching…' : 'Search AI'}
          </Btn>
        </div>
        <div className="flex gap-2 mt-3">
          {['Contract breach', 'Property dispute', 'Employment termination', 'Patent validity', 'Fundamental rights'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 text-[10px] rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </Card>

      {error && <ErrorAlert message={error} />}
      {busy && (
        <div className="py-6 flex justify-center"><Spinner label="Searching your library…" /></div>
      )}

      {results !== null && !busy && (
        <>
          <div className="text-xs text-muted-foreground">
            {results.length === 0 ? (
              <>No matching passages found — try broader wording or upload more documents.</>
            ) : (
              <>
                Found <span className="font-semibold text-foreground">{passageSummary(results)}</span> · sorted by semantic similarity
              </>
            )}
          </div>

          <div className="space-y-3">
            {groups.map((g, i) => {
              const best = Math.max(...g.passages.map((p) => p.score))
              const strong = best >= 0.8
              return (
                <Card key={g.documentId} className="p-5 hover:border-white/10 transition-all group">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{ backgroundColor: `${strong ? G : B}15`, color: strong ? G : B }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <FileText size={13} style={{ color: G }} />
                            {g.documentTitle}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {g.passages.length} matching passage{g.passages.length === 1 ? '' : 's'}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xl font-bold" style={{ color: strong ? G : B }}>{formatScore(best)}</div>
                          <div className="text-[10px] text-muted-foreground">similarity</div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        {g.passages.map((p) => (
                          <div key={p.chunk_id} className="text-xs text-muted-foreground leading-relaxed rounded-xl border border-white/[0.05] p-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                            <span className="font-semibold mr-1.5" style={{ color: '#34D399' }}>{formatScore(p.score)}</span>
                            {excerpt(p.text)}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/documents/${g.documentId}`)}
                          className="flex items-center gap-1 text-xs"
                          style={{ color: G }}
                        >
                          <ExternalLink size={11} /> View Full Document
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <Disclaimer />
        </>
      )}
    </div>
  )
}
