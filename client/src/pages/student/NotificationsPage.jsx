import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, CheckCheck, Trash2, ExternalLink, Sparkles, AlertCircle, FileCheck2 } from 'lucide-react'
import { DEMO_NOTIFICATIONS } from '../../utils/demoData'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS)
  const { toast } = useToast()

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }

  const clearAll = () => {
    setNotifications([])
    toast.info('Notifications cleared')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Notifications &amp; Activity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Stay updated with milestone reviews, task assignments, and mentorship communications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead} leftIcon={<CheckCheck className="w-3.5 h-3.5" />}>
            Mark All Read
          </Button>
          <Button variant="danger" size="sm" onClick={clearAll} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="p-8 text-center text-slate-400 text-sm">
            You have no notifications at this time.
          </Card>
        ) : (
          notifications.map((item) => (
            <Card
              key={item.id}
              className={`p-4 transition-all ${
                !item.read ? 'border-l-4 border-l-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    {!item.read && <Badge variant="primary" size="sm">New</Badge>}
                    <span className="text-xs text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {item.link && (
                  <Link to={item.link}>
                    <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      View
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
