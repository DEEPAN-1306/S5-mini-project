import React from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Users,
  Compass,
  Award,
  Layers,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  BarChart3,
  ClipboardCheck,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

export const LandingPage = () => {
  const stats = [
    { label: 'Active University Teams', value: '86+' },
    { label: 'Multidisciplinary Domains', value: '14' },
    { label: 'Faculty Mentors Enrolled', value: '42' },
    { label: 'Milestone Completion Rate', value: '94.2%' },
  ]

  const features = [
    {
      icon: Users,
      title: 'Multidisciplinary Team Formation',
      description: 'Break academic silos. Form balanced teams bridging Computer Science, Electrical Engineering, Mechanical, Data Science, and Design.',
      badge: 'Collaboration',
    },
    {
      icon: Layers,
      title: 'Project Tracker & Weighted Milestones',
      description: 'Track progress with stage-by-stage verification, transparent contribution percentages, and structured deliverable reviews.',
      badge: 'Execution',
    },
    {
      icon: Award,
      title: 'Explainable Mentor Matching',
      description: 'Rule-based compatibility scores considering skill overlap, research domains, department alignment, and lab capacity.',
      badge: 'Mentorship',
    },
    {
      icon: ClipboardCheck,
      title: 'Academic Milestone Evaluations & Surveys',
      description: 'Continuous peer feedback, milestone surveys, and formal rubrics to ensure rigorous academic excellence before final defense.',
      badge: 'Evaluation',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft background ambient gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/15 to-transparent blur-3xl -z-10 rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/70 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Official University Capstone Collaboration & Mentorship Matching Ecosystem</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl max-w-4xl mx-auto leading-tight">
            Build together. Learn from mentors.{' '}
            <span className="gradient-accent-text block sm:inline">Turn ideas into impact.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            The unified platform enabling university students across departments to discover innovative capstone projects, form high-performing multidisciplinary teams, collaborate with faculty guides, and track milestone deliverables.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch Interactive Demo Workspace
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg" leftIcon={<Compass className="w-4 h-4" />}>
                Browse Capstone Marketplace
              </Button>
            </Link>
          </div>

          {/* Institutional Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl mx-auto">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-xs shadow-xs dark:border-slate-800 dark:bg-slate-900/70"
              >
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Tracker Preview Spotlight */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="primary" size="md">
              Real-World Capstone Tracker
            </Badge>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Transparent Milestone & Contribution Tracking
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Inspired by rigorous academic workflows: monitor stage verification, peer reviews, weighted completion percentages, and member contribution allocations.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="primary">Core Interdisciplinary Capstone</Badge>
                  <Badge variant="success" dot>In Progress (68%)</Badge>
                </div>
                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  Autonomous Campus Delivery Bot with Fleet Coordination
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Faculty Guide: Dr. Elena Rostova (Dept of Computer Science & Robotics) &bull; Lead: Alex Rivera
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Earned Points</span>
                  <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">840 pts</p>
                </div>
                <Link to="/projects/proj_01">
                  <Button variant="gradient" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Open Full Tracker
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stages Timeline Preview */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Stage 1 &bull; 15% Weight</span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Proposal & Scope Approval</p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">&check; Approved by Faculty</span>
              </div>
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Stage 2 &bull; 20% Weight</span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Hardware Architecture & CAD</p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">&check; Approved by Faculty</span>
              </div>
              <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-950/20">
                <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300">Stage 3 &bull; 25% Weight</span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">SLAM & Perception Stack</p>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">&bull; Active in Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Engineered for Modern Academic Innovation
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Every feature is designed to reduce friction between multidisciplinary students, departmental advisors, and university administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <Card key={i} hover className="flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-4 shadow-xs">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="primary" size="sm" className="mb-2">
                      {f.badge}
                    </Badge>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Academic Roles Workflow */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Tailored Experiences for Every Academic Stakeholder
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">For Students</span>
              <h4 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">Discover & Execute</h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Find interdisciplinary partners, manage task boards, receive milestone feedback, and build a verified capstone portfolio.
              </p>
              <Link to="/dashboard" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline">
                Explore Student Dashboard &rarr;
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">For Faculty Mentors</span>
              <h4 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">Guide & Evaluate</h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Review deliverables, manage mentoring capacity, supervise multidisciplinary teams, and submit academic milestone scores.
              </p>
              <Link to="/faculty/dashboard" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-violet-600 hover:underline">
                Explore Faculty Portal &rarr;
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">For Administration</span>
              <h4 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">Oversee & Optimize</h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Track department-wide engagement metrics, manage project approvals, oversee faculty guide allocations, and audit history.
              </p>
              <Link to="/admin/dashboard" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:underline">
                Explore Admin Insights &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
