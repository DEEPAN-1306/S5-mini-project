import React from 'react'
import { Link } from 'react-router-dom'
import { FolderGit2, Plus, ArrowRight, KanbanSquare, Clock, Users } from 'lucide-react'
import { DEMO_PROJECTS } from '../../utils/demoData'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'

export const MyProjectsPage = () => {
  const [myProjects] = React.useState(() => {
    const saved = localStorage.getItem('capstone_my_projects')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {}
    }
    return DEMO_PROJECTS.slice(0, 1)
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Enrolled Capstone Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your ongoing capstone research and multidisciplinary milestones.
          </p>
        </div>
        <Link to="/projects">
          <Button variant="gradient" leftIcon={<Plus className="w-4 h-4" />}>
            Propose or Join Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myProjects.map((proj) => (
          <Card key={proj.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{proj.category}</Badge>
                  <Badge variant="success" dot>In Progress</Badge>
                  <span className="text-xs text-slate-400">{proj.startDate} &mdash; {proj.deadline}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                <p className="text-xs text-slate-500 max-w-2xl">{proj.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <Link to={`/projects/${proj.id}`}>
                  <Button variant="gradient" size="md" leftIcon={<KanbanSquare className="w-4 h-4" />}>
                    Open Project Tracker
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Progress</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{proj.progress}%</p>
                <ProgressBar value={proj.progress} size="sm" color="gradient" className="mt-1" />
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Faculty Guide</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{proj.facultyGuide.name}</p>
                <p className="text-xs text-slate-400">{proj.facultyGuide.department}</p>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Your Contribution</span>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">32%</p>
                <p className="text-xs text-slate-400">Team Lead &amp; Perception Stack</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
