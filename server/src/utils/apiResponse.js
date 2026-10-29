export class ApiResponse {
  constructor(statusCode, data, message = 'Success', meta = null) {
    this.statusCode = statusCode
    this.success = statusCode >= 200 && statusCode < 300
    this.message = message
    this.data = data
    if (meta) {
      this.meta = meta
    }
  }

  static success(res, data = null, message = 'Success', statusCode = 200, meta = null) {
    return res.status(statusCode).json(new ApiResponse(statusCode, data, message, meta))
  }

  static created(res, data = null, message = 'Resource created successfully', meta = null) {
    return res.status(201).json(new ApiResponse(201, data, message, meta))
  }

  static noContent(res) {
    return res.status(204).send()
  }
}

export default ApiResponse
