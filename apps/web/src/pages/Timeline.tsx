import { Filter, Plus, Edit2, ExternalLink } from 'lucide-react'
import { TIMELINE_EVENTS } from '../lib/mock'
import { Btn, Card, Badge, G, B } from '../components/design'
import PreviewBanner from '../components/PreviewBanner'

export default function Timeline() {
  const typeColors: Record<string, string> = {
    hearing: '#A78BFA', filing: B, ruling: '#F97316', deadline: '#F87171', deposition: '#34D399',
  }

  return (
    <div className="p-8 space-y-7 overflow-y-auto h-full">
      <PreviewBanner />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Timeline Intelligence</h1>
          <p className="text-muted-foreground text-sm mt-1">AI-extracted events across all active cases</p>
        </div>
        <div className="flex gap-3">
          <Btn variant="secondary" icon={<Filter size={14} />}>Filter</Btn>
          <Btn icon={<Plus size={14} />}>Add Event</Btn>
        </div>
      </div>

      <div className="flex gap-3">
        {['All', 'Hearings', 'Filings', 'Deadlines', 'Depositions', 'Rulings'].map((f) => (
          <button key={f} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all">
            {f}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.08]" />
        <div className="space-y-2">
          {TIMELINE_EVENTS.map((ev, i) => (
            <div key={i} className="flex gap-5 pl-14 relative group">
              <div className="absolute left-4 top-4 w-4 h-4 rounded-full border-2 border-[#0D1117] flex-shrink-0" style={{ backgroundColor: typeColors[ev.type] || G }} />
              <Card className="flex-1 p-4 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">{ev.event}</span>
                      <Badge label={ev.type} variant={ev.type} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ev.desc}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] font-mono" style={{ color: G }}>{ev.case}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-semibold text-foreground">{ev.date}</div>
                    <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                      <button className="p-1 rounded text-muted-foreground hover:text-foreground"><Edit2 size={11} /></button>
                      <button className="p-1 rounded text-muted-foreground hover:text-foreground"><ExternalLink size={11} /></button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
