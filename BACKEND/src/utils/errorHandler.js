export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export class AppError extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation error") {
    super(message, 400);
  }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
}
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden access") {
    super(message, 403);
  }
}
export class ConflictError extends AppError {
  constructor(message = "Conflict error") {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}
export class ServiceUnavailableError extends AppError {
  constructor(message = "Service unavailable") {
    super(message, 503);
  }
}
export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class NotImplementedError extends AppError {
  constructor(message = "Not implemented") {
    super(message, 501);
  }
}
export class GatewayTimeoutError extends AppError {
  constructor(message = "Gateway timeout") {
    super(message, 504);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests") {
    super(message, 429);
  }
}
export class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable entity") {
    super(message, 422);
  }
}

export class NotAcceptableError extends AppError {
  constructor(message = "Not acceptable") {
    super(message, 406);
  }
}
