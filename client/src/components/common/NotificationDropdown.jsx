import React, { useState } from 'react'
import { Bell, CheckCheck, ExternalLink, Sparkles, AlertCircle, FileText, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DEMO_NOTIFICATIONS } from '../../utils/demoData'
import { cn } from '../../utils/cn'

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const getIcon = (type) => {
    switch (type) {
      case 'submission':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      case 'survey':
        return <FileText className="w-4 h-4 text-violet-500" />
      case 'task':
        return <Sparkles className="w-4 h-4 text-indigo-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-amber-500" />
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white p-4 shadow-xl border border-slate-200/90 dark:bg-slate-900 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Notifications
                </h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium dark:text-indigo-400"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="mt-3 max-h-80 overflow-y-auto space-y-2">
              {notifications.length === 0 ? (
                <p className="text-center py-6 text-xs text-slate-400">
                  No notifications
                </p>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    className={cn(
                      'flex items-start gap-3 p-2.5 rounded-xl transition-colors cursor-pointer',
                      item.read
                        ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 opacity-75'
                        : 'bg-indigo-50/50 hover:bg-indigo-50 dark:bg-indigo-950/30 dark:hover:bg-indigo-950/50'
                    )}
                  >
                    <div className="mt-0.5 p-1 rounded-lg bg-white dark:bg-slate-800 shadow-2xs">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {item.message}
                      </p>
                      {item.link && (
                        <Link
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          View detail <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 pt-2 text-center border-t border-slate-100 dark:border-slate-800">
              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                View all notifications &rarr;
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
