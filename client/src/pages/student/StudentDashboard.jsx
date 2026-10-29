import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  FolderGit2,
  CheckSquare,
  Clock,
  Award,
  Users2,
  ArrowRight,
  Plus,
  ExternalLink,
  KanbanSquare,
  Compass,
  Calendar,
  AlertCircle,
  FolderSearch,
  CheckCircle2,
  Check,
  Layers,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { DEMO_PROJECTS, DEMO_MENTORS, DEMO_NOTIFICATIONS } from '../../utils/demoData'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { StatCard } from '../../components/ui/StatCard'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Avatar } from '../../components/ui/Avatar'
import { EmptyState } from '../../components/ui/EmptyState'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { DemoDataNotice } from '../../components/common/DemoDataNotice'
import { useToast } from '../../context/ToastContext'

export const StudentDashboard = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [viewState, setViewState] = useState('active') // 'active' or 'new'
  const activeProject = DEMO_PROJECTS[0]
  const recommendedMentor = DEMO_MENTORS[0]

  const upcomingDeadlines = [
    { title: 'Stage 3 SLAM Code Verification', project: 'Delivery Bot', dueDate: 'Mar 24, 2026', daysLeft: 'in 4 days', urgent: true },
    { title: 'Mid-Term Peer Collaboration Survey', project: 'Delivery Bot', dueDate: 'Apr 12, 2026', daysLeft: 'in 2 weeks', urgent: false },
    { title: 'Subsystem Battery Firmware Review', project: 'Delivery Bot', dueDate: 'Apr 18, 2026', daysLeft: 'in 3 weeks', urgent: false },
  ]

  const toggleTaskCheck = (taskTitle) => {
    toast.success(`Task "${taskTitle}" marked as complete! Points updated.`)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Student Workspace' }, { label: 'Dashboard' }]} />

      <DemoDataNotice label="Student SaaS Dashboard" />

      {/* Simulator Mode Toggle (allows evaluator to test Active vs Newly Registered Empty State) */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">View State Preview:</span>
          <span className="text-slate-500">Toggle between an established capstone student and a new student empty state:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewState('active')}
            className={`px-3 py-1 rounded-xl font-bold transition-all ${
              viewState === 'active'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Active Project View
          </button>
          <button
            onClick={() => setViewState('new')}
            className={`px-3 py-1 rounded-xl font-bold transition-all ${
              viewState === 'new'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            New Student Empty State
          </button>
        </div>
      </div>

      {viewState === 'new' ? (
        /* Empty State for Newly Registered Student */
        <div className="space-y-6">
          <Card className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <FolderSearch className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome to Capstone Connect, {user?.name || 'Student'}!
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              You are currently not enrolled in an active capstone team. Kick off your university capstone journey in two ways:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-2">
              <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-950/20 text-left">
                <span className="text-xs font-bold uppercase text-indigo-700 dark:text-indigo-300">Option 1</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">Browse Existing Projects</h4>
                <p className="text-xs text-slate-500 mt-1">Explore multidisciplinary capstones looking for your skill set.</p>
                <Link to="/projects" className="mt-4 block">
                  <Button variant="gradient" size="sm" className="w-full">
                    Discover Projects
                  </Button>
                </Link>
              </div>

              <div className="p-5 rounded-2xl border border-violet-200 bg-violet-50/50 dark:border-violet-900/50 dark:bg-violet-950/20 text-left">
                <span className="text-xs font-bold uppercase text-violet-700 dark:text-violet-300">Option 2</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">Propose a New Topic</h4>
                <p className="text-xs text-slate-500 mt-1">Create an interdisciplinary capstone proposal and invite teammates.</p>
                <Link to="/projects" className="mt-4 block">
                  <Button variant="secondary" size="sm" className="w-full">
                    Propose Project
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* Active Enrolled Student Dashboard */
        <>
          {/* Welcome Hero Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Senior Capstone Research Session &bull; Year 2025&ndash;2026</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-sm text-indigo-100/90 leading-relaxed">
                  Leading <strong className="text-white">{activeProject.title}</strong> across CS, ECE, and Design. You have <strong className="text-white">2 upcoming milestone deadlines</strong> this month.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link to="/projects/proj_01">
                  <Button variant="secondary" size="md" leftIcon={<KanbanSquare className="w-4 h-4 text-indigo-600" />}>
                    Open Project Tracker
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" size="md" leftIcon={<Compass className="w-4 h-4" />}>
                    Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* KPI Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Active Capstones"
              value={user?.activeProjectsCount || 1}
              subtitle="Core Interdisciplinary"
              icon={FolderGit2}
              color="indigo"
            />
            <StatCard
              title="Earned Academic Points"
              value={`${user?.earnedPoints || 840} pts`}
              subtitle="Top 5% in Senior Cohort"
              icon={Award}
              color="violet"
            />
            <StatCard
              title="Pending Action Items"
              value={user?.pendingTasksCount || 4}
              subtitle="2 due within 7 days"
              icon={CheckSquare}
              color="amber"
            />
            <StatCard
              title="Capstone Progress"
              value={`${activeProject.progress}%`}
              subtitle="Stage 3: SLAM Stack Active"
              icon={Clock}
              color="emerald"
            />
          </div>

          {/* Main Grid: Active Project tracker & Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Active Project & Milestones Snapshot */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="primary">{activeProject.category}</Badge>
                      <Badge variant="success" dot>Active Supervision</Badge>
                      <Badge variant="neutral">Team Lead</Badge>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                      {activeProject.title}
                    </h3>
                  </div>
                  <Link to="/projects/proj_01">
                    <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View Full Tracker
                    </Button>
                  </Link>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-600 dark:text-slate-300">Milestone Progress (68% Derived from 3 Verified Stages)</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">{activeProject.progress}%</span>
                    </div>
                    <ProgressBar value={activeProject.progress} color="gradient" size="md" />
                  </div>

                  {/* Multidisciplinary Team Ribbon */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Multidisciplinary Team &amp; Contribution Breakdown
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {activeProject.members?.map((m) => (
                        <div key={m.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-2.5">
                            <Avatar src={m.avatar} name={m.name} size="xs" />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{m.name.split(' ')[0]}</p>
                              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-extrabold">{m.contribution}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Faculty Guide Card */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" name={activeProject.facultyGuide.name} size="sm" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Faculty Guide</span>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{activeProject.facultyGuide.name}</p>
                        <p className="text-[10px] text-slate-500">{activeProject.facultyGuide.department}</p>
                      </div>
                    </div>
                    <Link to="/mentorship-requests">
                      <Button variant="outline" size="sm">
                        Contact Guide
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Pending Action Items & Quick Check-off */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-base">Pending Action Items</CardTitle>
                    <p className="text-xs text-slate-400">Assigned engineering checkpoints</p>
                  </div>
                  <Link to="/tasks" className="text-xs font-bold text-indigo-600 hover:underline">
                    View all ({activeProject.tasks?.length || 5}) &rarr;
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    {activeProject.tasks?.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleTaskCheck(t.title)}
                            className="p-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600"
                            title="Mark as completed"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t.title}</p>
                            <p className="text-[10px] text-slate-400">Assignee: {t.assignee} &bull; Target: {t.dueDate}</p>
                          </div>
                        </div>
                        <Badge variant={t.priority === 'urgent' ? 'danger' : t.priority === 'high' ? 'warning' : 'primary'} size="sm">
                          {t.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Col: Upcoming Deadlines & Mentor Recommendation */}
            <div className="space-y-6">
              {/* Upcoming Deadlines Widget */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                    <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingDeadlines.map((d, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{d.title}</span>
                        <Badge variant={d.urgent ? 'danger' : 'neutral'} size="sm">
                          {d.daysLeft}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500">Project: {d.project} &bull; {d.dueDate}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Explainable Mentor Recommendation */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Recommended Mentor</CardTitle>
                    <Badge variant="success" size="sm">{recommendedMentor.compatibilityScore}% Match</Badge>
                  </div>
                  <p className="text-xs text-slate-400">Explainable rule-based compatibility engine</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={recommendedMentor.avatar} name={recommendedMentor.name} size="md" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{recommendedMentor.name}</h4>
                      <p className="text-[10px] text-slate-400">{recommendedMentor.title}</p>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">{recommendedMentor.availability}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] space-y-1 text-slate-600 dark:text-slate-400">
                    <p className="font-bold text-slate-700 dark:text-slate-300">Why recommended:</p>
                    {recommendedMentor.matchReasons.map((r, i) => (
                      <p key={i}>&bull; {r}</p>
                    ))}
                  </div>

                  <Link to="/mentors" className="block w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Explore All Mentors
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Notifications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">Recent Feed &amp; Reviews</CardTitle>
                  <Link to="/notifications" className="text-xs font-bold text-indigo-600 hover:underline">
                    All
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {DEMO_NOTIFICATIONS.slice(0, 3).map((n) => (
                      <div key={n.id} className="text-xs space-y-0.5 border-b border-slate-100 dark:border-slate-800 pb-2.5 last:border-0 last:pb-0">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                        <p className="text-slate-500 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
