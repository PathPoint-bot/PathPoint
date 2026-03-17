





export default class ApiError extends Error{
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this,this.constructor);
    }
    
    static badRequest(message = "Bad Request"): ApiError {
        return new ApiError(message, 400);
    }

    static notFound(message = "Not Found"): ApiError {
        return new ApiError(message, 404);
    }

    static unauthorized(message = "Unauthorized"): ApiError {
        return new ApiError(message, 401);
    }
    
    static forbidden(message = "Forbidden"): ApiError {
        return new ApiError(message, 403);
    }

    static conflict(message = "Conflict"): ApiError {
        return new ApiError(message, 409);
    }

    static serverError(message = "Internal Server Error"): ApiError {
        return new ApiError(message, 500);
    }
}

