import React from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  Users2,
  FileCheck2,
  Clock,
  GitPullRequest,
  CheckCircle2,
  KanbanSquare,
  ArrowRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { DEMO_PROJECTS, DEMO_USERS } from '../../utils/demoData'
import { StatCard } from '../../components/ui/StatCard'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Avatar } from '../../components/ui/Avatar'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { DemoDataNotice } from '../../components/common/DemoDataNotice'

export const FacultyDashboard = () => {
  const { user } = useAuth()
  const assignedProjects = DEMO_PROJECTS.slice(0, 2)

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Faculty Portal' }, { label: 'Dashboard' }]} />
      <DemoDataNotice label="Faculty Supervision Console" />

      {/* Faculty Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-violet-200 text-xs font-semibold backdrop-blur-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Faculty Supervision &amp; Mentorship Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {user?.name || 'Dr. Elena Rostova'}!
          </h1>
          <p className="text-sm text-violet-100/90 leading-relaxed">
            You are currently supervising <strong className="text-white">3 active capstone teams</strong>. You have 3 milestone submissions and 2 mentorship inquiries pending review.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Supervised Teams"
          value="3"
          subtitle="Capacity: 3 / 5 teams"
          icon={Users2}
          color="violet"
        />
        <StatCard
          title="Pending Submissions"
          value="3"
          subtitle="Milestones awaiting review"
          icon={FileCheck2}
          color="indigo"
        />
        <StatCard
          title="Mentorship Requests"
          value="2"
          subtitle="New student team inquiries"
          icon={GitPullRequest}
          color="amber"
        />
        <StatCard
          title="Average Team Progress"
          value="62%"
          subtitle="On schedule for Spring defense"
          icon={Clock}
          color="emerald"
        />
      </div>

      {/* Supervised Teams Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <CardTitle>Supervised Capstone Projects</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">Track multi-department team milestones</p>
              </div>
              <Link to="/faculty/assigned-projects">
                <Button variant="outline" size="sm">
                  View All Teams
                </Button>
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {assignedProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="primary" size="sm">{p.category}</Badge>
                        <Badge variant="success" size="sm" dot>Active</Badge>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{p.title}</h4>
                      <p className="text-xs text-slate-500">Lead: {p.owner.name} &bull; {p.members?.length || 4} Multidisciplinary Members</p>
                    </div>

                    <Link to={`/projects/${p.id}`}>
                      <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Open Tracker
                      </Button>
                    </Link>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Milestone Progress</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">{p.progress}%</span>
                    </div>
                    <ProgressBar value={p.progress} size="sm" color="gradient" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right col: Pending Submissions review queue */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Pending Reviews</CardTitle>
              <Badge variant="warning" size="sm">3 Waiting</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/40 dark:border-amber-900/60 dark:bg-amber-950/20 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">Milestone Stage 3</span>
                <p className="font-bold text-slate-800 dark:text-slate-200">Autonomous Delivery Bot</p>
                <p className="text-slate-500 text-[11px]">Submitted by Marcus Patel &bull; LiDAR SLAM Benchmark</p>
                <div className="pt-2">
                  <Link to="/faculty/submissions">
                    <Button variant="gradient" size="sm" className="w-full text-xs">
                      Evaluate &amp; Grade
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Milestone Stage 2</span>
                <p className="font-bold text-slate-800 dark:text-slate-200">Smart Microgrid Optimization</p>
                <p className="text-slate-500 text-[11px]">Submitted by Jordan Lee &bull; Campus Sensor Deployment</p>
                <div className="pt-2">
                  <Link to="/faculty/submissions">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Evaluate &amp; Grade
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
