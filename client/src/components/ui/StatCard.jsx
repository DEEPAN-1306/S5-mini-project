import React from 'react'
import { Card } from './Card'
import { cn } from '../../utils/cn'

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'neutral',
  color = 'indigo',
  className,
}) => {
  const iconColors = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
  }

  const trendColors = {
    positive: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400',
    negative: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400',
    neutral: 'text-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-400',
  }

  return (
    <Card hover className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h4 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
          </h4>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs', iconColors[color] || iconColors.indigo)}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className={cn('inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-semibold', trendColors[trendType])}>
            {trend}
          </span>
          <span className="text-xs text-slate-400">vs last milestone</span>
        </div>
      )}
    </Card>
  )
}
