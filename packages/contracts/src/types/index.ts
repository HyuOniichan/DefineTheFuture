
export type ResponseStatusType = "success" | "failed" | "error";

export type ResponseType<T> = {
    status: ResponseStatusType,
    message?: string,
    data?: T,
}

export interface UserPayloadType {
    user_id: string;
    role?: string;
}

export interface CookiePayloadType {
    accessToken?: string; 
    refreshToken?: string; 
    [key: string]: any;
}

export enum TOKENS {
    ACCESS = "accessToken",
    REFRESH = "refreshToken",
}

export enum ROLES {
    ADMIN = "admin",
    USER = "user",
}
