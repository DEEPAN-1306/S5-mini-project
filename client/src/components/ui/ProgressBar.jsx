import React from 'react'
import { cn } from '../../utils/cn'

export const ProgressBar = ({
  value = 0,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  label,
  size = 'md',
  color = 'indigo',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)))

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const colors = {
    indigo: 'bg-indigo-600',
    violet: 'bg-violet-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    gradient: 'gradient-accent',
  }

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800', sizes[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colors[color] || colors.indigo,
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
