import React from 'react'
import { Info, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'

export const DemoDataNotice = ({ className, label = 'Development & Demonstration Environment' }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border border-indigo-200/80 bg-indigo-50/60 text-indigo-900 dark:border-indigo-900/50 dark:bg-indigo-950/30 dark:text-indigo-200 text-[11px] font-medium transition-all mb-4',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
        <span className="font-bold">{label}:</span>
        <span className="text-slate-600 dark:text-slate-300">
          Populated with realistic university capstone demo records. All calculations derived dynamically.
        </span>
      </div>
      <span className="hidden md:inline-block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
        Interactive Demo Mode
      </span>
    </div>
  )
}

export default DemoDataNotice
