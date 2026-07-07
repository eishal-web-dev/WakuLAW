import { Briefcase, Award, TrendingUp, DollarSign } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart as RBarChart, Bar, PieChart as RPieChart, Pie, Cell,
} from 'recharts'
import { AREA_DATA, WIN_RATE_DATA, CASE_TYPE_PIE, PIE_COLORS } from '../lib/mock'
import { Card, KPICard, Avatar, ProgressBar, SectionHeader, CustomTooltip, G } from '../components/design'
import PreviewBanner from '../components/PreviewBanner'

export default function Analytics() {
  return (
    <div className="p-8 space-y-7 overflow-y-auto h-full">
      <PreviewBanner />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Performance metrics and case intelligence — YTD 2024</p>
        </div>
        <div className="flex gap-2">
          {['7D', '30D', '90D', 'YTD'].map((r) => (
            <button
              key={r}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${r === 'YTD' ? 'text-[#0D1117]' : 'border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/[0.05]'}`}
              style={r === 'YTD' ? { backgroundColor: G } : {}}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard icon={<Briefcase size={18} />} label="Cases Filed" value="91" change="+18%" changeDir="up" />
        <KPICard icon={<Award size={18} />} label="Cases Won" value="71" change="+12%" changeDir="up" />
        <KPICard icon={<TrendingUp size={18} />} label="Win Rate" value="78.4%" change="+2.1pp" changeDir="up" />
        <KPICard icon={<DollarSign size={18} />} label="Avg. Case Value" value="$847K" change="-4%" changeDir="down" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <SectionHeader title="Case Volume Trend (2024)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={AREA_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="analytics-grad-gold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={G} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={G} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#B3B3B3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#B3B3B3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="filed" name="Filed" stroke={G} strokeWidth={2} fill="url(#analytics-grad-gold)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Win Rate by Case Type" />
          <ResponsiveContainer width="100%" height={220}>
            <RBarChart data={WIN_RATE_DATA} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#B3B3B3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="type" tick={{ fill: '#B3B3B3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="win" name="Win %" fill={G} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5">
          <SectionHeader title="Case Type Distribution" />
          <ResponsiveContainer width="100%" height={160}>
            <RPieChart>
              <Pie data={CASE_TYPE_PIE} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {CASE_TYPE_PIE.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5">
            {CASE_TYPE_PIE.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                <span className="text-muted-foreground truncate">{d.name}</span>
                <span className="text-foreground font-medium ml-auto">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <SectionHeader title="Top Attorneys by Win Rate" />
          <div className="space-y-3">
            {[
              { name: 'James Park', cases: 31, wins: 27, rate: 87, specialty: 'Real Estate' },
              { name: 'Sarah Chen', cases: 44, wins: 36, rate: 82, specialty: 'IP, Employment' },
              { name: 'Lisa Wong', cases: 28, wins: 22, rate: 79, specialty: 'Commercial' },
              { name: 'Michael Torres', cases: 19, wins: 14, rate: 74, specialty: 'Probate' },
              { name: 'David Kim', cases: 23, wins: 15, rate: 65, specialty: 'Securities' },
            ].map((a, i) => (
              <div key={a.name} className="flex items-center gap-4">
                <div className="text-sm font-bold text-muted-foreground w-5 text-center">{i + 1}</div>
                <Avatar name={a.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-medium text-foreground">{a.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{a.specialty}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground">{a.wins}/{a.cases} wins</span>
                      <span className="font-bold" style={{ color: a.rate >= 80 ? '#34D399' : a.rate >= 70 ? G : '#F87171' }}>{a.rate}%</span>
                    </div>
                  </div>
                  <ProgressBar value={a.rate} color={a.rate >= 80 ? '#34D399' : a.rate >= 70 ? G : '#F87171'} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
