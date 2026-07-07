import { Plus, Users, Briefcase, Brain, FileText, Search, Filter, Edit2, Trash2 } from 'lucide-react'
import { Btn, Card, Badge, KPICard, Avatar, Input, SectionHeader, G } from '../components/design'
import PreviewBanner from '../components/PreviewBanner'

export default function Admin() {
  const admins = [
    { name: 'Sarah Chen', email: 'sarah.chen@weissblake.com', role: 'Senior Partner', cases: 44, status: 'Active', joined: 'Mar 2019' },
    { name: 'Michael Torres', email: 'm.torres@weissblake.com', role: 'Partner', cases: 19, status: 'Active', joined: 'Jun 2020' },
    { name: 'James Park', email: 'j.park@weissblake.com', role: 'Associate', cases: 31, status: 'Active', joined: 'Jan 2021' },
    { name: 'Lisa Wong', email: 'l.wong@weissblake.com', role: 'Senior Associate', cases: 28, status: 'Active', joined: 'Sep 2020' },
    { name: 'David Kim', email: 'd.kim@weissblake.com', role: 'Associate', cases: 23, status: 'Inactive', joined: 'Apr 2022' },
  ]

  return (
    <div className="p-8 space-y-7 overflow-y-auto h-full">
      <PreviewBanner />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Weiss & Blake LLP · WakuLaw Enterprise</p>
        </div>
        <Btn icon={<Plus size={14} />}>Invite User</Btn>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard icon={<Users size={18} />} label="Total Users" value="12" change="+2 this month" changeDir="up" />
        <KPICard icon={<Briefcase size={18} />} label="Total Cases" value="247" change="+23 this month" changeDir="up" />
        <KPICard icon={<Brain size={18} />} label="AI Queries / Mo." value="4,891" change="+18%" changeDir="up" />
        <KPICard icon={<FileText size={18} />} label="Storage Used" value="47.2 GB" sub="of 500 GB plan" />
      </div>

      {/* System health */}
      <Card className="p-5">
        <SectionHeader title="System Health" />
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'API Uptime', value: '99.97%', color: '#34D399' },
            { label: 'AI Model', value: 'Operational', color: '#34D399' },
            { label: 'DB Latency', value: '12ms', color: G },
            { label: 'Incidents (30d)', value: '0', color: '#34D399' },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-white/[0.05] text-center">
              <div className="text-lg font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Users table */}
      <Card className="overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Users</h3>
          <div className="flex gap-2">
            <Input placeholder="Search users..." icon={<Search size={13} />} className="w-48" />
            <Btn variant="secondary" size="sm" icon={<Filter size={12} />}>Filter</Btn>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['User', 'Role', 'Cases', 'Status', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((u, i) => (
                <tr key={u.email} className={`hover:bg-white/[0.02] transition-colors ${i < admins.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <div className="text-sm font-medium text-foreground">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">{u.role}</td>
                  <td className="px-5 py-4 text-xs text-foreground font-medium">{u.cases}</td>
                  <td className="px-5 py-4"><Badge label={u.status} variant={u.status === 'Active' ? 'Active' : 'Closed'} /></td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">{u.joined}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/[0.08] text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
