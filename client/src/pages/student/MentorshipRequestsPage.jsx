import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  GitPullRequest,
  Clock,
  CheckCircle2,
  XCircle,
  Trash2,
  ExternalLink,
  Plus,
  BookOpen,
  User,
  Building,
  MessageSquare,
  Send,
  Calendar,
  Check,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { DemoDataNotice } from '../../components/common/DemoDataNotice'
import { useToast } from '../../context/ToastContext'

export const INITIAL_REQUESTS = [
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
  {
    id: 'req_02',
    mentorName: 'Dr. Tariq Mansoor',
    mentorTitle: 'Professor of Electrical Power & Smart Systems',
    mentorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    mentorDepartment: 'Electrical & Computer Engineering',
    projectTitle: 'Autonomous Campus Delivery Bot (Battery & BMS Subsystem)',
    projectId: 'proj_01',
    submittedDate: 'Jan 22, 2026',
    status: 'pending',
    proposalScope: 'Co-mentorship request focusing on lithium battery management system (BMS) safety, high-current draw motor ESC driver optimization, and power telemetry firmware.',
    teamMembers: 'Samantha Chen (ECE Hardware Lead)',
    facultyNotes: 'Under review. Currently assessing lab bench availability and battery thermal chamber capacity for Spring semester.',
  },
]

export const MentorshipRequestsPage = () => {
  const { toast } = useToast()
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('capstone_mentorship_requests')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_REQUESTS
  })

  const [selectedProposal, setSelectedProposal] = useState(null)
  const [messageMentorTarget, setMessageMentorTarget] = useState(null)
  const [messageSubject, setMessageSubject] = useState('')
  const [messageContent, setMessageContent] = useState('')

  // Sync state to localStorage
  const updateRequestsList = (newList) => {
    setRequests(newList)
    localStorage.setItem('capstone_mentorship_requests', JSON.stringify(newList))
  }

  const handleCancelRequest = (id) => {
    const updated = requests.filter((r) => r.id !== id)
    updateRequestsList(updated)
    toast.info('Mentorship request successfully cancelled.')
    if (selectedProposal?.id === id) {
      setSelectedProposal(null)
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!messageContent.trim()) {
      toast.error('Please enter a message for your mentor')
      return
    }
    toast.success(`Message sent to ${messageMentorTarget.mentorName}. A notification has been dispatched to their university inbox.`)
    setMessageMentorTarget(null)
    setMessageSubject('')
    setMessageContent('')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Mentorship' }, { label: 'Requests & Status' }]} />

      <DemoDataNotice label="Mentorship Queue Tracker" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mentorship Requests &amp; Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track official faculty supervision inquiries, review feedback, and manage pending requests.
          </p>
        </div>
        <Link to="/mentors">
          <Button variant="gradient" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Discover More Mentors
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <Card key={req.id} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <Avatar src={req.mentorAvatar} name={req.mentorName} size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{req.mentorName}</h3>
                    <Badge variant={req.status === 'accepted' ? 'success' : 'warning'} size="sm">
                      {req.status === 'accepted' ? 'Approved & Assigned' : 'Pending Review'}
                    </Badge>
                  </div>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{req.mentorTitle}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Project: <strong>{req.projectTitle}</strong> &bull; Requested on {req.submittedDate}
                  </p>
                  {req.facultyNotes && (
                    <div className="mt-2 text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                      <strong>Faculty Note:</strong> {req.facultyNotes}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {req.status === 'accepted' && (
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => {
                      setMessageMentorTarget(req)
                      setMessageSubject(`Capstone Checkpoint: ${req.projectTitle}`)
                    }}
                    leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                  >
                    Message Mentor
                  </Button>
                )}
                {req.status === 'pending' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancelRequest(req.id)}
                    leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                  >
                    Cancel Request
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProposal(req)}
                  leftIcon={<BookOpen className="w-3.5 h-3.5" />}
                >
                  View Proposal
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View Proposal Detail Modal */}
      {selectedProposal && (
        <Modal
          isOpen={!!selectedProposal}
          onClose={() => setSelectedProposal(null)}
          title="Mentorship Proposal Dossier"
          description={`Proposal submitted to ${selectedProposal.mentorName} on ${selectedProposal.submittedDate}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  Target Capstone Project
                </span>
                <Badge variant={selectedProposal.status === 'accepted' ? 'success' : 'warning'} size="sm">
                  {selectedProposal.status === 'accepted' ? 'Accepted' : 'Under Review'}
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedProposal.projectTitle}
              </h4>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Target Faculty Advisor:
              </span>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Avatar src={selectedProposal.mentorAvatar} name={selectedProposal.mentorName} size="sm" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{selectedProposal.mentorName}</p>
                  <p className="text-slate-400 text-[11px]">{selectedProposal.mentorTitle} &bull; {selectedProposal.mentorDepartment}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Project Scope &amp; Mentorship Objectives:
              </span>
              <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProposal.proposalScope}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Multidisciplinary Student Team:
              </span>
              <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                {selectedProposal.teamMembers}
              </p>
            </div>

            {selectedProposal.facultyNotes && (
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                  Faculty Guidance Notes:
                </span>
                <p className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  {selectedProposal.facultyNotes}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              {selectedProposal.status === 'pending' ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleCancelRequest(selectedProposal.id)}
                  leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  Withdraw Request
                </Button>
              ) : (
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => {
                    setMessageMentorTarget(selectedProposal)
                    setMessageSubject(`Supervision Update: ${selectedProposal.projectTitle}`)
                  }}
                  leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                >
                  Message {selectedProposal.mentorName}
                </Button>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedProposal(null)}>
                  Close
                </Button>
                <Link to={`/projects/${selectedProposal.projectId}`}>
                  <Button variant="secondary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Open Project Workspace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Message Mentor Interactive Modal */}
      {messageMentorTarget && (
        <Modal
          isOpen={!!messageMentorTarget}
          onClose={() => setMessageMentorTarget(null)}
          title={`Message Faculty Advisor: ${messageMentorTarget.mentorName}`}
          description={`Direct academic inquiry regarding ${messageMentorTarget.projectTitle}`}
        >
          <form onSubmit={handleSendMessage} className="space-y-4">
            <Input
              label="Subject"
              value={messageSubject}
              onChange={(e) => setMessageSubject(e.target.value)}
              placeholder="e.g. Milestone 3 clarification / Lab bench access"
              required
            />

            <Textarea
              label="Message Body"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Write your note, progress update, or office hours meeting request..."
              rows={4}
              required
            />

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-500 text-xs border border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Standard office hours: Tuesdays &amp; Thursdays 2:00 PM &ndash; 4:00 PM (Robotics Lab Room 304).</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setMessageMentorTarget(null)}>
                Cancel
              </Button>
              <Button variant="gradient" size="sm" type="submit" leftIcon={<Send className="w-4 h-4" />}>
                Send Message
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
