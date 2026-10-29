import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Compass,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Users,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import { DEMO_PROJECTS } from '../../utils/demoData'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Modal } from '../../components/ui/Modal'
import { Textarea } from '../../components/ui/Textarea'
import { EmptyState } from '../../components/ui/EmptyState'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { DemoDataNotice } from '../../components/common/DemoDataNotice'
import { useToast } from '../../context/ToastContext'

export const ProjectDiscoveryPage = () => {
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('capstone_projects')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {}
    }
    return DEMO_PROJECTS
  })

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const { toast } = useToast()

  // Update search query when URL search param changes
  useEffect(() => {
    const q = searchParams.get('search')
    if (q !== null) {
      setSearchQuery(q)
    }
  }, [searchParams])

  // New project form state
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Core Interdisciplinary Capstone',
    domain: 'Robotics & Embedded AI',
    description: '',
    department: 'Interdisciplinary (CS, ECE, Design)',
    requiredSkills: 'ROS 2, Embedded C++, CAD',
    teamSizeLimit: 4,
    difficulty: 'Intermediate',
  })

  // Apply form state
  const [applicationData, setApplicationData] = useState({
    roleApplied: 'Computer Vision Engineer',
    statement: '',
  })

  const filteredProjects = projects
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.requiredSkills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesDomain = selectedDomain === 'all' || p.domain.toLowerCase().includes(selectedDomain.toLowerCase())
      const matchesDifficulty = selectedDifficulty === 'all' || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      return matchesSearch && matchesDomain && matchesDifficulty
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress
      if (sortBy === 'points') return b.earnedPoints - a.earnedPoints
      return 0
    })

  const handleCreateProject = (e) => {
    e.preventDefault()
    if (!newProject.title || !newProject.description) {
      toast.error('Please enter a title and description')
      return
    }

    const created = {
      id: 'proj_' + Date.now(),
      ...newProject,
      progress: 0,
      earnedPoints: 100,
      startDate: 'Mar 2026',
      deadline: 'Jun 2026',
      owner: { name: 'Alex Rivera', role: 'Team Lead', department: 'Computer Science' },
      facultyGuide: { name: 'Pending Guide Assignment', department: 'Academic Affairs' },
      requiredSkills: newProject.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      members: [{ id: 'usr_curr', name: 'Alex Rivera', role: 'Team Lead', contribution: 100, department: 'Computer Science', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }],
      stages: [
        { id: 's1', number: 1, title: 'Proposal & Scope Approval', status: 'in-progress', dueDate: 'Apr 2026', weight: 20 },
      ],
    }

    const updated = [created, ...projects]
    setProjects(updated)
    localStorage.setItem('capstone_projects', JSON.stringify(updated))

    // Also update student's enrolled projects list
    const myProjs = JSON.parse(localStorage.getItem('capstone_my_projects') || '[]')
    localStorage.setItem('capstone_my_projects', JSON.stringify([created, ...(myProjs.length > 0 ? myProjs : DEMO_PROJECTS.slice(0, 1))]))

    setIsCreateModalOpen(false)
    setNewProject({
      title: '',
      category: 'Core Interdisciplinary Capstone',
      domain: 'Robotics & Embedded AI',
      description: '',
      department: 'Interdisciplinary (CS, ECE, Design)',
      requiredSkills: 'ROS 2, Embedded C++, CAD',
      teamSizeLimit: 4,
      difficulty: 'Intermediate',
    })
    toast.success('Capstone project proposed successfully! Visible in Marketplace and My Projects.')
  }

  const handleApply = (e) => {
    e.preventDefault()
    if (!applicationData.statement.trim()) {
      toast.error('Please include your statement of interest and capabilities')
      return
    }
    toast.success(`Application submitted to ${selectedProject?.title} for the role of ${applicationData.roleApplied}`)
    setIsApplyModalOpen(false)
    setApplicationData({ roleApplied: '', statement: '' })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Projects' }, { label: 'Capstone Marketplace' }]} />

      <DemoDataNotice label="Interdisciplinary Project Marketplace" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Capstone Project Discovery &amp; Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover active multidisciplinary capstones, apply for vacant roles across departments, or propose a new venture.
          </p>
        </div>
        <Button
          variant="gradient"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Propose Capstone Project
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <Input
            placeholder="Search projects, domains, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />

          <Select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            options={[
              { value: 'all', label: 'All Domains' },
              { value: 'Robotics', label: 'Robotics & Embedded AI' },
              { value: 'Renewable', label: 'Renewable Energy & IoT' },
              { value: 'Healthcare', label: 'Healthcare & Wearables' },
            ]}
          />

          <Select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            options={[
              { value: 'all', label: 'All Difficulty Levels' },
              { value: 'Intermediate', label: 'Intermediate' },
              { value: 'Advanced', label: 'Advanced' },
            ]}
          />

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'newest', label: 'Sort: Newest First' },
              { value: 'progress', label: 'Sort: Highest Milestone %' },
              { value: 'points', label: 'Sort: Most Points' },
            ]}
          />
        </div>
      </Card>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="No projects match your search criteria"
          description="Try relaxing your filters or be the first student to propose a capstone in this domain."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('')
            setSelectedDomain('all')
            setSelectedDifficulty('all')
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <Card key={proj.id} hover className="flex flex-col justify-between p-6">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">{proj.domain}</Badge>
                  <Badge variant={proj.difficulty === 'Advanced' ? 'violet' : 'neutral'} size="sm">
                    {proj.difficulty}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                    <span>Milestone Progress</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{proj.progress}%</span>
                  </div>
                  <ProgressBar value={proj.progress} size="sm" color="gradient" />
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.requiredSkills?.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {proj.requiredSkills?.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                      +{proj.requiredSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  <span>Roster: </span>
                  <strong className="text-slate-700 dark:text-slate-300">{proj.members?.length || 1}/{proj.teamSizeLimit || 4} members</strong>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedProject(proj)
                      setIsApplyModalOpen(true)
                    }}
                  >
                    Apply
                  </Button>
                  <Link to={`/projects/${proj.id}`}>
                    <Button size="sm" variant="gradient">
                      View Tracker
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal: Create Capstone Project */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Propose Capstone Project"
        description="Define a multidisciplinary project topic for university peer collaboration."
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g. Autonomous Campus Delivery Bot"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Primary Domain"
              value={newProject.domain}
              onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })}
              options={[
                { value: 'Robotics & Embedded AI', label: 'Robotics & Embedded AI' },
                { value: 'Renewable Energy & IoT', label: 'Renewable Energy & IoT' },
                { value: 'Healthcare & Wearables', label: 'Healthcare & Wearables' },
              ]}
            />

            <Select
              label="Difficulty Level"
              value={newProject.difficulty}
              onChange={(e) => setNewProject({ ...newProject, difficulty: e.target.value })}
              options={[
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' },
              ]}
            />
          </div>

          <Textarea
            label="Problem Statement & Objectives"
            placeholder="Describe what problem this project tackles and what each department will contribute..."
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            rows={3}
            required
          />

          <Input
            label="Required Skills (comma-separated)"
            placeholder="ROS 2, Embedded C++, PyTorch, CAD"
            value={newProject.requiredSkills}
            onChange={(e) => setNewProject({ ...newProject, requiredSkills: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit">
              Submit Proposal
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Apply to Join */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply to join ${selectedProject?.title}`}
        description="Submit your credentials and intended role contribution to the project owner."
      >
        <form onSubmit={handleApply} className="space-y-4">
          <Input
            label="Desired Role in Team"
            placeholder="e.g. Perception / ML Engineer, Hardware Lead"
            value={applicationData.roleApplied}
            onChange={(e) => setApplicationData({ ...applicationData, roleApplied: e.target.value })}
            required
          />

          <Textarea
            label="Statement of Interest & Capabilities"
            placeholder="Explain your relevant coursework, lab experience, or tools you can contribute..."
            value={applicationData.statement}
            onChange={(e) => setApplicationData({ ...applicationData, statement: e.target.value })}
            rows={4}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit">
              Send Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
