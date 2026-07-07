import { AlertCircle } from 'lucide-react'

export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-xs text-red-400"
    >
      <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
      <span className="leading-relaxed">{message}</span>
    </div>
  )
}
