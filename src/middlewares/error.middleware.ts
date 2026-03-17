import type {Request , Response , NextFunction} from "express"

function sendToProduction(err : any , res : Response) {
    const statusCode = err.statusCode || 500;
    if (err.isOperational) {
        res.status(statusCode).json({
            success: false,
            message: err.message,
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export function sendToDevelopment(err : any , res : Response) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
    });
}


export const globalErrorHandling = (err : any,req: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV === "production") {
        sendToProduction(err, res);
      } else {
        sendToDevelopment(err, res);
      }
      next();
}