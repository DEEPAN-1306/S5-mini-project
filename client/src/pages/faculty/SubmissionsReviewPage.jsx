import React, { useState } from 'react'
import { FileCheck2, CheckCircle2, RotateCcw, ExternalLink, Award, FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { useToast } from '../../context/ToastContext'

export const SubmissionsReviewPage = () => {
  const { toast } = useToast()
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub_01',
      projectTitle: 'Autonomous Campus Delivery Bot',
      milestoneTitle: 'Stage 3: SLAM PointCloud & Navigation Stack',
      submitterName: 'Marcus Patel (Perception Lead)',
      submittedDate: 'Mar 15, 2026',
      documentLink: 'https://github.com/capstone-deliveries/rover-nav-stack',
      status: 'pending',
      summary: 'Includes ROS 2 Nav2 trajectory results, real LiDAR bag logs playback, and low-light obstacle avoidance test recordings.',
    },
    {
      id: 'sub_02',
      projectTitle: 'Smart Microgrid Energy Optimization',
      milestoneTitle: 'Stage 2: Sensor Deployment in Campus Hall',
      submitterName: 'Jordan Lee (Team Lead)',
      submittedDate: 'Mar 14, 2026',
      documentLink: 'https://github.com/capstone-microgrid/sensor-gateway',
      status: 'pending',
      summary: 'ESP32 firmware binaries, Modbus RTU interface schematic, and live MQTT power broker data feed.',
    },
  ])

  const [selectedSub, setSelectedSub] = useState(null)
  const [reviewScore, setReviewScore] = useState('94')
  const [reviewNotes, setReviewNotes] = useState('Outstanding sensor fusion telemetry. Ensure fail-safe emergency stop latency is below 50ms.')

  const handleApprove = (e) => {
    e.preventDefault()
    setSubmissions(submissions.map((s) => (s.id === selectedSub.id ? { ...s, status: 'approved' } : s)))
    toast.success(`Milestone approved for ${selectedSub.projectTitle} with score ${reviewScore}/100!`)
    setSelectedSub(null)
  }

  const handleRequestRevision = () => {
    setSubmissions(submissions.map((s) => (s.id === selectedSub.id ? { ...s, status: 'revision-requested' } : s)))
    toast.warning(`Revision requested for ${selectedSub.projectTitle}. Team has been notified.`)
    setSelectedSub(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Milestone Deliverables &amp; Evaluation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review evidence dossiers, grade academic deliverables, and release verified milestone progression.
        </p>
      </div>

      <div className="space-y-4">
        {submissions.map((sub) => (
          <Card key={sub.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={sub.status === 'approved' ? 'success' : sub.status === 'revision-requested' ? 'danger' : 'warning'} size="sm">
                    {sub.status === 'approved' ? 'Approved & Recorded' : sub.status === 'revision-requested' ? 'Revision Needed' : 'Awaiting Review'}
                  </Badge>
                  <span className="text-xs text-slate-400">Submitted {sub.submittedDate}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{sub.milestoneTitle}</h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Project: {sub.projectTitle}</p>
                <p className="text-xs text-slate-400">By {sub.submitterName}</p>
              </div>

              <div className="flex items-center gap-2">
                <a href={sub.documentLink} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    View Repository
                  </Button>
                </a>
                {sub.status === 'pending' ? (
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => {
                      setSelectedSub(sub)
                      setReviewScore('94')
                      setReviewNotes('Outstanding sensor fusion telemetry. Ensure fail-safe emergency stop latency is below 50ms.')
                    }}
                    leftIcon={<FileCheck2 className="w-4 h-4" />}
                  >
                    Grade &amp; Provide Feedback
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSub(sub)
                      setReviewScore(sub.grade || '95')
                      setReviewNotes(sub.notes || 'Verified according to institutional milestone rubric.')
                    }}
                    leftIcon={<FileText className="w-4 h-4" />}
                  >
                    View / Edit Grade
                  </Button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              <strong>Evidence Summary:</strong> {sub.summary}
            </p>
          </Card>
        ))}
      </div>

      {/* Review Modal */}
      {selectedSub && (
        <Modal
          isOpen={!!selectedSub}
          onClose={() => setSelectedSub(null)}
          title={`Evaluate ${selectedSub.milestoneTitle}`}
          description={`Project: ${selectedSub.projectTitle}`}
        >
          <form onSubmit={handleApprove} className="space-y-4">
            <Input
              label="Evaluation Score (0 - 100)"
              type="number"
              min="0"
              max="100"
              value={reviewScore}
              onChange={(e) => setReviewScore(e.target.value)}
              required
            />

            <Textarea
              label="Official Faculty Feedback & Revision Notes"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={4}
              required
            />

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleRequestRevision}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Request Revisions
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedSub(null)}>
                  Cancel
                </Button>
                <Button variant="gradient" size="sm" type="submit" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                  Approve Milestone
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
