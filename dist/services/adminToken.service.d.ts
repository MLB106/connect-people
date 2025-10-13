import jwt from 'jsonwebtoken';
import { AdminRole } from '../config/adminRoles';
export declare const generateAdminAccessToken: (id: string, role: AdminRole) => string;
export declare const generateAdminRefreshToken: (id: string, role: AdminRole) => string;
export declare const verifyAdminAccessToken: (token: string) => jwt.JwtPayload & {
    id: string;
    role: AdminRole;
    type: "admin";
};
export declare const verifyAdminRefreshToken: (token: string) => jwt.JwtPayload & {
    id: string;
    role: AdminRole;
    type: "admin";
};
export declare const generateAdminCSRFToken: () => string;
export declare const verifyAdminCSRFToken: (token: string, stored: string) => boolean;
