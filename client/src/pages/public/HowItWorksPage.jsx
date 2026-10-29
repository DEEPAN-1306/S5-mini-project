import React from 'react'
import { Sparkles, Users, Search, Award, CheckCircle, FileText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'

export const HowItWorksPage = () => {
  const steps = [
    {
      step: '01',
      title: 'Define Project or Browse Marketplace',
      desc: 'Students create multidisciplinary project proposals specifying objectives, required skills from other departments (e.g. CS + ECE + Design), and team size limits.',
    },
    {
      step: '02',
      title: 'Assemble Cross-Functional Team',
      desc: 'Browse peer profiles, review portfolio achievements, and send role-specific invitations or evaluate incoming applications.',
    },
    {
      step: '03',
      title: 'Match with Verified Faculty Mentor',
      desc: 'View explainable mentor compatibility rankings based on technical stack, department alignment, and professor bandwidth. Submit formal mentorship requests.',
    },
    {
      step: '04',
      title: 'Track Milestones, Tasks & Deliverables',
      desc: 'Use the unified Project Tracker with weighted stage progress, Kanban boards, deliverable submission history, and individual contribution records.',
    },
    {
      step: '05',
      title: 'Academic Surveys & Defense Verification',
      desc: 'Participate in mid-term peer reviews, complete mentor surveys, and obtain official faculty milestone sign-offs for final capstone defense.',
    },
  ]

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <Badge variant="violet">Step-by-Step Workflow</Badge>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
          How Capstone Connect Works
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          From initial interdisciplinary discovery to official faculty evaluation and final project defense.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((s, idx) => (
          <Card key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-extrabold text-xl shrink-0 shadow-md shadow-indigo-500/20">
              {s.step}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-14 p-8 rounded-3xl bg-indigo-600 text-white text-center shadow-xl shadow-indigo-600/20">
        <h2 className="text-2xl font-bold">Ready to kick off your university project?</h2>
        <p className="mt-2 text-indigo-100 text-sm max-w-xl mx-auto">
          Join students and professors across engineering, science, and design departments today.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/register">
            <Button variant="secondary" size="md">
              Create Student Account
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="text-white border-white hover:bg-white/10" size="md">
              Try Interactive Workspace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
