import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  KanbanSquare,
  Layers,
  Users2,
  FileText,
  Clock,
  ClipboardList,
  History,
  CheckCircle2,
  Clock3,
  Calendar,
  Award,
  Plus,
  Send,
  UploadCloud,
  ChevronRight,
  ExternalLink,
  Shield,
  MessageSquare,
  AlertCircle,
  FileCheck2,
  UserPlus,
  Copy,
  Download,
  Share2,
  Check,
  Info,
  GitBranch,
  Terminal,
  Cpu,
  Bookmark,
  Trash2,
} from 'lucide-react'
import { DEMO_PROJECTS, DEMO_SURVEYS } from '../../utils/demoData'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Tabs } from '../../components/ui/Tabs'
import { Avatar } from '../../components/ui/Avatar'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { DemoDataNotice } from '../../components/common/DemoDataNotice'
import { useToast } from '../../context/ToastContext'
import { cn } from '../../utils/cn'

export const ProjectTrackerWorkspace = () => {
  const { id } = useParams()
  const { toast } = useToast()

  // Match demo project or default to proj_01 (Autonomous Campus Delivery Bot)
  const project = DEMO_PROJECTS.find((p) => p.id === id) || DEMO_PROJECTS[0]

  const [activeTab, setActiveTab] = useState('overview')
  const [tasks, setTasks] = useState(project.tasks || [])
  const [stages, setStages] = useState(project.stages || [])
  const [copiedTitle, setCopiedTitle] = useState(false)
  const [selectedStageIndex, setSelectedStageIndex] = useState(2) // Stage 3 active by default

  // Deliverables Submissions dynamic state
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub_01',
      title: 'v2.1 - LiDAR SLAM Calibration & Gazebo World Files',
      author: 'Marcus Patel',
      date: 'Mar 15, 2026',
      type: 'PDF + GitHub Link',
      link: 'https://github.com/capstone-deliveries/rover-nav-stack',
      status: 'Reviewed',
      score: '92/100',
      notes: 'Strong pointcloud resolution and ROS 2 tf tree integration. Simulated sensor noise within acceptable thresholds.',
      stageNumber: 3,
    },
    {
      id: 'sub_02',
      title: 'v1.0 - Full Capstone Project Proposal & Safety Dossier',
      author: 'Alex Rivera',
      date: 'Feb 08, 2026',
      type: 'Formal Academic Report',
      link: 'https://overleaf.com/read/capstone-proposal',
      status: 'Approved',
      score: '98/100',
      notes: 'Clear methodology, interdisciplinary team workload breakdown, and safety stop fail-safe architecture approved.',
      stageNumber: 1,
    },
  ])

  // Team members dynamic state
  const [teamMembers, setTeamMembers] = useState(project.members || [])

  // Activity log dynamic state
  const [activities, setActivities] = useState([
    {
      id: 'act_01',
      text: 'Faculty Guide Dr. Elena Rostova approved Milestone 2 (Hardware Architecture)',
      timestamp: 'Feb 28, 2026 at 14:22',
      color: 'emerald',
    },
    {
      id: 'act_02',
      text: 'Alex Rivera updated task "TEB local planner in Nav2 ROS" to In-Progress',
      timestamp: 'Mar 10, 2026 at 10:15',
      color: 'indigo',
    },
    {
      id: 'act_03',
      text: 'Marcus Patel submitted SLAM PointCloud & Trajectory Benchmarking Report',
      timestamp: 'Mar 15, 2026 at 18:40',
      color: 'violet',
    },
  ])

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isRubricModalOpen, setIsRubricModalOpen] = useState(false)
  const [isContactGuideModalOpen, setIsContactGuideModalOpen] = useState(false)
  const [activeRubricStage, setActiveRubricStage] = useState(null)
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  // Contact guide form state
  const [contactSubject, setContactSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [consultationType, setConsultationType] = useState('Office Hours Meeting')

  // New task form state
  const [newTask, setNewTask] = useState({
    title: '',
    assignee: 'Alex Rivera',
    priority: 'medium',
    status: 'todo',
    dueDate: '2026-04-10',
  })

  // Submission form state
  const [submission, setSubmission] = useState({
    milestoneId: 'stage_3',
    title: 'SLAM PointCloud & Trajectory Benchmarking Report v2',
    link: 'https://github.com/capstone-deliveries/rover-nav-stack',
    notes: 'Includes Gazebo simulated outdoor trials and real sensor log playback at 30Hz.',
  })

  // Invite member form state
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Embedded Firmware Engineer')

  const handleCopyAcademicTitle = () => {
    navigator.clipboard.writeText(project.officialAcademicTitle)
    setCopiedTitle(true)
    toast.success('Official academic title copied to clipboard')
    setTimeout(() => setCopiedTitle(false), 2500)
  }

  const handleExportDossier = () => {
    toast.success('Official Capstone Accreditation Dossier (PDF/JSON) generated and downloaded.')
  }

  const handleCreateTask = (e) => {
    e.preventDefault()
    if (!newTask.title) {
      toast.error('Please enter a task title')
      return
    }
    const created = {
      id: 'task_' + Date.now(),
      ...newTask,
    }
    setTasks([created, ...tasks])
    setActivities([
      {
        id: 'act_' + Date.now(),
        text: `New task added: "${newTask.title}" assigned to ${newTask.assignee}`,
        timestamp: 'Just now',
        color: 'indigo',
      },
      ...activities,
    ])
    setIsTaskModalOpen(false)
    setNewTask({ title: '', assignee: 'Alex Rivera', priority: 'medium', status: 'todo', dueDate: '2026-04-10' })
    toast.success('Task created successfully and assigned to team member')
  }

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    const target = tasks.find((t) => t.id === taskId)
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)))
    setActivities([
      {
        id: 'act_' + Date.now(),
        text: `Task "${target?.title || 'Deliverable'}" moved to ${newStatus.toUpperCase()}`,
        timestamp: 'Just now',
        color: newStatus === 'completed' ? 'emerald' : 'indigo',
      },
      ...activities,
    ])
    toast.info(`Task status updated to ${newStatus}`)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
    toast.info('Task removed from board.')
  }

  const handleSubmitDeliverable = (e) => {
    e.preventDefault()
    const targetStage = stages.find((s) => s.id === submission.milestoneId) || stages[2]
    const newSub = {
      id: 'sub_' + Date.now(),
      title: submission.title,
      author: 'Alex Rivera (CS Lead)',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'Repository & Engineering Evidence',
      link: submission.link,
      status: 'Under Review',
      score: 'Pending Faculty Review',
      notes: submission.notes || 'Evidence submitted for faculty evaluation.',
      stageNumber: targetStage.number,
    }

    setSubmissions([newSub, ...submissions])
    setActivities([
      {
        id: 'act_' + Date.now(),
        text: `Alex Rivera submitted milestone deliverable "${submission.title}" for Stage ${targetStage.number}`,
        timestamp: 'Just now',
        color: 'violet',
      },
      ...activities,
    ])

    toast.success(`Deliverable submitted to ${project.facultyGuide.name} for Stage ${targetStage.number} evaluation!`)
    setIsSubmitModalOpen(false)
  }

  const handleSendInvite = (e) => {
    e.preventDefault()
    if (!inviteEmail) {
      toast.error('Please enter an institutional email address')
      return
    }

    const invited = {
      id: 'inv_' + Date.now(),
      name: inviteEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      role: inviteRole,
      department: 'Invited Candidate',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      contribution: 0,
      isPending: true,
    }

    setTeamMembers([...teamMembers, invited])
    setActivities([
      {
        id: 'act_' + Date.now(),
        text: `Team invitation dispatched to ${inviteEmail} for ${inviteRole}`,
        timestamp: 'Just now',
        color: 'amber',
      },
      ...activities,
    ])

    toast.success(`Team invitation sent to ${inviteEmail} for the role of ${inviteRole}`)
    setIsInviteModalOpen(false)
    setInviteEmail('')
  }

  const handleContactGuide = (e) => {
    e.preventDefault()
    if (!contactMessage.trim()) {
      toast.error('Please enter your consultation message')
      return
    }
    toast.success(`Consultation request transmitted to ${project.facultyGuide.name}! A calendar invite and notification have been sent.`)
    setIsContactGuideModalOpen(false)
    setContactSubject('')
    setContactMessage('')
  }

  const handleOpenRubric = (stage) => {
    setActiveRubricStage(stage)
    setIsRubricModalOpen(true)
  }

  const tabsList = [
    { id: 'overview', label: 'Overview & Tracker', icon: KanbanSquare },
    { id: 'milestones', label: 'Stages & Milestones', icon: Layers, badge: `${stages.length}` },
    { id: 'taskboard', label: 'Task Board', icon: FileCheck2, badge: `${tasks.length}` },
    { id: 'timeline', label: 'Timeline & Gantt', icon: Clock },
    { id: 'team', label: 'Team & Contributions', icon: Users2, badge: `${teamMembers.length}` },
    { id: 'submissions', label: 'Documents & Submissions', icon: FileText, badge: `${submissions.length}` },
    { id: 'surveys', label: 'Surveys & Feedback', icon: ClipboardList, badge: '1' },
    { id: 'activity', label: 'Activity History', icon: History, badge: `${activities.length}` },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Projects', to: '/projects' },
          { label: project.category, to: '/projects' },
          { label: project.title },
        ]}
      />

      {/* Development Sample Data Notice */}
      <DemoDataNotice label="Capstone Tracker Reference Mode" />

      {/* Main Project Header Card - Meticulously Styled Hierarchy */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-3 flex-1">
            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="md">
                {project.category}
              </Badge>
              <Badge variant="success" size="md" dot>
                Status: In Progress
              </Badge>
              <Badge variant="violet" size="md">
                {project.domain}
              </Badge>
              <Badge variant="neutral" size="md">
                Team Owner: {project.owner.name}
              </Badge>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 ml-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.startDate} &mdash; {project.deadline}
              </span>
            </div>

            {/* Primary Project Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h1>

            {/* Official Academic Title Box */}
            <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Official Academic Title
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {project.officialAcademicTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyAcademicTitle}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold shrink-0 transition-colors"
                title="Copy Official Title"
              >
                {copiedTitle ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTitle ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Cluster & Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            <div className="flex items-center gap-3">
              {/* Earned Points Box */}
              <div className="rounded-2xl bg-indigo-50/80 p-3.5 border border-indigo-100 text-center dark:bg-indigo-950/40 dark:border-indigo-900/60 min-w-28 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  Earned Points
                </span>
                <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
                  {project.earnedPoints} <span className="text-xs font-semibold">pts</span>
                </p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+120 Stage 2 Bonus</span>
              </div>

              {/* Progress Box */}
              <div className="rounded-2xl bg-violet-50/80 p-3.5 border border-violet-100 text-center dark:bg-violet-950/40 dark:border-violet-900/60 min-w-28 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 block">
                  Completion
                </span>
                <p className="text-2xl font-black text-violet-700 dark:text-violet-300">
                  {project.progress}%
                </p>
                <span className="text-[10px] text-violet-600 dark:text-violet-400 font-semibold">Stage 3 of 6</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="gradient"
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={() => setIsSubmitModalOpen(true)}
                leftIcon={<UploadCloud className="w-4 h-4" />}
              >
                Submit Deliverable
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportDossier}
                title="Export Capstone Dossier"
                leftIcon={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Faculty Guide Bar & Progress Formula */}
        <div className="pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>Weighted Progress Model</span>
                <span className="text-[10px] text-slate-400 font-normal">(68% calculated from 3 verified stages)</span>
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{project.progress}% completed</span>
            </div>
            <ProgressBar value={project.progress} color="gradient" size="md" />
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <Avatar src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" name={project.facultyGuide.name} size="sm" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Assigned Faculty Guide</span>
              <strong className="text-slate-800 dark:text-slate-200">{project.facultyGuide.name}</strong>
              <span className="text-slate-400 ml-1">({project.facultyGuide.department})</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-2 h-7 text-xs px-2.5"
              onClick={() => {
                setContactSubject(`Milestone Inquiry: ${project.title}`)
                setIsContactGuideModalOpen(true)
              }}
              leftIcon={<MessageSquare className="w-3 h-3" />}
            >
              Contact
            </Button>
          </div>
        </div>

        {/* Visual Stage Stepper across top */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tracker Stages Pipeline (Click stage to inspect rubric)
            </span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
              Current Active: Stage 3 (SLAM & Perception Stack)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {stages.map((st, idx) => {
              const isDone = st.status === 'completed'
              const isInProg = st.status === 'in-progress'
              const isSurvey = st.status === 'pending-survey'
              const isSelected = selectedStageIndex === idx

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    setSelectedStageIndex(idx)
                    handleOpenRubric(st)
                  }}
                  className={cn(
                    'flex flex-col text-left p-2.5 rounded-xl border transition-all duration-150',
                    isDone && 'border-emerald-200 bg-emerald-50/40 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-200 hover:bg-emerald-100/50',
                    isInProg && 'border-indigo-400 bg-indigo-50/70 text-indigo-950 dark:border-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-200 ring-2 ring-indigo-500/20 shadow-xs',
                    isSurvey && 'border-violet-300 bg-violet-50/50 text-violet-950 dark:border-violet-900/60 dark:bg-violet-950/20 dark:text-violet-200 hover:bg-violet-100/50',
                    st.status === 'upcoming' && 'border-slate-200/70 bg-slate-50/50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 hover:bg-slate-100/60'
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-bold uppercase">Stage {st.number}</span>
                    <span className="text-[10px] font-bold">
                      {isDone ? '✓' : `${st.weight}%`}
                    </span>
                  </div>
                  <p className="text-xs font-bold truncate">{st.title}</p>
                  <span className="text-[10px] opacity-75 mt-0.5 capitalize">{st.status.replace('-', ' ')}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs tabs={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Overview & Tracker */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              {/* Problem statement & Technical Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle>Problem Statement & Research Objectives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>{project.description}</p>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Academic Motivation &amp; Problem Statement
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{project.problemStatement}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
                      Key Technical Objectives &amp; Milestones
                    </h4>
                    <ul className="space-y-2">
                      {project.objectives?.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Stages Snapshot Card with Weighted Calculation Explainer */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle>Tracker Stages &amp; Weighted Completion Model</CardTitle>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Progress = Σ (Stage Weight × Completion Ratio) &bull; Current Total: 68%
                    </p>
                  </div>
                  <Badge variant="primary">Stage 3 Active</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stages.map((stage) => {
                      const isDone = stage.status === 'completed'
                      const isInProg = stage.status === 'in-progress'
                      const isPendingSurvey = stage.status === 'pending-survey'
                      return (
                        <div
                          key={stage.id}
                          className={cn(
                            'flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all gap-3',
                            isDone && 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/10',
                            isInProg && 'border-indigo-300 bg-indigo-50/40 shadow-xs dark:border-indigo-800 dark:bg-indigo-950/20 ring-1 ring-indigo-400/30',
                            isPendingSurvey && 'border-violet-300 bg-violet-50/40 dark:border-violet-800 dark:bg-violet-950/20',
                            stage.status === 'upcoming' && 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-75'
                          )}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black shrink-0 shadow-2xs',
                                isDone && 'bg-emerald-500 text-white',
                                isInProg && 'bg-indigo-600 text-white animate-pulse',
                                isPendingSurvey && 'bg-violet-600 text-white',
                                stage.status === 'upcoming' && 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                              )}
                            >
                              #{stage.number}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                  {stage.title}
                                </p>
                                {isDone && <Badge variant="success" size="sm">Passed</Badge>}
                                {isInProg && <Badge variant="primary" size="sm" dot>Current</Badge>}
                                {isPendingSurvey && <Badge variant="violet" size="sm">Survey</Badge>}
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                Academic Weight: <strong>{stage.weight}%</strong> &bull; Due: {stage.dueDate}
                                {stage.completedDate && ` &bull; Approved on ${stage.completedDate}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenRubric(stage)}
                            >
                              Rubric
                            </Button>
                            {isInProg && (
                              <Button
                                size="sm"
                                variant="gradient"
                                onClick={() => setIsSubmitModalOpen(true)}
                              >
                                Submit Work
                              </Button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right col: Multi-disciplinary Team & Contribution percentages */}
            <div className="space-y-6">
              {/* Team Members Card with Contribution indicators */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-base">Team Members &amp; Contributions</CardTitle>
                    <p className="text-xs text-slate-400">Calculated from verified task deliverables</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsInviteModalOpen(true)}
                    leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                  >
                    Invite
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3.5">
                  {teamMembers.map((m) => (
                    <div key={m.id} className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <Avatar src={m.avatar} name={m.name} size="sm" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{m.name}</p>
                              {m.isPending && <Badge variant="warning" size="sm">Invited</Badge>}
                            </div>
                            <p className="text-[10px] text-slate-400">{m.role} &bull; <strong className="text-indigo-600 dark:text-indigo-400">{m.department.split(' ')[0]}</strong></p>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                          {m.contribution}%
                        </span>
                      </div>
                      <ProgressBar value={m.contribution} max={50} color={m.contribution > 30 ? 'indigo' : 'violet'} size="sm" />
                    </div>
                  ))}

                  <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 text-[10px] text-slate-500">
                    <strong>Contribution Rule:</strong> Initial equal allocation adjusted dynamically based on approved milestone pull requests and peer review survey ratings.
                  </div>
                </CardContent>
              </Card>

              {/* Technologies & Domain Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Technology Stack &amp; Hardware</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {project.requiredSkills?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links & Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Project Links &amp; Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <a
                    href="https://github.com/capstone-deliveries/rover-nav-stack"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 dark:border-slate-800 dark:hover:border-indigo-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">GitHub Repository</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://overleaf.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 dark:border-slate-800 dark:hover:border-indigo-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-600" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Overleaf Capstone Paper</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Stages & Milestones */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Official Capstone Milestones Breakdown
              </h3>
              <p className="text-xs text-slate-400">Formal university evaluation criteria and weighted point assignments</p>
            </div>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setIsSubmitModalOpen(true)}
              leftIcon={<UploadCloud className="w-4 h-4" />}
            >
              Submit Deliverable
            </Button>
          </div>

          <div className="space-y-4">
            {stages.map((st) => (
              <Card key={st.id} hover className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 font-black text-base dark:bg-indigo-950 dark:text-indigo-400 shrink-0 shadow-2xs">
                      #{st.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{st.title}</h4>
                        <Badge variant={st.status === 'completed' ? 'success' : st.status === 'in-progress' ? 'primary' : 'neutral'} size="sm">
                          {st.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Academic Weight: <strong>{st.weight}%</strong> of total project score &bull; Target Deadline: <strong>{st.dueDate}</strong>
                      </p>
                      {st.feedback && (
                        <div className="mt-2.5 text-xs p-3 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                          <strong>Faculty Feedback:</strong> {st.feedback}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenRubric(st)}
                    >
                      Rubric Criteria
                    </Button>
                    {st.status === 'in-progress' && (
                      <Button
                        variant="gradient"
                        size="sm"
                        onClick={() => setIsSubmitModalOpen(true)}
                      >
                        Submit Evidence
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Task Board */}
      {activeTab === 'taskboard' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multidisciplinary Task Board</h3>
              <p className="text-xs text-slate-400">Assign, update and move tasks across execution stages</p>
            </div>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setIsTaskModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Task
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['todo', 'in-progress', 'review', 'completed'].map((statusKey) => {
              const statusLabels = {
                todo: 'To Do',
                'in-progress': 'In Progress',
                review: 'Under Review',
                completed: 'Completed',
              }
              const statusTasks = tasks.filter((t) => t.status === statusKey)

              return (
                <div key={statusKey} className="rounded-2xl bg-slate-100/70 p-3.5 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {statusLabels[statusKey]}
                    </span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-600 shadow-2xs dark:bg-slate-800 dark:text-slate-300">
                      {statusTasks.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {statusTasks.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-400 italic">No tasks</p>
                    ) : (
                      statusTasks.map((task) => (
                        <div
                          key={task.id}
                          className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-300 transition-all"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <Badge
                              variant={
                                task.priority === 'urgent'
                                  ? 'danger'
                                  : task.priority === 'high'
                                  ? 'warning'
                                  : 'primary'
                              }
                              size="sm"
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-[10px] text-slate-400 font-medium">Due {task.dueDate}</span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {task.title}
                          </h5>
                          <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] text-slate-500 font-semibold">{task.assignee}</span>
                            
                            <div className="flex items-center gap-1.5">
                              <select
                                value={task.status}
                                onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                                className="text-[10px] rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 font-medium"
                              >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="review">Review</option>
                                <option value="completed">Completed</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => handleDeleteTask(task.id)}
                                title="Delete task"
                                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Timeline & Gantt */}
      {activeTab === 'timeline' && (
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Milestone Gantt &amp; Delivery Timeline</CardTitle>
            <p className="text-xs text-slate-400">Sequential checkpoints leading up to official Capstone Defense Day</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 pt-2">
              {stages.map((st, idx) => (
                <div key={st.id} className="relative flex items-start gap-4">
                  {idx !== stages.length - 1 && (
                    <div className="absolute top-9 left-4 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
                  )}
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-black z-10 shadow-2xs',
                      st.status === 'completed'
                        ? 'bg-emerald-500 text-white'
                        : st.status === 'in-progress'
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950 animate-pulse'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    )}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{st.title}</h4>
                      <span className="text-xs font-semibold text-slate-500">{st.dueDate}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Weight: {st.weight}% &bull; Status: <span className="capitalize font-semibold">{st.status}</span></p>
                    {st.feedback && <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">&check; {st.feedback}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 5: Team & Contributions */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multidisciplinary Team Roster</h3>
              <p className="text-xs text-slate-400">Verified student roles across Computer Science, Electrical Engineering, and Design</p>
            </div>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setIsInviteModalOpen(true)}
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              Invite Member
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <Avatar src={member.avatar} name={member.name} size="lg" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{member.name}</h4>
                      {member.isPending && <Badge variant="warning" size="sm">Pending Invitation</Badge>}
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{member.role}</p>
                    <p className="text-xs text-slate-400">{member.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Contribution</span>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white">{member.contribution}%</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Documents & Submissions */}
      {activeTab === 'submissions' && (
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <CardTitle>Deliverable Submissions &amp; Version History</CardTitle>
              <p className="text-xs text-slate-400 mt-1">Official audit of submitted codebase, CAD models, and research papers</p>
            </div>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setIsSubmitModalOpen(true)}
              leftIcon={<UploadCloud className="w-4 h-4" />}
            >
              New Submission
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 shadow-2xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        {sub.title}
                      </h5>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                        Stage {sub.stageNumber}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Submitted by {sub.author} &bull; {sub.date} &bull; {sub.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={sub.status === 'Approved' ? 'success' : sub.status === 'Reviewed' ? 'primary' : 'warning'}>
                    {sub.status} &bull; {sub.score}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    Inspect
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toast.success(`Downloaded official artifact for "${sub.title}"`)}
                    title="Download Evidence"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 7: Surveys & Feedback */}
      {activeTab === 'surveys' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Project Surveys &amp; Peer Reviews</h3>
              <p className="text-xs text-slate-400">Continuous institutional quality feedback</p>
            </div>
            <Link to="/surveys">
              <Button variant="outline" size="sm">
                View All Surveys
              </Button>
            </Link>
          </div>

          {DEMO_SURVEYS.map((survey) => (
            <Card key={survey.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={survey.status === 'pending' ? 'violet' : 'success'} size="sm">
                      {survey.status === 'pending' ? 'Action Required' : 'Completed'}
                    </Badge>
                    <span className="text-xs text-slate-400">Due {survey.deadline}</span>
                  </div>
                  <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">{survey.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-2xl">{survey.description}</p>
                </div>

                <Link to="/surveys">
                  <Button variant="gradient" size="sm">
                    {survey.status === 'pending' ? 'Take Survey' : 'View Results'}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 8: Activity History */}
      {activeTab === 'activity' && (
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Project Audit Trail &amp; Milestones Log</CardTitle>
            <p className="text-xs text-slate-400">Verifiable tamper-proof activity trail of all project events</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div
                  className={cn(
                    'w-2.5 h-2.5 rounded-full mt-1 shrink-0',
                    act.color === 'emerald' && 'bg-emerald-500',
                    act.color === 'indigo' && 'bg-indigo-500',
                    act.color === 'violet' && 'bg-violet-500',
                    act.color === 'amber' && 'bg-amber-500'
                  )}
                />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {act.text}
                  </p>
                  <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Modal 1: Create Task */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Add Task to Workspace"
        description="Assign a task to team members with priority and due date."
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="e.g. Integrate obstacle avoidance sensor fusion"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Assignee"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              options={[
                { value: 'Alex Rivera', label: 'Alex Rivera (CS)' },
                { value: 'Samantha Chen', label: 'Samantha Chen (ECE)' },
                { value: 'Marcus Patel', label: 'Marcus Patel (Data Sci)' },
                { value: 'Priya Sharma', label: 'Priya Sharma (Design)' },
              ]}
            />

            <Select
              label="Priority Level"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              options={[
                { value: 'urgent', label: 'Urgent' },
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
          </div>

          <Input
            label="Due Date"
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit">
              Save Task
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Submit Deliverable */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Milestone Deliverable"
        description="Provide documentation, codebase links, or reports for faculty guide evaluation."
      >
        <form onSubmit={handleSubmitDeliverable} className="space-y-4">
          <Select
            label="Target Milestone Stage"
            value={submission.milestoneId}
            onChange={(e) => setSubmission({ ...submission, milestoneId: e.target.value })}
            options={stages.map((s) => ({ value: s.id, label: `Stage ${s.number}: ${s.title}` }))}
          />

          <Input
            label="Deliverable Title"
            value={submission.title}
            onChange={(e) => setSubmission({ ...submission, title: e.target.value })}
            required
          />

          <Input
            label="Repository or Cloud Document Link"
            value={submission.link}
            onChange={(e) => setSubmission({ ...submission, link: e.target.value })}
            helperText="e.g. GitHub repo, Overleaf paper, or CAD model viewer URL"
            required
          />

          <Textarea
            label="Submission Notes & Evidence Summary"
            value={submission.notes}
            onChange={(e) => setSubmission({ ...submission, notes: e.target.value })}
            rows={3}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsSubmitModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit" leftIcon={<UploadCloud className="w-4 h-4" />}>
              Submit to Faculty Guide
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal 3: Invite Team Member */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Multidisciplinary Teammate"
        description="Send an invitation to a student from another department to join this capstone project."
      >
        <form onSubmit={handleSendInvite} className="space-y-4">
          <Input
            label="Student University Email"
            type="email"
            placeholder="student@university.edu"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />

          <Input
            label="Proposed Project Role"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit" leftIcon={<Send className="w-4 h-4" />}>
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal 4: Rubric Criteria Inspection Modal */}
      {activeRubricStage && (
        <Modal
          isOpen={isRubricModalOpen}
          onClose={() => setIsRubricModalOpen(false)}
          title={`Stage ${activeRubricStage.number} Rubric: ${activeRubricStage.title}`}
          description={`Weight: ${activeRubricStage.weight}% of Total Capstone Score • Due ${activeRubricStage.dueDate}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-slate-700 dark:text-slate-300">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                Faculty Evaluation Standard:
              </span>
              Teams must provide verifiable evidence, source code documentation, and pass technical review by their designated faculty advisor.
            </div>

            <div className="space-y-2">
              <h5 className="font-bold uppercase tracking-wider text-slate-500">Required Deliverables:</h5>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Technical design document / methodology justification</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Working prototype code or CAD model files</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Individual team contribution log</span>
              </div>
            </div>

            {activeRubricStage.feedback && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                <strong>Faculty Feedback:</strong> {activeRubricStage.feedback}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="gradient"
                size="sm"
                onClick={() => {
                  setSubmission({
                    ...submission,
                    milestoneId: activeRubricStage.id,
                    title: `${activeRubricStage.title} - Verifiable Evidence Submission`,
                  })
                  setIsRubricModalOpen(false)
                  setIsSubmitModalOpen(true)
                }}
                leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
              >
                Submit Evidence for Stage {activeRubricStage.number}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsRubricModalOpen(false)}>
                Close Rubric
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal 5: Contact Faculty Guide Modal */}
      {isContactGuideModalOpen && (
        <Modal
          isOpen={isContactGuideModalOpen}
          onClose={() => setIsContactGuideModalOpen(false)}
          title={`Consultation Request: ${project.facultyGuide.name}`}
          description={`Direct communication with assigned faculty guide for ${project.title}`}
        >
          <form onSubmit={handleContactGuide} className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
              <Avatar src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" name={project.facultyGuide.name} size="sm" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">{project.facultyGuide.name}</p>
                <p className="text-slate-400">{project.facultyGuide.department} &bull; Room 304 Robotics Lab</p>
              </div>
            </div>

            <Select
              label="Consultation Topic"
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
              options={[
                { value: 'Office Hours Meeting', label: 'Office Hours Meeting Request' },
                { value: 'Milestone Review Query', label: 'Milestone Review & Grading Inquiry' },
                { value: 'Hardware Lab Access', label: 'Hardware Lab / Equipment Access' },
                { value: 'Codebase / Methodology Check', label: 'Codebase & Architecture Walkthrough' },
              ]}
            />

            <Input
              label="Subject"
              value={contactSubject}
              onChange={(e) => setContactSubject(e.target.value)}
              required
            />

            <Textarea
              label="Inquiry Details / Meeting Agenda"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Outline specific technical bottlenecks, questions on rubric expectations, or proposed meeting slots..."
              rows={4}
              required
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setIsContactGuideModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" size="sm" type="submit" leftIcon={<Send className="w-4 h-4" />}>
                Dispatch Request
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal 6: Inspect Deliverable Details */}
      {selectedSubmission && (
        <Modal
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          title="Deliverable Dossier & Verification Report"
          description={`Milestone Stage ${selectedSubmission.stageNumber} • Submitted by ${selectedSubmission.author}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  Deliverable Title
                </span>
                <Badge variant={selectedSubmission.status === 'Approved' ? 'success' : selectedSubmission.status === 'Reviewed' ? 'primary' : 'warning'}>
                  {selectedSubmission.status} &bull; {selectedSubmission.score}
                </Badge>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedSubmission.title}
              </h4>
              <p className="text-slate-500 text-[11px]">
                Audit timestamp: {selectedSubmission.date} &bull; Classification: {selectedSubmission.type}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Online Codebase / Artifact Repository:
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 truncate mr-2">
                  <GitBranch className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 truncate">{selectedSubmission.link}</span>
                </div>
                <a
                  href={selectedSubmission.link}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0"
                >
                  <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Open
                  </Button>
                </a>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Submission Notes &amp; Methodology Evidence:
              </span>
              <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedSubmission.notes}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.success(`Exported complete deliverable audit trail for "${selectedSubmission.title}"`)
                }}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Download Evidence Pack
              </Button>
              <Button variant="gradient" size="sm" onClick={() => setSelectedSubmission(null)}>
                Close Dossier
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
