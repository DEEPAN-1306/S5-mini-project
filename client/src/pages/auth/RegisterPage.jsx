import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Building, GraduationCap, ArrowRight } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: 'Computer Science & Engineering',
    year: 'Senior (Year 4)',
    skills: 'ROS 2, Python, React',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const departments = [
    { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
    { value: 'Electrical & Computer Engineering', label: 'Electrical & Computer Engineering' },
    { value: 'Mechanical Engineering & Robotics', label: 'Mechanical Engineering & Robotics' },
    { value: 'Data Science & Artificial Intelligence', label: 'Data Science & Artificial Intelligence' },
    { value: 'Biomedical Engineering', label: 'Biomedical Engineering' },
    { value: 'Industrial Design & Human Factors', label: 'Industrial Design & Human Factors' },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please complete all required fields.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    setIsLoading(true)
    try {
      const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
      await register({
        ...formData,
        skills: skillsArray,
      })
      toast.success('Registration successful! Welcome to Capstone Connect.')
      navigate(formData.role === 'faculty' ? '/faculty/dashboard' : '/dashboard')
    } catch (err) {
      toast.error('Registration failed. Please check inputs.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create University Account
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Join the interdisciplinary capstone ecosystem as student or mentor.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. Alex Rivera"
            value={formData.name}
            onChange={handleChange}
            leftIcon={<User className="w-4 h-4" />}
            required
          />

          <Input
            label="Institutional Email"
            type="email"
            name="email"
            placeholder="alex.rivera@university.edu"
            value={formData.email}
            onChange={handleChange}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Academic Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: 'student', label: 'Student Researcher' },
                { value: 'faculty', label: 'Faculty Mentor' },
              ]}
            />

            <Select
              label="Academic Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              options={departments}
            />
          </div>

          <Input
            label="Core Skills / Expertise (comma-separated)"
            name="skills"
            placeholder="e.g. ROS 2, Embedded C++, CAD, PyTorch"
            value={formData.skills}
            onChange={handleChange}
            helperText="Used for explainable mentor matching and team discovery"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full mt-2"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create My Capstone Profile
          </Button>
        </form>
      </Card>

      <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
        Already have an institutional account?{' '}
        <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
          Sign in here &rarr;
        </Link>
      </p>
    </div>
  )
}
