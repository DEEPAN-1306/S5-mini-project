import { Router } from 'express'
import healthRoutes from './health.routes.js'

const apiRouter = Router()

// Mount health routes
apiRouter.use('/', healthRoutes)

// Placeholders for subsequent phases (auth, users, projects, applications, tasks, milestones, etc.)
apiRouter.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Capstone Connect API',
    documentation: '/api/docs',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      projects: '/api/projects',
      mentors: '/api/mentors',
      tasks: '/api/tasks',
      surveys: '/api/surveys',
      notifications: '/api/notifications',
      admin: '/api/admin',
    },
  })
})

export default apiRouter
