import express from "express"

// Validation middleware
const validate = (schema: any) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            // Check if req.body exists and is valid JSON
            if (!req.body || typeof req.body !== 'object') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid JSON format"
                });
            }

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message
                });
            }
            next();
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body format"
            });
        }
    };
};

export default validate