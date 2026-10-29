import React from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderGit2,
  Compass,
  CheckSquare,
  Users2,
  GitPullRequest,
  ClipboardList,
  UserCheck,
  Award,
  ShieldCheck,
  Settings,
  BarChart3,
  LogOut,
  Sparkles,
  KanbanSquare,
  FileCheck2,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { cn } from '../../utils/cn'

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, role, logout } = useAuth()
  const location = useLocation()

  const studentLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/my-projects', label: 'My Projects', icon: FolderGit2, badge: '1' },
    { to: '/projects', label: 'Discover Projects', icon: Compass },
    { to: '/projects/proj_01', label: 'Project Tracker', icon: KanbanSquare, highlight: true },
    { to: '/tasks', label: 'My Tasks', icon: CheckSquare, badge: '4' },
    { to: '/mentors', label: 'Find Mentors', icon: Users2 },
    { to: '/mentorship-requests', label: 'Mentorship Requests', icon: GitPullRequest },
    { to: '/surveys', label: 'Surveys & Feedback', icon: ClipboardList, badge: '1' },
    { to: '/profile', label: 'Profile & Skills', icon: UserCheck },
  ]

  const facultyLinks = [
    { to: '/faculty/dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
    { to: '/faculty/assigned-projects', label: 'Supervised Projects', icon: FolderGit2, badge: '3' },
    { to: '/projects/proj_01', label: 'Project Tracker', icon: KanbanSquare, highlight: true },
    { to: '/faculty/submissions', label: 'Milestone Reviews', icon: FileCheck2, badge: '3' },
    { to: '/faculty/mentorship-requests', label: 'Mentorship Inquiries', icon: GitPullRequest, badge: '2' },
    { to: '/profile', label: 'Availability & Lab', icon: UserCheck },
  ]

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'User Directory', icon: Users2 },
    { to: '/admin/projects', label: 'Project Moderation', icon: FolderGit2 },
    { to: '/admin/analytics', label: 'University Analytics', icon: BarChart3 },
    { to: '/admin/settings', label: 'Platform Settings', icon: Settings },
  ]

  const currentLinks = role === 'faculty' ? facultyLinks : role === 'admin' ? adminLinks : studentLinks

  const roleLabels = {
    student: 'Student Researcher',
    faculty: 'Faculty Mentor',
    admin: 'Dean / Administrator',
  }

  const roleBadges = {
    student: 'primary',
    faculty: 'violet',
    admin: 'danger',
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-white border-r border-slate-200/80 transition-transform duration-300 ease-in-out dark:bg-slate-900 dark:border-slate-800 lg:static lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 h-18 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <Link to="/" className="flex items-center">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                Capstone<span className="text-indigo-600 dark:text-indigo-400">Connect</span>
              </span>
            </Link>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              University Ecosystem
            </p>
          </div>
        </div>

        {/* Role Indicator Banner */}
        <div className="px-5 py-3 mx-3 my-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Active View:</span>
          <Badge variant={roleBadges[role]} size="sm">
            {roleLabels[role]}
          </Badge>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {currentLinks.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30 font-bold dark:bg-indigo-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/80',
                    item.highlight && !location.pathname.includes(item.to) && 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
                  )
                }
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className="ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* User Profile Pill & Logout */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar src={user?.avatar} name={user?.name} size="sm" status="online" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {user?.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.department || user?.title || user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
