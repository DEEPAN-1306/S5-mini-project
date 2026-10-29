import React, { useState } from 'react'
import { ClipboardList, Star, CheckCircle2, Clock, FileText, Send, Check, Eye } from 'lucide-react'
import { DEMO_SURVEYS } from '../../utils/demoData'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Textarea } from '../../components/ui/Textarea'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { DemoDataNotice } from '../../components/common/DemoDataNotice'
import { useToast } from '../../context/ToastContext'

export const SurveysPage = () => {
  const [surveys, setSurveys] = useState(() => {
    const saved = localStorage.getItem('capstone_surveys')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {}
    }
    return DEMO_SURVEYS
  })
  const [activeSurvey, setActiveSurvey] = useState(null)
  const [answers, setAnswers] = useState({
    q1: 5,
    q2: 5,
    q3: 'Hardware component delivery delays',
    q4: 'We need access to the robotics lab over the upcoming weekend for chassis waterproofing trials.',
  })
  const { toast } = useToast()

  const handleOpenSurvey = (survey) => {
    setActiveSurvey(survey)
  }

  const handleSubmitSurvey = (e) => {
    e.preventDefault()
    const updated = surveys.map((s) =>
      s.id === activeSurvey.id
        ? {
            ...s,
            status: 'completed',
            submittedAt: 'Just now',
            submittedResponses: { ...answers },
          }
        : s
    )
    setSurveys(updated)
    localStorage.setItem('capstone_surveys', JSON.stringify(updated))
    toast.success('Survey response submitted to academic committee. Thank you!')
    setActiveSurvey(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Evaluations' }, { label: 'Surveys & Feedback' }]} />

      <DemoDataNotice label="Academic Survey Module" />

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Academic Surveys &amp; Peer Evaluations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Complete mandatory milestone checkpoints, mentor guidance ratings, and multidisciplinary team health assessments.
        </p>
      </div>

      <div className="space-y-4">
        {surveys.map((survey) => (
          <Card key={survey.id} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={survey.status === 'pending' ? 'violet' : 'success'} size="sm">
                    {survey.status === 'pending' ? 'Pending Completion' : 'Completed'}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {survey.status === 'pending' ? `Deadline: ${survey.deadline}` : `Submitted on ${survey.submittedAt || 'Feb 07, 2026'}`}
                  </span>
                  {survey.isAnonymous && <Badge variant="neutral" size="sm">Anonymous</Badge>}
                </div>

                <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  {survey.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">{survey.description}</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-semibold">
                  Project: {survey.projectName}
                </p>
              </div>

              <div>
                <Button
                  variant={survey.status === 'pending' ? 'gradient' : 'outline'}
                  size="sm"
                  onClick={() => handleOpenSurvey(survey)}
                  leftIcon={survey.status === 'pending' ? <ClipboardList className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                >
                  {survey.status === 'pending' ? 'Start Survey' : 'View Submitted Responses'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Survey Questionnaire Modal */}
      {activeSurvey && (
        <Modal
          isOpen={!!activeSurvey}
          onClose={() => setActiveSurvey(null)}
          title={activeSurvey.title}
          description={`Project: ${activeSurvey.projectName} • Academic Milestone Review`}
          maxWidth="max-w-2xl"
        >
          {activeSurvey.status === 'completed' ? (
            /* Completed Survey Inspection View */
            <div className="space-y-4 text-xs mt-3">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Submission Recorded &bull; {activeSurvey.submittedAt || 'Feb 07, 2026'}</span>
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  Your academic feedback has been verified and incorporated into the semester capstone quality index.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Team Multidisciplinary Coordination</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">5.0 / 5.0 ★★★★★</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">&quot;Exceptional multidisciplinary task balance across engineering and design.&quot;</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Faculty Mentorship Accessibility</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">5.0 / 5.0 ★★★★★</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">&quot;Dr. Rostova provided timely code reviews and laboratory hardware guidance.&quot;</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Identified Critical Path Blockers</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">Hardware component delivery delays (Custom battery casing)</p>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setActiveSurvey(null)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            /* Pending Survey Questionnaire View */
            <form onSubmit={handleSubmitSurvey} className="space-y-6 mt-4">
              {activeSurvey.questions?.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    Question {idx + 1} ({q.type})
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {q.question}
                  </p>

                  {q.type === 'rating' && (
                    <div className="flex items-center gap-3 pt-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setAnswers({ ...answers, [q.id]: num })}
                          className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                            answers[q.id] === num
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                          }`}
                        >
                          {num} ★
                        </button>
                      ))}
                      <span className="text-xs text-slate-400 ml-2">
                        {answers[q.id] === 5 ? 'Exceptional' : answers[q.id] === 1 ? 'Poor' : 'Satisfactory'}
                      </span>
                    </div>
                  )}

                  {q.type === 'multiple-choice' && (
                    <div className="space-y-2 pt-2">
                      {q.options?.map((opt, i) => (
                        <label key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                          <input
                            type="radio"
                            name={q.id}
                            checked={answers[q.id] === opt}
                            onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'text' && (
                    <Textarea
                      placeholder="Provide constructive, specific reflections..."
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                      rows={3}
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setActiveSurvey(null)}>
                  Close
                </Button>
                <Button variant="gradient" size="sm" type="submit" leftIcon={<Send className="w-4 h-4" />}>
                  Submit Official Feedback
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  )
}
