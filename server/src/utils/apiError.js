export class ApiError extends Error {
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.success = false
    this.errors = errors
    this.isOperational = true

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  static badRequest(message = 'Bad Request', errors = []) {
    return new ApiError(400, message, errors)
  }

  static unauthorized(message = 'Unauthorized access') {
    return new ApiError(401, message)
  }

  static forbidden(message = 'Forbidden: insufficient permissions') {
    return new ApiError(403, message)
  }

  static notFound(message = 'Requested resource not found') {
    return new ApiError(404, message)
  }

  static conflict(message = 'Conflict: resource already exists') {
    return new ApiError(409, message)
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message)
  }
}

export default ApiError
