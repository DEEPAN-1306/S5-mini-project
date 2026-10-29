import { Router } from 'express'
import { isDBConnected } from '../config/db.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { env } from '../config/env.js'

const router = Router()

router.get('/health', (req, res) => {
  const dbStatus = isDBConnected() ? 'connected' : 'disconnected'
  const memoryUsage = process.memoryUsage()

  const healthData = {
    status: 'healthy',
    service: 'Capstone Connect API',
    version: '1.0.0',
    environment: env.NODE_ENV,
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      isHealthy: isDBConnected(),
    },
    system: {
      heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
    },
    timestamp: new Date().toISOString(),
  }

  return ApiResponse.success(res, healthData, 'API Service is operational')
})

export default router
