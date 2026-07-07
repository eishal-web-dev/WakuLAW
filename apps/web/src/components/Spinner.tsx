export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div
        className="h-4 w-4 animate-spin rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37]"
        aria-hidden
      />
      {label && <span>{label}</span>}
    </div>
  )
}
