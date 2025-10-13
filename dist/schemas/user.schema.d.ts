import { z } from 'zod';
import { USER_ROLES } from '../config/userRoles';
export declare const userRegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodEnum<{
        user: "user";
        publicist: "publicist";
        professional: "professional";
    }>;
}, z.core.$strip>;
export declare const userLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export { USER_ROLES };
