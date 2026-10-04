import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { ROLES, TOKENS, type CookiePayloadType, type ResponseType, type UserPayloadType } from "../types"
import { refreshAccessToken, verifyToken } from "../utils";
import type { UserRoleType } from "../schemas";
import { JWT_TOKEN_COOKIE_MAX_AGE, COOKIE_OPTIONS } from "../config/tokens";
import { extractUserPayloadFromToken } from "../utils/handleJwtToken";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayloadType,
            cookies: CookiePayloadType,
        }
    }
}

export const authenticate = async (req: Request, res: Response<ResponseType<any>>, next: NextFunction) => {
    try {
        const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
        if (!accessTokenSecret) {
            res.status(500).json({ status: "error", message: "Server failed to find secret key" });
            return;
        }

        const userPayload = verifyToken(req.cookies.accessToken || "", "access");
        req.user = {
            user_id: userPayload.user_id,
            role: userPayload.role || ROLES.USER,
        }
        
        next();
    } catch (error: any) {
        if (error instanceof jwt.TokenExpiredError) {
            try {
                req.user = extractUserPayloadFromToken(req.cookies.accessToken);
                
                const newAccessToken = refreshAccessToken(req.cookies.accessToken, req.cookies.refreshToken);
                res.cookie(TOKENS.ACCESS, newAccessToken, { ...COOKIE_OPTIONS, maxAge: JWT_TOKEN_COOKIE_MAX_AGE });

                next();
            } catch (suberror: any) {
                res.status(401).json({ status: "error", message: `Failed to refresh token: ${suberror?.message}` });
            }
            return;
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ status: "failed", message: `Invalid token: ${error.message}` });
            return;
        }
        
        res.status(401).json({ status: "error", message: error?.message });
    }
}

export const authorize = (...roles: UserRoleType[]) => {
    return async (req: Request, res: Response<ResponseType<any>>, next: NextFunction) => {
        try {
            if (!req.user || !req.user?.role) {
                res.status(401).json({ status: "failed", message: "Not authenticated yet" });
                return;
            }
            
            if (!roles.includes(req.user.role as UserRoleType)) {
                res.status(403).json({
                    status: "failed",
                    message: `Role ${req.user.role} doesn't have permission to access this route`
                });
                return;
            }
            
            next();
        } catch (error: any) {
            res.status(401).json({ status: "failed", message: error?.message });
        }
    }
}
