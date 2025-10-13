import jwt from 'jsonwebtoken';
type TokenType = 'adminAccess' | 'adminRefresh' | 'userAccess' | 'userRefresh';
export declare const generateAccessToken: (payload: object, type: TokenType) => string;
export declare const generateRefreshToken: (payload: object, type: TokenType) => string;
export declare const verifyToken: (token: string, type: TokenType) => jwt.JwtPayload;
export declare const generateCSRFToken: () => string;
export declare const verifyCSRFToken: (token: string, stored: string) => boolean;
export {};
