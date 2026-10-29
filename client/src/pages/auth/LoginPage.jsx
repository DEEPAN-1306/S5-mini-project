import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, UserCheck, ShieldCheck, Award } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('student')
  const [isLoading, setIsLoading] = useState(false)
  const { login, switchRole } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter both your university email and password')
      return
    }

    setIsLoading(true)
    try {
      await login(email, password, selectedRole)
      toast.success(`Welcome back! Logged in as ${selectedRole}`)
      
      if (selectedRole === 'faculty') {
        navigate('/faculty/dashboard')
      } else if (selectedRole === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      toast.error('Failed to authenticate credentials. Check email and password.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickDemo = (role) => {
    switchRole(role)
    toast.success(`Loaded demo session for ${role.toUpperCase()}`)
    if (role === 'faculty') navigate('/faculty/dashboard')
    else if (role === 'admin') navigate('/admin/dashboard')
    else navigate('/dashboard')
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sign In to Capstone Connect
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Enter your university credentials to access projects and teams.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="University Email"
            type="email"
            placeholder="student@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" defaultChecked />
              <span>Remember session</span>
            </label>
            <button
              type="button"
              onClick={() => toast.info('Password reset instructions sent to university email if registered.')}
              className="text-indigo-600 hover:text-indigo-700 font-semibold dark:text-indigo-400"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to Workspace
          </Button>
        </form>

        {/* 1-Click Fast Demo Accounts */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 text-center">
            Instant Demo Account Sign-In
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/60 dark:border-indigo-900/60 dark:bg-indigo-950/40 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 transition-all"
            >
              <UserCheck className="w-4 h-4 mb-1 text-indigo-600" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('faculty')}
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-violet-200 bg-violet-50/50 hover:bg-violet-100/60 dark:border-violet-900/60 dark:bg-violet-950/40 text-[11px] font-bold text-violet-700 dark:text-violet-300 transition-all"
            >
              <Award className="w-4 h-4 mb-1 text-violet-600" />
              <span>Faculty</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 dark:border-rose-900/60 dark:bg-rose-950/40 text-[11px] font-bold text-rose-700 dark:text-rose-300 transition-all"
            >
              <ShieldCheck className="w-4 h-4 mb-1 text-rose-600" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </Card>

      <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Don&apos;t have an institutional account yet?{' '}
        <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
          Create student account &rarr;
        </Link>
      </p>
    </div>
  )
}
