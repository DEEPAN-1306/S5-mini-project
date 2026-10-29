import React from 'react'
import {
  Users,
  Compass,
  Award,
  KanbanSquare,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export const FeaturesPage = () => {
  const capabilities = [
    {
      icon: Users,
      title: 'Multidisciplinary Team Formation',
      description: 'Algorithmically match students from different departments with cross-functional skill verification, seat vacancy tracking, and join request approvals.',
      points: ['Department cross-listing', 'Role-specific applications', 'Team size limits and ownership rules'],
    },
    {
      icon: KanbanSquare,
      title: 'Comprehensive Project Tracker',
      description: 'Derived from real institutional rubrics with stage-by-stage verification, weighted milestones, Gantt timeline, and individual contribution percentages.',
      points: ['Weighted milestone models', 'Deliverable version history', 'Peer contribution tracking'],
    },
    {
      icon: Award,
      title: 'Explainable Mentor Matching',
      description: 'Transparent rule-based compatibility scoring based on research domains, faculty expertise, departmental relevance, and verified lab capacity.',
      points: ['Score normalization & breakdown', 'Zero "black-box" AI claims', 'Controlled mentorship request queue'],
    },
    {
      icon: ClipboardList,
      title: 'Academic Surveys & Feedback',
      description: 'Automated survey checkpoints for mid-term peer evaluations, faculty guidance reviews, and capstone defense readiness checklists.',
      points: ['Rating, multiple-choice & text inputs', 'Controlled anonymity options', 'Aggregated review summaries'],
    },
    {
      icon: ShieldCheck,
      title: 'Role-Based Access Control',
      description: 'Enforce university governance across Students, Faculty Guides, and Academic Administrators with strict server-side authorization.',
      points: ['Protected routes & endpoints', 'Tamper-proof role resolution', 'Comprehensive audit logs'],
    },
    {
      icon: Compass,
      title: 'Dynamic Project Marketplace',
      description: 'Search and filter active capstone proposals by domain, difficulty, department, application deadline, and required technologies.',
      points: ['Real-time debounced search', 'Interdisciplinary tagging', 'Interactive application modal'],
    },
  ]

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <Badge variant="primary">Platform Features</Badge>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
          Everything Needed for High-Impact Capstone Projects
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
          Engineered to institutional standards with rich collaboration tools, academic accountability, and transparent mentorship workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {capabilities.map((c, i) => {
          const Icon = c.icon
          return (
            <Card key={i} hover className="flex flex-col justify-between p-6">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.description}
                </p>
                <div className="mt-4 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {c.points.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-16 text-center">
        <Link to="/dashboard">
          <Button variant="gradient" size="lg">
            Experience Live Features Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
