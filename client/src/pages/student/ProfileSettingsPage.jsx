import React, { useState } from 'react'
import { User, Mail, Building, GraduationCap, Lock, Award, Save, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'

export const ProfileSettingsPage = () => {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || 'ROS 2, Python, C++, PyTorch, Path Planning',
    interests: user?.interests?.join(', ') || 'Autonomous Systems, Robotics, Edge Computing',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleProfileSave = (e) => {
    e.preventDefault()
    updateProfile({
      name: formData.name,
      department: formData.department,
      bio: formData.bio,
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      interests: formData.interests.split(',').map((s) => s.trim()).filter(Boolean),
    })
    toast.success('Profile and skill taxonomy updated successfully!')
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Please fill in current and new password fields')
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    toast.success('Password changed securely')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Account' }, { label: 'Profile & Settings' }]} />
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Profile &amp; Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your university academic identity, technical skills, and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left col: Profile summary card */}
        <Card className="p-6 text-center space-y-4 h-fit">
          <div className="flex justify-center">
            <Avatar src={user?.avatar} name={user?.name} size="xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user?.name}</h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{user?.department}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <div className="pt-2 flex justify-center gap-2">
            <Badge variant="primary" size="md">
              <Award className="w-3.5 h-3.5 mr-1" />
              {user?.earnedPoints || 840} Points
            </Badge>
            <Badge variant="neutral" size="md">
              Senior (Year 4)
            </Badge>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
            {formData.bio || 'Senior student pursuing interdisciplinary capstone research.'}
          </p>
        </Card>

        {/* Right 2 cols: Edit details & Security forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle>Academic &amp; Skill Information</CardTitle>
            </CardHeader>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  leftIcon={<User className="w-4 h-4" />}
                  required
                />
                <Input
                  label="University Email"
                  value={formData.email}
                  disabled
                  leftIcon={<Mail className="w-4 h-4" />}
                  helperText="Managed by university single sign-on"
                />
              </div>

              <Input
                label="Department / Faculty"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                leftIcon={<Building className="w-4 h-4" />}
                required
              />

              <Input
                label="Verified Technical Skills (comma-separated)"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                helperText="Crucial for mentor matching and interdisciplinary project discovery"
              />

              <Input
                label="Research Interests &amp; Domains"
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              />

              <Textarea
                label="Biography / Statement"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />

              <div className="flex justify-end pt-2">
                <Button variant="gradient" size="sm" type="submit" leftIcon={<Save className="w-4 h-4" />}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </Card>

          {/* Change Password */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle>Security &amp; Password</CardTitle>
            </CardHeader>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••••••"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                leftIcon={<Lock className="w-4 h-4" />}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" type="submit">
                  Update Password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
