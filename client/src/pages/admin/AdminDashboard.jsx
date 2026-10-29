import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldAlert,
  Users2,
  FolderGit2,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Sparkles,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { StatCard } from '../../components/ui/StatCard'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { DemoDataNotice } from '../../components/common/DemoDataNotice'

export const AdminDashboard = () => {
  const departmentData = [
    { name: 'Computer Science', students: 540, projects: 32 },
    { name: 'Electrical & ECE', students: 380, projects: 24 },
    { name: 'Mechanical & Rob', students: 260, projects: 16 },
    { name: 'Data Science & AI', students: 240, projects: 14 },
  ]

  const domainData = [
    { name: 'Robotics & AI', value: 35, color: '#4f46e5' },
    { name: 'CleanTech & IoT', value: 25, color: '#06b6d4' },
    { name: 'Healthcare & BME', value: 22, color: '#8b5cf6' },
    { name: 'Cybersecurity', value: 18, color: '#10b981' },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Administration' }, { label: 'Operations Console' }]} />
      <DemoDataNotice label="Accreditation & Operations Analytics (Demonstration Data)" />

      {/* Admin Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Institutional Governance &amp; Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Academic Operations Console
          </h1>
          <p className="text-sm text-indigo-100/90 leading-relaxed">
            University-wide capstone monitoring, cross-disciplinary analytics, guide assignments, and compliance moderation.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enrolled Users"
          value="1,420"
          subtitle="1,180 Students • 240 Faculty"
          icon={Users2}
          color="indigo"
        />
        <StatCard
          title="Active Projects"
          value="86"
          subtitle="14 Multidisciplinary clusters"
          icon={FolderGit2}
          color="violet"
        />
        <StatCard
          title="Pending Approvals"
          value="7"
          subtitle="Proposals awaiting clearance"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Avg Milestone Velocity"
          value="94.2%"
          subtitle="On track for defense"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle>Departmental Participation Distribution</CardTitle>
            <p className="text-xs text-slate-400">Total enrolled students and capstone teams per department</p>
          </CardHeader>
          <CardContent className="h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="students" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Students" />
                <Bar dataKey="projects" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Teams" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle>Capstone Domain Breakdown (%)</CardTitle>
            <p className="text-xs text-slate-400">Interdisciplinary research categorization</p>
          </CardHeader>
          <CardContent className="h-64 pt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-xs">
              {domainData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{d.name} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Moderation Shortcuts */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <CardTitle>Governance &amp; Administrative Actions</CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Quick access to university moderation tools</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/admin/users" className="block">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">User Directory &amp; Roles</h4>
              <p className="text-xs text-slate-400 mt-1">Manage 1,420 students and faculty accounts</p>
            </div>
          </Link>

          <Link to="/admin/projects" className="block">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Project Approvals Queue</h4>
              <p className="text-xs text-slate-400 mt-1">Review 7 pending multidisciplinary proposals</p>
            </div>
          </Link>

          <Link to="/admin/analytics" className="block">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Accreditation Analytics</h4>
              <p className="text-xs text-slate-400 mt-1">Generate ABET &amp; university compliance records</p>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  )
}
