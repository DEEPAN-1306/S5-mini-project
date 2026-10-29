import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FolderGit2,
  KanbanSquare,
  Users2,
  ArrowRight,
  UserCheck,
  Calendar,
  Send,
  MessageSquare,
  Award,
  CheckCircle2,
} from 'lucide-react'
import { DEMO_PROJECTS } from '../../utils/demoData'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Avatar } from '../../components/ui/Avatar'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { useToast } from '../../context/ToastContext'

export const AssignedProjectsPage = () => {
  const { toast } = useToast()
  const [selectedRosterProject, setSelectedRosterProject] = useState(null)
  const [meetingTargetProject, setMeetingTargetProject] = useState(null)
  const [meetingDate, setMeetingDate] = useState('2026-04-14')
  const [meetingTime, setMeetingTime] = useState('14:30')
  const [meetingAgenda, setMeetingAgenda] = useState('Sprint 3 perception stack checkpoint and hardware test bench walkthrough.')

  const handleScheduleMeeting = (e) => {
    e.preventDefault()
    toast.success(`Supervision meeting scheduled with ${meetingTargetProject.title} for ${meetingDate} at ${meetingTime}! Calendar invitations sent to all team members.`)
    setMeetingTargetProject(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Supervised Capstone Teams
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor multidisciplinary team execution, inspect student contribution records, and schedule regular checkpoints.
        </p>
      </div>

      <div className="space-y-4">
        {DEMO_PROJECTS.map((proj) => (
          <Card key={proj.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary">{proj.category}</Badge>
                  <Badge variant="success" dot>Active Supervision</Badge>
                  <span className="text-xs text-slate-400 font-medium">{proj.startDate} &mdash; {proj.deadline}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">{proj.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRosterProject(proj)}
                  leftIcon={<Users2 className="w-4 h-4" />}
                >
                  View Team Roster
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMeetingTargetProject(proj)}
                  leftIcon={<Calendar className="w-4 h-4" />}
                >
                  Schedule Checkpoint
                </Button>
                <Link to={`/projects/${proj.id}`}>
                  <Button variant="gradient" size="sm" leftIcon={<KanbanSquare className="w-4 h-4" />}>
                    Open Tracker
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Overall Completion</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{proj.progress}%</p>
                <ProgressBar value={proj.progress} size="sm" color="gradient" className="mt-1" />
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Team Lead &amp; Department</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{proj.owner.name}</p>
                <p className="text-xs text-slate-400">{proj.owner.department}</p>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Earned Academic Points</span>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">{proj.earnedPoints} pts</p>
                <p className="text-xs text-slate-400">Target: 1000 pts for High Distinction</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Team Roster Modal */}
      {selectedRosterProject && (
        <Modal
          isOpen={!!selectedRosterProject}
          onClose={() => setSelectedRosterProject(null)}
          title={`Team Roster: ${selectedRosterProject.title}`}
          description="Multidisciplinary student team contribution breakdown and verified roles."
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedRosterProject.members?.map((m) => (
                <div key={m.id} className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <Avatar src={m.avatar} name={m.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{m.name}</p>
                      <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold truncate">{m.role}</p>
                      <p className="text-[10px] text-slate-400 truncate">{m.department}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">{m.contribution}%</span>
                      <p className="text-[9px] text-slate-400">Contrib</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">
                Total Team Members: <strong>{selectedRosterProject.members?.length || 4}</strong>
              </span>
              <Button variant="outline" size="sm" onClick={() => setSelectedRosterProject(null)}>
                Close Roster
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule Meeting Modal */}
      {meetingTargetProject && (
        <Modal
          isOpen={!!meetingTargetProject}
          onClose={() => setMeetingTargetProject(null)}
          title="Schedule Faculty Supervision Checkpoint"
          description={`Project: ${meetingTargetProject.title}`}
        >
          <form onSubmit={handleScheduleMeeting} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Meeting Date"
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                required
              />
              <Input
                label="Meeting Time"
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                required
              />
            </div>

            <Textarea
              label="Meeting Objectives & Agenda"
              value={meetingAgenda}
              onChange={(e) => setMeetingAgenda(e.target.value)}
              rows={3}
              required
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setMeetingTargetProject(null)}>
                Cancel
              </Button>
              <Button variant="gradient" size="sm" type="submit" leftIcon={<Send className="w-4 h-4" />}>
                Send Meeting Invite
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
