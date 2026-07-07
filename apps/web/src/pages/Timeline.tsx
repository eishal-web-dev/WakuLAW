import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CalendarClock, FileText, FolderOpen } from 'lucide-react'
import { listCases, getCaseTimeline, errorMessage } from '../lib/api'
import type { Case, TimelineEvent } from '../lib/api'
import { Card, G } from '../components/design'
import ErrorAlert from '../components/ErrorAlert'
import Spinner from '../components/Spinner'

export default function Timeline() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCaseId = searchParams.get('case')

  const [cases, setCases] = useState<Case[] | null>(null)
  const [casesError, setCasesError] = useState<string | null>(null)

  const [events, setEvents] = useState<TimelineEvent[] | null>(null)
  const [eventsLoading, setEventsLoading] = useState(false)
  const [eventsError, setEventsError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listCases()
      .then((res) => {
        if (!cancelled) setCases(res.items)
      })
      .catch((err) => {
        if (!cancelled) {
          setCases([])
          setCasesError(errorMessage(err))
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!selectedCaseId) {
      setEvents(null)
      setEventsError(null)
      return
    }
    let cancelled = false
    setEventsLoading(true)
    setEventsError(null)
    setEvents(null)
    getCaseTimeline(selectedCaseId)
      .then((res) => {
        if (!cancelled) setEvents(res.events)
      })
      .catch((err) => {
        if (!cancelled) setEventsError(errorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setEventsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [selectedCaseId])

  // Defensive chronological sort — the API sorts already, but the timeline
  // must always read top-to-bottom in date order.
  const sortedEvents = useMemo(
    () =>
      events ? [...events].sort((a, b) => a.date.localeCompare(b.date)) : null,
    [events],
  )

  const selectedCase = cases?.find((c) => String(c.id) === selectedCaseId)

  return (
    <div className="p-8 space-y-7 overflow-y-auto h-full">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Timeline Intelligence</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Dated events extracted from a case's documents, in chronological order
          </p>
        </div>
        {cases && cases.length > 0 && (
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            Case
            <select
              value={selectedCaseId ?? ''}
              onChange={(e) => {
                const id = e.target.value
                setSearchParams(id ? { case: id } : {})
              }}
              className="rounded-xl border border-border bg-muted/40 text-foreground text-sm px-3 py-2 focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="">Select a case…</option>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.case_number} — {c.title}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {casesError && <ErrorAlert message={casesError} />}

      {/* Cases still loading */}
      {cases === null && !casesError && (
        <div className="flex justify-center py-16">
          <Spinner label="Loading cases…" />
        </div>
      )}

      {/* No cases at all */}
      {cases !== null && cases.length === 0 && !casesError && (
        <Card className="p-10 text-center space-y-3">
          <FolderOpen size={28} className="mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            You don't have any cases yet. Create a case and upload documents to build a timeline.
          </p>
          <Link
            to="/cases"
            className="inline-block text-sm font-medium hover:underline"
            style={{ color: G }}
          >
            Go to Cases
          </Link>
        </Card>
      )}

      {/* Cases exist but none selected */}
      {cases !== null && cases.length > 0 && !selectedCaseId && (
        <Card className="p-10 text-center space-y-3">
          <CalendarClock size={28} className="mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Select a case above to view its extracted timeline.
          </p>
        </Card>
      )}

      {selectedCaseId && eventsLoading && (
        <div className="flex justify-center py-16">
          <Spinner label="Loading timeline…" />
        </div>
      )}

      {selectedCaseId && eventsError && <ErrorAlert message={eventsError} />}

      {/* Empty timeline */}
      {selectedCaseId && sortedEvents && sortedEvents.length === 0 && (
        <Card className="p-10 text-center space-y-2">
          <CalendarClock size={28} className="mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No dated events found — upload documents with dates to this case.
          </p>
        </Card>
      )}

      {/* Timeline */}
      {selectedCaseId && sortedEvents && sortedEvents.length > 0 && (
        <div>
          {selectedCase && (
            <div className="mb-4 text-xs text-muted-foreground">
              <span className="font-mono" style={{ color: G }}>
                {selectedCase.case_number}
              </span>{' '}
              · {sortedEvents.length} event{sortedEvents.length === 1 ? '' : 's'}
            </div>
          )}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.08]" />
            <ol className="space-y-2 list-none">
              {sortedEvents.map((ev, i) => (
                <li key={`${ev.document_id}-${ev.date}-${i}`} className="flex gap-5 pl-14 relative group">
                  <div
                    className="absolute left-4 top-4 w-4 h-4 rounded-full border-2 border-[#0D1117] flex-shrink-0"
                    style={{ backgroundColor: G }}
                  />
                  <Card className="flex-1 p-4 hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border"
                            style={{
                              color: G,
                              borderColor: 'rgba(212,175,55,0.25)',
                              backgroundColor: 'rgba(212,175,55,0.08)',
                            }}
                          >
                            {ev.date}
                          </span>
                          {ev.date_text && ev.date_text !== ev.date && (
                            <span className="text-[10px] text-muted-foreground">
                              “{ev.date_text}”
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{ev.text}</p>
                        <Link
                          to={`/documents/${ev.document_id}`}
                          className="inline-flex items-center gap-1.5 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <FileText size={11} style={{ color: G }} />
                          {ev.document_title}
                        </Link>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
