import { Link } from 'react-router-dom'
import type { SourceGroup } from '../lib/sources'
import { excerpt, formatScore } from '../lib/format'

/**
 * One card per source DOCUMENT: the document title as a linked header, and
 * each retrieved passage from that document as a sub-item with its own
 * excerpt and match score.
 */
export default function SourceGroupCard({ group }: { group: SourceGroup }) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-ink-850">
      {/* Document header */}
      <Link
        to={`/documents/${group.documentId}`}
        className="group flex items-center justify-between gap-3 border-b border-line bg-ink-900 px-4 py-3 transition-colors hover:bg-ink-800"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-sm text-gold"
          >
            ⚖
          </span>
          <span className="truncate text-sm font-semibold text-neutral-100 transition-colors group-hover:text-gold">
            {group.documentTitle}
          </span>
        </span>
        <span className="shrink-0 text-xs text-neutral-500">
          {group.passages.length} passage{group.passages.length === 1 ? '' : 's'}
        </span>
      </Link>

      {/* Passages */}
      <ul className="divide-y divide-line">
        {group.passages.map((passage) => (
          <li key={passage.chunk_id} className="px-4 py-3.5">
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Passage #{passage.chunk_id}
              </span>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
                {formatScore(passage.score)} match
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              {excerpt(passage.text)}
            </p>
          </li>
        ))}
      </ul>
    </article>
  )
}
