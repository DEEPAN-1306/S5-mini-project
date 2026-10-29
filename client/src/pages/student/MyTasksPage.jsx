import React, { useState } from 'react'
import { CheckSquare, Plus, Filter, Calendar, Clock, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Modal } from '../../components/ui/Modal'
import { DEMO_PROJECTS } from '../../utils/demoData'
import { useToast } from '../../context/ToastContext'

export const MyTasksPage = () => {
  const [tasks, setTasks] = useState(DEMO_PROJECTS[0].tasks || [])
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('medium')
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-04-15')
  const { toast } = useToast()

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter === 'all') return true
    return t.status === statusFilter
  })

  const handleUpdateStatus = (taskId, newStatus) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)))
    toast.info(`Task status updated to ${newStatus}`)
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTaskTitle) return
    const created = {
      id: 'task_' + Date.now(),
      title: newTaskTitle,
      assignee: 'Alex Rivera',
      priority: newTaskPriority,
      status: 'todo',
      dueDate: newTaskDueDate,
    }
    setTasks([created, ...tasks])
    setIsAddModalOpen(false)
    setNewTaskTitle('')
    toast.success('Task added to your personal queue')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Action Items &amp; Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track individual engineering tasks, code checkpoints, and review submissions.
          </p>
        </div>
        <Button
          variant="gradient"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create Task
        </Button>
      </div>

      {/* Filter bar */}
      <Card className="p-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['all', 'todo', 'in-progress', 'review', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((t) => (
          <Card key={t.id} hover className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full shrink-0 ${
                  t.status === 'completed'
                    ? 'bg-emerald-500'
                    : t.status === 'in-progress'
                    ? 'bg-indigo-600 animate-pulse'
                    : 'bg-amber-500'
                }`}
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Due: <strong>{t.dueDate}</strong> &bull; Assigned to: {t.assignee}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant={t.priority === 'urgent' ? 'danger' : t.priority === 'high' ? 'warning' : 'primary'}
                size="sm"
              >
                {t.priority}
              </Badge>

              <select
                value={t.status}
                onChange={(e) => handleUpdateStatus(t.id, e.target.value)}
                className="text-xs rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal: Add Task */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Task to Queue"
        description="Create an actionable milestone task for yourself or a teammate."
      >
        <form onSubmit={handleAddTask} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="e.g. Write ROS 2 launch file for real camera pipeline"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Priority Level"
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              options={[
                { value: 'urgent', label: 'Urgent' },
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />

            <Input
              label="Due Date"
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit">
              Save Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
