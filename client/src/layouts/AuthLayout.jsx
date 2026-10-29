import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Sparkles, CheckCircle2, Shield, Users } from 'lucide-react'
import { ToastContainer } from '../components/common/ToastContainer'

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Left side: university branding hero showcase */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
        {/* Glow circle background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Capstone<span className="text-indigo-400">Connect</span>
              </span>
              <p className="text-xs uppercase font-semibold tracking-wider text-indigo-300">
                University Academic Ecosystem
              </p>
            </div>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Official Academic Collaboration Platform
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Build together. Learn from mentors. Turn ideas into impact.
          </h2>
          <p className="text-indigo-200/90 text-sm leading-relaxed">
            Form multidisciplinary capstone teams across Computer Science, Electrical Engineering, Data Science, and Design with explainable mentor matching and transparent project tracking.
          </p>

          <div className="space-y-3 pt-4 border-t border-indigo-800/60">
            <div className="flex items-center gap-3 text-xs text-indigo-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-department student team discovery & join requests</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-indigo-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Milestone tracking, weighted progress & contribution indicators</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-indigo-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Explainable mentor compatibility scoring & academic surveys</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-indigo-400/80">
          Academic portal governed by Institutional Academic Affairs &copy; {new Date().getFullYear()}
        </div>
      </div>

      {/* Right side: Authentication Form card */}
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:px-12 py-10">
        <div className="mx-auto w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
