import React, { useState } from 'react'
import { Users, Search, Shield, UserCheck, MoreVertical, Edit, Trash2, Plus, UserPlus, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Modal } from '../../components/ui/Modal'
import { Avatar } from '../../components/ui/Avatar'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { useToast } from '../../context/ToastContext'

export const UserManagementPage = () => {
  const { toast } = useToast()
  const [users, setUsers] = useState([
    {
      id: 'u1',
      name: 'Alex Rivera',
      email: 'alex.rivera@university.edu',
      role: 'student',
      department: 'Computer Science & Robotics',
      status: 'active',
      projectsCount: 1,
    },
    {
      id: 'u2',
      name: 'Dr. Elena Rostova',
      email: 'elena.rostova@university.edu',
      role: 'faculty',
      department: 'Computer Science & Robotics',
      status: 'active',
      projectsCount: 3,
    },
    {
      id: 'u3',
      name: 'Samantha Chen',
      email: 'samantha.chen@university.edu',
      role: 'student',
      department: 'Electrical Engineering',
      status: 'active',
      projectsCount: 1,
    },
    {
      id: 'u4',
      name: 'Dr. Tariq Mansoor',
      email: 'tariq.mansoor@university.edu',
      role: 'faculty',
      department: 'Energy Systems',
      status: 'active',
      projectsCount: 3,
    },
    {
      id: 'u5',
      name: 'Dean Arthur Vance',
      email: 'admin.vance@university.edu',
      role: 'admin',
      department: 'Academic Affairs',
      status: 'active',
      projectsCount: 86,
    },
  ])

  const [search, setSearch] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    department: 'Computer Science & Robotics',
  })

  const handleToggleStatus = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u)))
    toast.info('User status updated')
  }

  const handleDeleteUser = (id, name) => {
    setUsers(users.filter((u) => u.id !== id))
    toast.info(`Account for ${name} removed from registry.`)
  }

  const handleCreateUser = (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.email) {
      toast.error('Please enter name and institutional email')
      return
    }

    const created = {
      id: 'u_' + Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: 'active',
      projectsCount: 0,
    }

    setUsers([created, ...users])
    setIsAddModalOpen(false)
    setNewUser({ name: '', email: '', role: 'student', department: 'Computer Science & Robotics' })
    toast.success(`User ${created.name} registered successfully with ${created.role.toUpperCase()} privileges!`)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
    toast.success(`User details for ${editingUser.name} updated.`)
    setEditingUser(null)
  }

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.department.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Administration' }, { label: 'User Management' }]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            User Directory &amp; Role Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review enrolled university accounts, verify faculty affiliations, and enforce academic governance.
          </p>
        </div>
        <Button
          variant="gradient"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Add New User
        </Button>
      </div>

      <Card className="p-4">
        <Input
          placeholder="Search by student or faculty name, email, department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Active Projects</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{u.name}</p>
                        <p className="text-slate-400 text-[11px]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'faculty' ? 'violet' : 'primary'} size="sm">
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{u.department}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-bold">{u.projectsCount}</td>
                  <td className="p-4">
                    <Badge variant={u.status === 'active' ? 'success' : 'danger'} size="sm" dot>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingUser(u)}
                        title="Edit User"
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(u.id)}
                        className="text-xs px-2.5 h-8"
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(u.id, u.name)}
                        title="Delete User"
                        className="h-8 w-8 p-0 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal: Add New User */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register University User"
          description="Provision a new student, faculty advisor, or institutional administrator account."
        >
          <form onSubmit={handleCreateUser} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Dr. Arthur Pendelton"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />

            <Input
              label="Institutional Email"
              type="email"
              placeholder="a.pendelton@university.edu"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Assigned System Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'faculty', label: 'Faculty Mentor' },
                  { value: 'admin', label: 'Administrator' },
                ]}
              />

              <Select
                label="Department"
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                options={[
                  { value: 'Computer Science & Robotics', label: 'Computer Science & Robotics' },
                  { value: 'Electrical & Computer Engineering', label: 'Electrical & Computer Engineering' },
                  { value: 'Energy Systems', label: 'Energy Systems' },
                  { value: 'Biomedical Engineering', label: 'Biomedical Engineering' },
                  { value: 'Academic Affairs', label: 'Academic Affairs' },
                ]}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" size="sm" type="submit" leftIcon={<UserPlus className="w-4 h-4" />}>
                Register Account
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Edit User */}
      {editingUser && (
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title={`Edit User: ${editingUser.name}`}
          description="Update role privileges and department affiliation."
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <Input
              label="Full Name"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              required
            />

            <Input
              label="Email"
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Role"
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'faculty', label: 'Faculty' },
                  { value: 'admin', label: 'Administrator' },
                ]}
              />

              <Input
                label="Department"
                value={editingUser.department}
                onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button variant="gradient" size="sm" type="submit" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
