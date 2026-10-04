
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
};

export const ACCESS_TOKEN_EXPIRES_IN = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "86400") * 1000; // ms
export const REFRESH_TOKEN_EXPIRES_IN = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "604800") * 1000; // ms

// Ensure cookie lives longer than tokenS to access user payload
export const JWT_TOKEN_COOKIE_MAX_AGE = REFRESH_TOKEN_EXPIRES_IN * 2; 
