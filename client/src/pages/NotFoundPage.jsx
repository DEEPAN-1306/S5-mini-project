import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-2 text-sm text-slate-500 max-w-md">
        The academic resource or capstone workspace you requested could not be located.
      </p>
      <div className="mt-6">
        <Link to="/dashboard">
          <Button variant="gradient" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
