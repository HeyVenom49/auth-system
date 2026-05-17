class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string = "Bad Request"): ApiError {
    return new ApiError(400, message);
  }

  static unauthorized(message: string = "Unauthorized"): ApiError {
    return new ApiError(401, message);
  }

  static forbidden(message: string = "Not verified"): ApiError {
    return new ApiError(403, message);
  }

  static notFound(message: string = "Not Found"): ApiError {
    return new ApiError(404, message);
  }

  static conflict(message: string = "Conflict"): ApiError {
    return new ApiError(409, message);
  }
}

export default ApiError;
