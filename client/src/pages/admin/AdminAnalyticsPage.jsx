import React from 'react'
import { BarChart3, TrendingUp, Users, Award, Download } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { useToast } from '../../context/ToastContext'

export const AdminAnalyticsPage = () => {
  const { toast } = useToast()

  const velocityData = [
    { month: 'Oct', milestones: 14, approvals: 12 },
    { month: 'Nov', milestones: 28, approvals: 25 },
    { month: 'Dec', milestones: 42, approvals: 40 },
    { month: 'Jan', milestones: 68, approvals: 62 },
    { month: 'Feb', milestones: 95, approvals: 90 },
    { month: 'Mar', milestones: 130, approvals: 124 },
  ]

  const handleExport = () => {
    toast.success('Accreditation report (PDF/CSV) generated for Academic Senate.')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional Capstone Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official reporting for ABET engineering accreditation, milestone progress, and interdisciplinary participation.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport} leftIcon={<Download className="w-4 h-4" />}>
          Export Compliance Dossier
        </Button>
      </div>

      <Card className="p-6">
        <CardHeader className="pb-2">
          <CardTitle>Milestone Submission &amp; Faculty Approval Velocity</CardTitle>
          <p className="text-xs text-slate-400">Cumulative verified deliverables across semester checkpoints</p>
        </CardHeader>
        <CardContent className="h-72 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={velocityData}>
              <defs>
                <linearGradient id="colorMilestones" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorApprovals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
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
              <Area type="monotone" dataKey="milestones" stroke="#4f46e5" fillOpacity={1} fill="url(#colorMilestones)" name="Deliverables" />
              <Area type="monotone" dataKey="approvals" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorApprovals)" name="Faculty Approvals" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
