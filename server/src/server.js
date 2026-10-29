
import dns from 'node:dns'

dns.setServers(['8.8.8.8', '1.1.1.1'])

import app from './app.js'
import { env } from './config/env.js'
import { connectDB, disconnectDB } from './config/db.js'

const PORT = env.PORT || 5000

const startServer = async () => {
  // 1. Establish Database Connection
  await connectDB()

  // 2. Start HTTP Listener
  const server = app.listen(PORT, () => {
    console.log('=========================================')
    console.log(' Capstone Connect API Server Active')
    console.log(` Port:        http://localhost:${PORT}`)
    console.log(` Environment: ${env.NODE_ENV}`)
    console.log(` Health:      http://localhost:${PORT}/api/health`)
    console.log('=========================================')
  })

  // 3. Graceful shutdown handler
  const shutdown = async (signal) => {
    console.log(`\n[Process] Received ${signal}. Shutting down gracefully...`)

    server.close(async () => {
      console.log('[Process] HTTP server closed.')
      await disconnectDB()
      process.exit(0)
    })

    setTimeout(() => {
      console.error('[Process] Forced shutdown after timeout.')
      process.exit(1)
    }, 10000)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

startServer().catch((err) => {
  console.error('[Server Error] Fatal startup error:', err)
  process.exit(1)
})
