import React from 'react'
import { cn } from '../../utils/cn'

export const Tabs = ({ tabs = [], activeTab, onChange, className }) => {
  return (
    <div className={cn('border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar', className)}>
      <nav className="-mb-px flex space-x-6 min-w-max" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'group inline-flex items-center gap-2 border-b-2 py-3 px-1 text-sm font-semibold transition-colors duration-150',
                isActive
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-300'
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    'h-4 w-4',
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-500 dark:text-slate-500'
                  )}
                />
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'ml-1.5 rounded-full px-2 py-0.5 text-xs font-bold',
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
