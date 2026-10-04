import jwt, { type Algorithm } from 'jsonwebtoken';
import { ROLES, type UserPayloadType } from "../types";


type TokenType = "access" | "refresh";


export const generateToken = (payload: UserPayloadType, type: TokenType): string => {
    let secret = (type == "access") ? process.env.JWT_ACCESS_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error(`Secret key for ${type} token is not defined`);
    }

    const algorithm = (process.env.JWT_ALGORITHM || "HS256") as Algorithm;

    const expiresInStr = (type == "access") ? process.env.JWT_ACCESS_TOKEN_EXPIRES_IN : process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;
    const expiresIn = parseInt(expiresInStr || "86400");

    const token = jwt.sign(payload, secret, { algorithm, expiresIn });

    return token;
}


export const verifyToken = (userToken: string, type: TokenType): UserPayloadType => {
    let secret = (type == "access") ? process.env.JWT_ACCESS_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error(`Secret key for ${type} token is not defined`);
    }

    const decoded = jwt.verify(userToken, secret) as UserPayloadType;
    return decoded;
}


export const extractUserPayloadFromToken = (token: string): UserPayloadType => {
    const payload = jwt.decode(token) as UserPayloadType;
    const userPayload: UserPayloadType = {
        user_id: payload.user_id,
        role: payload.role || ROLES.USER,
    }
    return userPayload
}


export const refreshAccessToken = (expiredAccessToken: string, refreshToken: string) => {
    const _ = verifyToken(refreshToken, "refresh");
    const userPayload = extractUserPayloadFromToken(expiredAccessToken);
    
    const newAccessToken = generateToken(userPayload, "access");
    return newAccessToken
}

