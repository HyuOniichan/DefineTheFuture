import type { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError, flattenError } from "zod";

interface RequestValidatorsType {
    paramsSchema?: ZodObject<any>;
    bodySchema?: ZodObject<any>;
    querySchema?: ZodObject<any>;
}

export const validateRequest = (validators: RequestValidatorsType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (validators.paramsSchema) {
                req.params = await validators.paramsSchema.parseAsync(req.params || {}) as any;
            }
            if (validators.bodySchema) {
                req.body = await validators.bodySchema.parseAsync(req.body || {}) as any;
            }
            if (validators.querySchema) {
                const validatedQuery = await validators.querySchema.parseAsync(req.query || {}) as any;
                Object.defineProperty(req, 'query', { value: validatedQuery, writable: true });
            }

            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid request",
                    data: flattenError(error).fieldErrors
                });
            }

            return next(error);
        }
    }
}
