import React from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { cn } from '../../utils/cn'

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
  }

  const borderColors = {
    success: 'border-l-emerald-500',
    warning: 'border-l-amber-500',
    error: 'border-l-rose-500',
    info: 'border-l-indigo-500',
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white shadow-xl border border-slate-200/80 border-l-4 transition-all duration-300 animate-in slide-in-from-bottom-2',
            'dark:bg-slate-900 dark:border-slate-800',
            borderColors[t.type] || borderColors.info
          )}
        >
          {icons[t.type] || icons.info}
          <div className="flex-1 min-w-0">
            {t.title && (
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                {t.title}
              </h5>
            )}
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 break-words">
              {t.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
