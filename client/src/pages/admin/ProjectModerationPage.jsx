import React, { useState } from 'react'
import { FolderGit2, CheckCircle2, XCircle, UserPlus, ExternalLink, BookOpen, User, Building } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Select } from '../../components/ui/Select'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { useToast } from '../../context/ToastContext'
import { DEMO_PROJECTS, DEMO_MENTORS } from '../../utils/demoData'

export const ProjectModerationPage = () => {
  const { toast } = useToast()
  const [pendingList, setPendingList] = useState([
    {
      id: 'p_mod_01',
      title: 'Decentralized Water Purity IoT Telemetry Network',
      owner: 'Liam Davis (Civil & Environmental Eng)',
      domain: 'CleanTech & IoT',
      proposedGuide: 'Dr. Tariq Mansoor',
      assignedGuide: 'Dr. Tariq Mansoor',
      status: 'pending',
      summary: 'Low-cost turbidity and pH sensor buoy mesh deployed in regional reservoirs for continuous contamination telemetry.',
      departments: ['Civil & Environmental Engineering', 'Electrical & Computer Engineering', 'Data Science'],
      budget: '$2,400 (Student Seed Grant)',
    },
    {
      id: 'p_mod_02',
      title: 'Haptic Exoskeleton Glove for Stroke Rehabilitation',
      owner: 'Mei Lin (Biomedical Eng)',
      domain: 'Healthcare & Wearables',
      proposedGuide: 'Dr. Sarah Jenkins',
      assignedGuide: 'Dr. Sarah Jenkins',
      status: 'pending',
      summary: 'Pneumatic actuator glove with electromyography feedback and clinician cloud portal for at-home stroke physical therapy.',
      departments: ['Biomedical Engineering', 'Mechanical & Robotics', 'Industrial Design'],
      budget: '$3,800 (BioMed Lab Sponsored)',
    },
  ])

  const [selectedProposal, setSelectedProposal] = useState(null)

  const handleApprove = (id, title, guide) => {
    setPendingList(pendingList.filter((p) => p.id !== id))
    toast.success(`Project "${title}" approved for university capstone registration with guide ${guide || 'Dr. Elena Rostova'}!`)
    setSelectedProposal(null)
  }

  const handleReject = (id, title) => {
    setPendingList(pendingList.filter((p) => p.id !== id))
    toast.warning(`Project "${title}" returned to student with formal revision notes.`)
    setSelectedProposal(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Administration' }, { label: 'Project Moderation' }]} />
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Project Moderation &amp; Guide Assignment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review newly submitted capstone proposals, verify faculty guide eligibility, and enforce university guidelines.
        </p>
      </div>

      <div className="space-y-4">
        {pendingList.length === 0 ? (
          <Card className="p-8 text-center text-slate-400 text-sm">
            All capstone proposals have been moderated. The approval queue is clear.
          </Card>
        ) : (
          pendingList.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="warning" size="sm">Pending Clearance</Badge>
                    <Badge variant="primary" size="sm">{item.domain}</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Proposed By: <strong>{item.owner}</strong> &bull; Requested Guide: <strong>{item.proposedGuide}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProposal(item)}
                    leftIcon={<BookOpen className="w-3.5 h-3.5" />}
                  >
                    Inspect Scope
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(item.id, item.title)}
                    leftIcon={<XCircle className="w-3.5 h-3.5" />}
                  >
                    Return with Revisions
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleApprove(item.id, item.title, item.assignedGuide)}
                    leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  >
                    Approve
                  </Button>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {item.summary}
              </p>
            </Card>
          ))
        )}
      </div>

      {/* Inspect Proposal Modal */}
      {selectedProposal && (
        <Modal
          isOpen={!!selectedProposal}
          onClose={() => setSelectedProposal(null)}
          title="Capstone Proposal Moderation Dossier"
          description={`Submitted by ${selectedProposal.owner}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Primary Research Domain: {selectedProposal.domain}
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedProposal.title}
              </h4>
              <p className="text-slate-500 text-[11px]">Funding Allocation: {selectedProposal.budget}</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Interdisciplinary Departments Involved:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProposal.departments?.map((dept, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Technical Summary &amp; Academic Scope:
              </span>
              <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProposal.summary}
              </p>
            </div>

            <div className="space-y-1.5">
              <Select
                label="Assign / Confirm Faculty Guide"
                value={selectedProposal.assignedGuide}
                onChange={(e) => setSelectedProposal({ ...selectedProposal, assignedGuide: e.target.value })}
                options={[
                  { value: 'Dr. Elena Rostova', label: 'Dr. Elena Rostova (CS & Robotics)' },
                  { value: 'Dr. Tariq Mansoor', label: 'Dr. Tariq Mansoor (Energy Systems)' },
                  { value: 'Dr. Sarah Jenkins', label: 'Dr. Sarah Jenkins (Biomedical Eng)' },
                  { value: 'Prof. Marcus Brody', label: 'Prof. Marcus Brody (Design & UX)' },
                ]}
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleReject(selectedProposal.id, selectedProposal.title)}
                leftIcon={<XCircle className="w-3.5 h-3.5" />}
              >
                Return with Revisions
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedProposal(null)}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleApprove(selectedProposal.id, selectedProposal.title, selectedProposal.assignedGuide)}
                  leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                >
                  Approve Proposal
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
