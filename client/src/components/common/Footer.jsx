import React from 'react'
import { Sparkles, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span>
            <strong className="text-slate-800 dark:text-slate-200">Capstone Connect</strong> &mdash; Dynamic Multi-Disciplinary Capstone Ecosystem
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            How It Works
          </Link>
          <Link to="/features" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Platform Capabilities
          </Link>
          <Link to="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Public Project Directory
          </Link>
          <span>&copy; {new Date().getFullYear()} University Academic Affairs</span>
        </div>
      </div>
    </footer>
  )
}
