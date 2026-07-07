import { useState } from 'react'
import type { FormEvent } from 'react'
import { findSimilarCases, errorMessage } from '../lib/api'
import type { Source } from '../lib/api'
import PageHeader from '../components/PageHeader'
import Spinner from '../components/Spinner'
import ErrorAlert from '../components/ErrorAlert'
import EmptyState from '../components/EmptyState'
import SourceGroupCard from '../components/SourceGroupCard'
import { groupSources, passageSummary } from '../lib/sources'

export default function Similar() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Source[] | null>(null)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed || loading) return
    setLoading(true)
    setError(null)
    setResults(null)
    findSimilarCases(trimmed)
      .then((res) => setResults(res.results))
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <PageHeader
        title="Similar Cases"
        subtitle="Describe a case or legal situation to find the most similar passages across your documents."
      />

      {/* Search form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="similar-query" className="sr-only">
          Search query
        </label>
        <input
          id="similar-query"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. bail granted in a narcotics case involving a first-time offender"
          className="flex-1 rounded-xl border border-line bg-ink-900 px-5 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-gold/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || query.trim().length === 0}
          className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {loading && (
          <div className="rounded-card border border-line bg-ink-900 p-6">
            <Spinner label="Searching for similar cases…" />
          </div>
        )}

        {error && <ErrorAlert message={error} />}

        {results && results.length === 0 && (
          <EmptyState
            icon="≈"
            title="No similar cases found"
            description="Try rephrasing your query, or upload more documents to search across."
          />
        )}

        {results && results.length > 0 && (
          <>
            <h2 className="text-base font-semibold text-neutral-100">
              Results —{' '}
              <span className="font-normal text-neutral-400">
                {passageSummary(results)}
              </span>
            </h2>
            <p className="text-xs text-neutral-600">
              Ordered by similarity within each document.
            </p>
            {groupSources(results).map((group) => (
              <SourceGroupCard key={group.documentId} group={group} />
            ))}
          </>
        )}

        {!loading && !error && results === null && (
          <EmptyState
            icon="≈"
            title="Search your case library"
            description="Results show the matching paragraph, its document, and a similarity score so you can judge relevance yourself."
          />
        )}
      </div>
    </div>
  )
}
