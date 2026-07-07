import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, FileText, BookOpen, Sparkles } from 'lucide-react'
import { getCase, listCaseDocuments, errorMessage } from '../lib/api'
import type { Case, DocumentMeta } from '../lib/api'
import { formatBytes, formatDate } from '../lib/format'
import { Btn, Card, Badge, G } from '../components/design'
import UploadZone from '../components/UploadZone'
import ErrorAlert from '../components/ErrorAlert'
import Spinner from '../components/Spinner'

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [docs, setDocs] = useState<DocumentMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!id) return
    try {
      const [c, d] = await Promise.all([getCase(id), listCaseDocuments(id)])
      setCaseData(c)
      setDocs(d.items)
      setError(null)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void refresh()
  }, [refresh])

  if (loading) {
    return (
      <div className="p-8 flex justify-center h-full items-center">
        <Spinner label="Loading case…" />
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="p-8 space-y-4">
        <ErrorAlert message={error ?? 'Case not found.'} />
        <Btn variant="secondary" onClick={() => navigate('/cases')} icon={<ArrowLeft size={14} />}>
          Back to Cases
        </Btn>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full">
      <button
        onClick={() => navigate('/cases')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} /> Back to Cases
      </button>

      {error && <ErrorAlert message={error} />}

      {/* Case header */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono" style={{ color: G }}>{caseData.case_number}</span>
              <Badge label={caseData.status} />
              <Badge label={caseData.priority} />
            </div>
            <h1 className="text-lg font-bold text-foreground">{caseData.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen size={11} /> {caseData.case_type}</span>
              <span className="flex items-center gap-1">
                <Calendar size={11} /> {caseData.deadline ? formatDate(caseData.deadline) : 'No deadline'}
              </span>
              <span className="flex items-center gap-1">
                <FileText size={11} /> {caseData.num_documents} document{caseData.num_documents === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </div>
        {caseData.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-4 pt-4 border-t border-white/[0.06]">
            {caseData.description}
          </p>
        )}
      </Card>

      {/* Meta cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          ['Case Type', caseData.case_type],
          ['Created', formatDate(caseData.created_at)],
          ['Deadline', caseData.deadline ? formatDate(caseData.deadline) : '—'],
        ].map(([l, v]) => (
          <Card key={l} className="p-4">
            <div className="text-xs text-muted-foreground mb-2">{l}</div>
            <div className="text-sm font-semibold text-foreground">{v}</div>
          </Card>
        ))}
      </div>

      {/* Upload into case */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Upload into this case</h3>
        <UploadZone caseId={caseData.id} onUploaded={() => void refresh()} />
      </div>

      {/* Case documents */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">
          Case Documents ({docs.length})
        </h3>
        {docs.length === 0 ? (
          <Card className="p-8 text-center text-sm text-muted-foreground">
            No documents in this case yet — upload one above.
          </Card>
        ) : (
          <div className="space-y-3">
            {docs.map((d) => (
              <Card
                key={d.id}
                className="p-4 hover:border-white/10 transition-all cursor-pointer"
              >
                <button
                  className="flex items-start gap-4 w-full text-left"
                  onClick={() => navigate(`/documents/${d.id}`)}
                >
                  <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: `${G}15` }}>
                    <FileText size={16} style={{ color: G }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{d.title}</div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{d.filename}</span>
                      <span>{formatBytes(d.size_bytes)}</span>
                      <span>{formatDate(d.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge label={`${d.num_chunks} chunks`} />
                    {d.has_summary && (
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: G }}>
                        <Sparkles size={10} /> Summary
                      </span>
                    )}
                  </div>
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
