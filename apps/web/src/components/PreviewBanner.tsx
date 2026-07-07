import { TriangleAlert } from 'lucide-react'

/** Amber banner shown on screens that render sample data only. */
export default function PreviewBanner({ note }: { note?: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-400">
      <TriangleAlert size={14} className="flex-shrink-0" />
      <span>
        <span className="font-semibold">Preview</span> — sample data, feature under development.
        {note ? ` ${note}` : ''}
      </span>
    </div>
  )
}
