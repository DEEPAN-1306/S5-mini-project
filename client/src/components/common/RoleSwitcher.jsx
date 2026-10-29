import React from 'react'
import { GraduationCap, Award, ShieldAlert } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { cn } from '../../utils/cn'

export const RoleSwitcher = ({ className }) => {
  const { role, switchRole } = useAuth()
  const { toast } = useToast()

  const handleSwitch = (newRole) => {
    switchRole(newRole)
    const roleLabels = {
      student: 'Student (Alex Rivera)',
      faculty: 'Faculty Guide (Dr. Elena Rostova)',
      admin: 'Administrator (Dean Arthur Vance)',
    }
    toast.info(`Switched active view to ${roleLabels[newRole]}`, 'Perspective Changed')
  }

  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-indigo-600' },
    { id: 'faculty', label: 'Faculty', icon: Award, color: 'text-violet-600' },
    { id: 'admin', label: 'Admin', icon: ShieldAlert, color: 'text-rose-600' },
  ]

  return (
    <div className={cn('flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800 text-xs font-semibold', className)}>
      <span className="hidden lg:inline text-slate-400 px-2 uppercase text-[10px] tracking-wider">Role View:</span>
      {roles.map((r) => {
        const Icon = r.icon
        const isActive = role === r.id
        return (
          <button
            key={r.id}
            onClick={() => handleSwitch(r.id)}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all',
              isActive
                ? 'bg-white shadow-xs text-slate-900 font-bold dark:bg-slate-700 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            )}
            title={`Preview as ${r.label}`}
          >
            <Icon className={cn('w-3.5 h-3.5', isActive ? r.color : 'text-slate-400')} />
            <span>{r.label}</span>
          </button>
        )
      })}
    </div>
  )
}
