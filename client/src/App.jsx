import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'

// Layouts
import { MainLayout } from './layouts/MainLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { AuthLayout } from './layouts/AuthLayout'

// Public Pages
import { LandingPage } from './pages/public/LandingPage'
import { FeaturesPage } from './pages/public/FeaturesPage'
import { HowItWorksPage } from './pages/public/HowItWorksPage'

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard'
import { MyProjectsPage } from './pages/student/MyProjectsPage'
import { ProjectDiscoveryPage } from './pages/student/ProjectDiscoveryPage'
import { ProjectTrackerWorkspace } from './pages/student/ProjectTrackerWorkspace'
import { MyTasksPage } from './pages/student/MyTasksPage'
import { MentorDiscoveryPage } from './pages/student/MentorDiscoveryPage'
import { MentorshipRequestsPage } from './pages/student/MentorshipRequestsPage'
import { SurveysPage } from './pages/student/SurveysPage'
import { NotificationsPage } from './pages/student/NotificationsPage'
import { ProfileSettingsPage } from './pages/student/ProfileSettingsPage'

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard'
import { AssignedProjectsPage } from './pages/faculty/AssignedProjectsPage'
import { SubmissionsReviewPage } from './pages/faculty/SubmissionsReviewPage'

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { UserManagementPage } from './pages/admin/UserManagementPage'
import { ProjectModerationPage } from './pages/admin/ProjectModerationPage'
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage'
import { PlatformSettingsPage } from './pages/admin/PlatformSettingsPage'

// 404
import { NotFoundPage } from './pages/NotFoundPage'
import { ErrorBoundary } from './components/common/ErrorBoundary'

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
              {/* Public Marketing & Discovery Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
              </Route>

              {/* Authentication Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Main Authenticated Application Shell */}
              <Route element={<MainLayout />}>
                {/* Student Core Workspaces */}
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/my-projects" element={<MyProjectsPage />} />
                <Route path="/projects" element={<ProjectDiscoveryPage />} />
                <Route path="/projects/:id" element={<ProjectTrackerWorkspace />} />
                <Route path="/tasks" element={<MyTasksPage />} />
                <Route path="/mentors" element={<MentorDiscoveryPage />} />
                <Route path="/mentorship-requests" element={<MentorshipRequestsPage />} />
                <Route path="/surveys" element={<SurveysPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/profile" element={<ProfileSettingsPage />} />

                {/* Faculty Specific Workspaces */}
                <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
                <Route path="/faculty/assigned-projects" element={<AssignedProjectsPage />} />
                <Route path="/faculty/submissions" element={<SubmissionsReviewPage />} />
                <Route path="/faculty/mentorship-requests" element={<MentorshipRequestsPage />} />

                {/* Admin Specific Workspaces */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
                <Route path="/admin/projects" element={<ProjectModerationPage />} />
                <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                <Route path="/admin/settings" element={<PlatformSettingsPage />} />

                {/* 404 Page inside shell */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </ErrorBoundary>
  )
}

export default App
