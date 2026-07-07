import {
  Briefcase, Brain, Search, DollarSign, AlertCircle, TrendingUp,
  FileText, Eye, Download,
} from 'lucide-react'
import { Btn, Card, Badge, SectionHeader, G } from '../components/design'
import PreviewBanner from '../components/PreviewBanner'

export default function Reports() {
  const templates = [
    { name: 'Case Status Report', desc: 'Comprehensive status summary across all active cases', icon: <Briefcase size={18} />, time: '~2 min' },
    { name: 'AI Prediction Summary', desc: 'Win probability trends and model insights', icon: <Brain size={18} />, time: '~1 min' },
    { name: 'Evidence Audit Report', desc: 'Complete evidence inventory with confidence scores', icon: <Search size={18} />, time: '~3 min' },
    { name: 'Billing & Time Report', desc: 'Attorney hours, billing codes, and fee summaries', icon: <DollarSign size={18} />, time: '~2 min' },
    { name: 'Deadline Risk Report', desc: 'Upcoming deadlines with risk classification', icon: <AlertCircle size={18} />, time: '~1 min' },
    { name: 'Portfolio Analytics', desc: 'Win rate, case types, and performance benchmarking', icon: <TrendingUp size={18} />, time: '~4 min' },
  ]
  const recent = [
    { name: 'Case Status Report — February 2024', date: 'Mar 1, 2024', size: '2.4 MB', status: 'Ready' },
    { name: 'AI Prediction Summary — Q4 2023', date: 'Jan 3, 2024', size: '1.1 MB', status: 'Ready' },
    { name: 'Evidence Audit — WL-2024-003', date: 'Feb 28, 2024', size: '3.7 MB', status: 'Ready' },
  ]

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full">
      <PreviewBanner />
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground text-sm mt-1">Generate AI-powered legal reports and analysis documents</p>
      </div>

      <div>
        <SectionHeader title="Report Templates" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <Card key={t.name} className="p-5 hover:border-white/10 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${G}15`, color: G }}>{t.icon}</div>
                <span className="text-[10px] text-muted-foreground border border-white/10 px-2 py-0.5 rounded-md">{t.time}</span>
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">{t.name}</div>
              <div className="text-xs text-muted-foreground mb-4 leading-relaxed">{t.desc}</div>
              <Btn variant="secondary" size="sm" className="w-full justify-center group-hover:border-white/20">Generate Report</Btn>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Recent Reports" action={<Btn variant="ghost" size="sm">View all</Btn>} />
        <Card className="overflow-hidden">
          {recent.map((r, i) => (
            <div key={r.name} className={`flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors cursor-pointer ${i < recent.length - 1 ? 'border-b border-white/[0.05]' : ''}`}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}>
                <FileText size={16} className="text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.date} · {r.size}</div>
              </div>
              <Badge label={r.status} variant="Active" />
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-colors"><Eye size={14} /></button>
                <button className="p-2 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-colors"><Download size={14} /></button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
