import React from 'react'
import { FolderSearch } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../utils/cn'

export const EmptyState = ({
  icon: Icon = FolderSearch,
  title = 'No items found',
  description = 'There are no records matching your criteria or you haven\'t created any yet.',
  actionLabel,
  onAction,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white/50 dark:border-slate-800 dark:bg-slate-900/40',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-4 shadow-xs">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
        {title}
      </h3>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400 mb-5">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="gradient" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  )
}
