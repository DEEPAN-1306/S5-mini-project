import React, { createContext, useContext, useState, useEffect } from 'react'
import { DEMO_USERS } from '../utils/demoData'

const AuthContext = createContext({
  user: null,
  role: 'student',
  token: null,
  isAuthenticated: true,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  switchRole: () => {},
  updateProfile: () => {},
})

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('capstone_active_role') || 'student'
  })
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('capstone_user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch (e) {
        // fallback
      }
    }
    return DEMO_USERS[role] || DEMO_USERS.student
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('capstone_token') || 'demo_token_authenticated'
  })

  const [isLoading, setIsLoading] = useState(false)

  // Persist role change
  useEffect(() => {
    localStorage.setItem('capstone_active_role', role)
  }, [role])

  // Switch role helper (enables instant testing of student, faculty, and admin workflows)
  const switchRole = (newRole) => {
    if (DEMO_USERS[newRole]) {
      setRole(newRole)
      setUser(DEMO_USERS[newRole])
      localStorage.setItem('capstone_active_role', newRole)
      localStorage.setItem('capstone_user', JSON.stringify(DEMO_USERS[newRole]))
    }
  }

  const login = async (email, password, desiredRole) => {
    setIsLoading(true)
    try {
      // In development / demo, match role by email or select corresponding profile
      const detectedRole = desiredRole || (email.includes('faculty') ? 'faculty' : email.includes('admin') ? 'admin' : 'student')
      const targetUser = DEMO_USERS[detectedRole] || DEMO_USERS.student
      
      setUser(targetUser)
      setRole(targetUser.role)
      setToken('demo_token_' + Date.now())
      localStorage.setItem('capstone_token', 'demo_token_' + Date.now())
      localStorage.setItem('capstone_user', JSON.stringify(targetUser))
      localStorage.setItem('capstone_active_role', targetUser.role)
      return { success: true, user: targetUser }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    setIsLoading(true)
    try {
      const newUser = {
        id: 'usr_' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        department: userData.department || 'Computer Science',
        year: userData.year || 'Senior',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        skills: userData.skills || [],
        interests: userData.interests || [],
        earnedPoints: 100,
        bio: userData.bio || 'New student joining Capstone Connect.',
        activeProjectsCount: 0,
        completedTasksCount: 0,
        pendingTasksCount: 0,
      }
      setUser(newUser)
      setRole(newUser.role)
      setToken('demo_token_' + Date.now())
      localStorage.setItem('capstone_token', 'demo_token_' + Date.now())
      localStorage.setItem('capstone_user', JSON.stringify(newUser))
      localStorage.setItem('capstone_active_role', newUser.role)
      return { success: true, user: newUser }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('capstone_token')
    localStorage.removeItem('capstone_user')
  }

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields }
      localStorage.setItem('capstone_user', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user: user || DEMO_USERS[role] || DEMO_USERS.student,
        role,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
