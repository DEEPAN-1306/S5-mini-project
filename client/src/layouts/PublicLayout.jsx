import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Sparkles, Sun, Moon, ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { Button } from '../components/ui/Button'
import { Footer } from '../components/common/Footer'
import { ToastContainer } from '../components/common/ToastContainer'

export const PublicLayout = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Capstone<span className="text-indigo-600 dark:text-indigo-400">Connect</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                University Portal
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link to="/features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </Link>
            <Link to="/how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </Link>
            <Link to="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Explore Projects
            </Link>
            <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Live Workspace Demo
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Join Platform
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer />
    </div>
  )
}
