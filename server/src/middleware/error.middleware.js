import { ZodError } from 'zod'
import { ApiError } from '../utils/apiError.js'
import { env } from '../config/env.js'

export const errorHandler = (err, req, res, next) => {
  let error = err

  // 1. Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }))
    error = new ApiError(400, 'Validation Error: Invalid input data', formattedErrors)
  }

  // 2. Handle Mongoose Bad ObjectId (CastError)
  else if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ApiError(400, message)
  }

  // 3. Handle Mongoose Duplicate Key (11000)
  else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    const message = `Duplicate value entered for ${field}. It must be unique.`
    error = new ApiError(409, message)
  }

  // 4. Handle Mongoose Validation Error
  else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {})
      .map((val) => val.message)
      .join(', ')
    error = new ApiError(400, message)
  }

  // 5. Handle JWT Errors
  else if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid authentication token. Please sign in again.')
  } else if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Authentication token has expired. Please sign in again.')
  }

  // 6. Generic/Fallback Error
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Internal Server Error'
    error = new ApiError(statusCode, message, [], err.stack)
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(env.NODE_ENV === 'development' && { stack: error.stack }),
  }

  if (env.NODE_ENV === 'development') {
    console.error(`[Error Handler] ${req.method} ${req.originalUrl}:`, error.message)
  }

  return res.status(error.statusCode).json(response)
}

// 404 Route Not Found Handler
export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Endpoint not found: ${req.method} ${req.originalUrl}`)
  next(error)
}
