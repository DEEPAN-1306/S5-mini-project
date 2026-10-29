import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { env } from './config/env.js'
import apiRouter from './routes/index.js'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'

const app = express()

// 1. CORS Configuration
const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || env.NODE_ENV === 'development') {
        return callback(null, true)
      }
      return callback(new Error('CORS policy: This origin is not allowed'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
)

// 2. Body parsers
app.use(express.json({ limit: `${env.MAX_FILE_SIZE_MB}mb` }))
app.use(express.urlencoded({ extended: true, limit: `${env.MAX_FILE_SIZE_MB}mb` }))

// 3. HTTP Request logger
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// 4. API Routes
app.use('/api', apiRouter)

// 5. Root Ping
app.get('/', (req, res) => {
  res.redirect('/api/health')
})

// 6. Centralized 404 & Error Handling
app.use(notFoundHandler)
app.use(errorHandler)

export default app
