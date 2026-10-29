import React, { useState } from 'react'
import {
  Users2,
  Award,
  Search,
  CheckCircle2,
  Send,
  Star,
  Sparkles,
  Building,
  Info,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  GraduationCap,
} from 'lucide-react'
import { DEMO_MENTORS, DEMO_PROJECTS } from '../../utils/demoData'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Modal } from '../../components/ui/Modal'
import { Textarea } from '../../components/ui/Textarea'
import { Avatar } from '../../components/ui/Avatar'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { DemoDataNotice } from '../../components/common/DemoDataNotice'
import { useToast } from '../../context/ToastContext'

export const MentorDiscoveryPage = () => {
  const [mentors, setMentors] = useState(DEMO_MENTORS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('all')
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [sortBy, setSortBy] = useState('compatibility')
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(DEMO_PROJECTS[0].id)
  const [requestGoals, setRequestGoals] = useState('')
  const { toast } = useToast()

  const filteredMentors = mentors
    .filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.supportedDomains.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesDept = selectedDept === 'all' || m.department.toLowerCase().includes(selectedDept.toLowerCase())
      const matchesDomain = selectedDomain === 'all' || m.supportedDomains.some((d) => d.toLowerCase().includes(selectedDomain.toLowerCase()))
      return matchesSearch && matchesDept && matchesDomain
    })
    .sort((a, b) => {
      if (sortBy === 'compatibility') return b.compatibilityScore - a.compatibilityScore
      if (sortBy === 'rating') return b.rating - a.rating
      return b.mentoringCapacity - a.mentoringCapacity
    })

  const handleSendRequest = (e) => {
    e.preventDefault()
    if (!requestGoals.trim()) {
      toast.error('Please describe your project objectives and guidance requirements')
      return
    }

    const targetProj = DEMO_PROJECTS.find((p) => p.id === selectedProject) || DEMO_PROJECTS[0]
    const newRequest = {
      id: 'req_' + Date.now(),
      mentorName: selectedMentor.name,
      mentorTitle: selectedMentor.title,
      mentorAvatar: selectedMentor.avatar,
      mentorDepartment: selectedMentor.department,
      projectTitle: targetProj.title,
      projectId: targetProj.id,
      submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending',
      proposalScope: requestGoals,
      teamMembers: 'Alex Rivera (CS Lead), Samantha Chen (ECE), Marcus Patel (Data Science)',
      facultyNotes: `Pending review by ${selectedMentor.name}. Transmitted to faculty dashboard queue.`,
    }

    try {
      const existing = JSON.parse(localStorage.getItem('capstone_mentorship_requests') || '[]')
      const baseList = existing.length > 0 ? existing : [
        {
          id: 'req_01',
          mentorName: 'Dr. Elena Rostova',
          mentorTitle: 'Associate Professor & Robotics Lab Director',
          mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
          mentorDepartment: 'Computer Science & Robotics',
          projectTitle: 'Autonomous Campus Delivery Bot with Fleet Coordination',
          projectId: 'proj_01',
          submittedDate: 'Jan 16, 2026',
          status: 'accepted',
          proposalScope: 'Development of an autonomous last-mile delivery rover navigating campus pedestrian sidewalks safely with LiDAR SLAM, dynamic pedestrian avoidance, and WebRTC telemetry.',
          teamMembers: 'Alex Rivera (CS), Samantha Chen (ECE), Marcus Patel (Data Science), Priya Sharma (Design)',
          facultyNotes: 'Supervision accepted. Excited to support the ROS 2 and SLAM team integration. Regular lab checkpoints scheduled on Tuesdays at 2:00 PM.',
        },
      ]
      localStorage.setItem('capstone_mentorship_requests', JSON.stringify([newRequest, ...baseList]))
    } catch (e) {
      // ignore
    }

    toast.success(`Mentorship request transmitted to ${selectedMentor.name}! Track its review status under Mentorship Requests.`)
    setIsRequestModalOpen(false)
    setRequestGoals('')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Mentorship' }, { label: 'Discover Faculty Guides' }]} />

      <DemoDataNotice label="Explainable Compatibility Engine" />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
          <Info className="w-3.5 h-3.5" />
          <span>Explainable Rule-Based Compatibility Engine (0&ndash;100% Normalized)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Faculty Mentorship Matching Ecosystem
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Connect with university professors, research directors, and laboratory mentors. Rankings are calculated deterministically from multidisciplinary technology overlap, research domain alignment, and verified supervision bandwidth.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <Input
              placeholder="Search mentors by name, expertise (e.g. SLAM, BMS, Sensors)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <Select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            options={[
              { value: 'all', label: 'All Departments' },
              { value: 'Computer Science', label: 'Computer Science & Robotics' },
              { value: 'Electrical', label: 'Electrical & Computer Engineering' },
              { value: 'Biomedical', label: 'Biomedical Engineering' },
              { value: 'Industrial Design', label: 'Industrial Design' },
            ]}
          />

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'compatibility', label: 'Sort: Best Compatibility' },
              { value: 'rating', label: 'Sort: Highest Student Rating' },
              { value: 'capacity', label: 'Sort: Available Capacity' },
            ]}
          />
        </div>
      </Card>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} hover className="flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <Avatar src={mentor.avatar} name={mentor.name} size="lg" status="online" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{mentor.name}</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{mentor.title}</p>
                    <p className="text-xs text-slate-400">{mentor.department}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="inline-flex items-center gap-1 rounded-2xl bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{mentor.compatibilityScore}% Match</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Normalized Score</p>
                </div>
              </div>

              {/* Supported domains & experience */}
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p><strong>Academic Experience:</strong> {mentor.experience}</p>
                <p>
                  <strong>Mentoring Bandwidth:</strong>{' '}
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{mentor.availability}</span>
                </p>
              </div>

              {/* Technical Expertise tags */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Core Research Expertise
                </p>
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Explainable match rationale box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Explainable Recommendation Rationale:
                </p>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {mentor.matchReasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Capacity: <strong>{mentor.currentTeams}/{mentor.mentoringCapacity}</strong> teams supervised
              </span>
              <Button
                size="sm"
                variant="gradient"
                onClick={() => {
                  setSelectedMentor(mentor)
                  setIsRequestModalOpen(true)
                }}
                leftIcon={<Send className="w-3.5 h-3.5" />}
              >
                Request Mentorship
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal: Request Mentorship */}
      {selectedMentor && (
        <Modal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          title={`Request Mentorship: ${selectedMentor.name}`}
          description={`Submit official capstone guidance inquiry to ${selectedMentor.title}`}
        >
          <form onSubmit={handleSendRequest} className="space-y-4">
            <Select
              label="Select Enrolled Capstone Project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              options={DEMO_PROJECTS.map((p) => ({ value: p.id, label: p.title }))}
            />

            <Textarea
              label="Project Objectives & Technical Scope"
              placeholder="Summarize your project goals, key milestones, and why this mentor's lab is the best academic fit..."
              value={requestGoals}
              onChange={(e) => setRequestGoals(e.target.value)}
              rows={4}
              required
            />

            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-xs text-indigo-900 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-900/60">
              <strong>Academic Policy:</strong> Faculty mentors have 5 business days to review formal capstone requests. Duplicate requests for the same project are prohibited.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsRequestModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" size="sm" type="submit" leftIcon={<Send className="w-4 h-4" />}>
                Transmit Mentorship Request
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
