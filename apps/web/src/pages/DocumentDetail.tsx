import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, FileText, Sparkles, Scale, ListChecks, Target } from 'lucide-react'
import { getDocument, summarizeDocument, errorMessage } from '../lib/api'
import type { Document } from '../lib/api'
import { formatBytes, formatDate } from '../lib/format'
import { Btn, Card, Badge, G } from '../components/design'
import ErrorAlert from '../components/ErrorAlert'
import Spinner from '../components/Spinner'
import Disclaimer from '../components/Disclaimer'

export default function DocumentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [doc, setDoc] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summarizing, setSummarizing] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    getDocument(id)
      .then((d) => {
        if (!cancelled) setDoc(d)
      })
      .catch((err) => {
        if (!cancelled) setError(errorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  const generateSummary = async () => {
    if (!id || !doc) return
    setSummarizing(true)
    setError(null)
    try {
      const res = await summarizeDocument(id)
      setDoc({ ...doc, summary: res.summary, has_summary: true })
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setSummarizing(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center h-full items-center">
        <Spinner label="Loading document…" />
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="p-8 space-y-4">
        <ErrorAlert message={error ?? 'Document not found.'} />
        <Btn variant="secondary" onClick={() => navigate('/documents')} icon={<ArrowLeft size={14} />}>
          Back to Documents
        </Btn>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {error && <ErrorAlert message={error} />}

      {/* Header */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-500/10">
            <FileText size={22} className="text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground truncate">{doc.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span>{doc.filename}</span>
              <span>{formatBytes(doc.size_bytes)}</span>
              <span>{formatDate(doc.created_at)}</span>
              <Badge label={`${doc.num_chunks} chunks`} />
            </div>
          </div>
          <Btn onClick={generateSummary} disabled={summarizing} icon={<Sparkles size={14} />}>
            {summarizing ? 'Summarizing…' : doc.summary ? 'Regenerate Summary' : 'Generate Summary'}
          </Btn>
        </div>
      </Card>

      {/* AI Summary */}
      {doc.summary && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} style={{ color: G }} />
            <span className="text-sm font-semibold text-foreground">AI Summary</span>
          </div>
          <Card className="p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">{doc.summary.short_summary}</p>
          </Card>
          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target size={14} style={{ color: G }} />
                <h4 className="text-sm font-semibold text-foreground">Main Issue</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{doc.summary.main_issue}</p>
              <div className="flex items-center gap-2 mt-5 mb-3">
                <Scale size={14} style={{ color: G }} />
                <h4 className="text-sm font-semibold text-foreground">Outcome</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{doc.summary.outcome}</p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks size={14} style={{ color: G }} />
                <h4 className="text-sm font-semibold text-foreground">Key Facts</h4>
              </div>
              <div className="space-y-2">
                {doc.summary.key_facts.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#34D399' }} />
                    {f}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-5 mb-3">
                <Scale size={14} style={{ color: G }} />
                <h4 className="text-sm font-semibold text-foreground">Legal Points</h4>
              </div>
              <div className="space-y-2">
                {doc.summary.legal_points.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: G }} />
                    {p}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Disclaimer />
        </div>
      )}

      {/* Extracted text */}
      <Card className="p-5">
        <h4 className="text-sm font-semibold text-foreground mb-3">Extracted Text</h4>
        <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans max-h-[480px] overflow-y-auto">
          {doc.text || 'No text extracted.'}
        </pre>
      </Card>
    </div>
  )
}
