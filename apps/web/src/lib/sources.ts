import type { Source } from './api'

/** Retrieved passages grouped under the document they came from. */
export interface SourceGroup {
  documentId: number
  documentTitle: string
  passages: Source[]
}

/**
 * Group a flat Source[] (one entry per retrieved chunk) by document,
 * preserving the backend's relevance ordering both across groups (a group
 * appears where its best passage first appeared) and within each group.
 */
export function groupSources(sources: Source[]): SourceGroup[] {
  const groups: SourceGroup[] = []
  const byId = new Map<number, SourceGroup>()
  for (const source of sources) {
    let group = byId.get(source.document_id)
    if (!group) {
      group = {
        documentId: source.document_id,
        documentTitle: source.document_title,
        passages: [],
      }
      byId.set(source.document_id, group)
      groups.push(group)
    }
    group.passages.push(source)
  }
  return groups
}

/** e.g. "5 passages from 2 documents", "1 passage from 1 document". */
export function passageSummary(sources: Source[]): string {
  const passages = sources.length
  const documents = new Set(sources.map((s) => s.document_id)).size
  return `${passages} passage${passages === 1 ? '' : 's'} from ${documents} document${documents === 1 ? '' : 's'}`
}
