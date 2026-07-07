import {
  AlertCircle, ArrowUpRight, RefreshCw,
} from 'lucide-react'
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart as RBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { RADAR_DATA, WIN_RATE_DATA } from '../lib/mock'
import { Btn, Card, SectionHeader, CustomTooltip, G, B } from '../components/design'
import PreviewBanner from '../components/PreviewBanner'
import Disclaimer from '../components/Disclaimer'

export default function Prediction() {
  return (
    <div className="p-8 space-y-7 overflow-y-auto h-full">
      <PreviewBanner />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Court Prediction</h1>
          <p className="text-muted-foreground text-sm mt-1">Model v4.2 · Trained on 50,247 cases · Last updated March 2, 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs" style={{ borderColor: `${G}30`, backgroundColor: `${G}10`, color: G }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Model Active
          </div>
          <Btn variant="secondary" icon={<RefreshCw size={14} />}>Recalculate</Btn>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main prediction */}
        <Card className="p-8 flex flex-col items-center text-center">
          <div className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">Win Probability</div>
          <div className="relative w-36 h-36 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={G} strokeWidth="8" strokeDasharray={`${82 * 2.51} ${251 - 82 * 2.51}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-extrabold text-foreground">82%</div>
              <div className="text-xs text-muted-foreground">win</div>
            </div>
          </div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 mb-4"><ArrowUpRight size={12} /> +6% since last analysis</div>
          <div className="w-full space-y-2">
            {[['Favorable', '82%', '#34D399'], ['Settlement', '12%', B], ['Unfavorable', '6%', '#F87171']].map(([l, v, c]) => (
              <div key={String(l)} className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{l}</span>
                <span className="font-semibold" style={{ color: String(c) }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Radar chart */}
        <Card className="p-5">
          <div className="text-sm font-semibold text-foreground mb-4">Factor Analysis Radar</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="factor" tick={{ fill: '#B3B3B3', fontSize: 10 }} />
              <Radar name="Score" dataKey="value" stroke={G} fill={G} fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk panel */}
        <Card className="p-5">
          <div className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle size={14} className="text-orange-400" /> Risk Factors
          </div>
          <div className="space-y-3">
            {[
              { risk: 'Judge Wells software patent skepticism', level: 'Medium', color: '#F97316' },
              { risk: 'Narrow 14-day novelty window challenged', level: 'High', color: '#F87171' },
              { risk: 'Defendant expert testimony (Dr. Kovacs)', level: 'Medium', color: '#F97316' },
              { risk: 'Trial delay reducing damages calculation', level: 'Low', color: G },
            ].map((r) => (
              <div key={r.risk} className="p-3 rounded-xl border border-white/[0.05]">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-muted-foreground leading-relaxed">{r.risk}</div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap" style={{ color: r.color, backgroundColor: `${r.color}15` }}>
                    {r.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl border text-xs leading-relaxed" style={{ borderColor: `${G}30`, backgroundColor: `${G}08`, color: '#B3B3B3' }}>
            <div className="font-semibold mb-1" style={{ color: G }}>AI Recommendation</div>
            File Daubert motion to limit Judge Kovacs's scope, and lead with functional novelty to sidestep Alice concerns.
          </div>
        </Card>
      </div>

      {/* Historical accuracy */}
      <Card className="p-5">
        <SectionHeader title="Prediction Accuracy by Case Type (Last 24 Months)" />
        <ResponsiveContainer width="100%" height={200}>
          <RBarChart data={WIN_RATE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="type" tick={{ fill: '#B3B3B3', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#B3B3B3', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="win" name="Win %" fill={G} radius={[4, 4, 0, 0]} />
            <Bar dataKey="loss" name="Loss %" fill="rgba(248,113,113,0.5)" radius={[4, 4, 0, 0]} />
          </RBarChart>
        </ResponsiveContainer>
      </Card>

      <Disclaimer />
    </div>
  )
}
