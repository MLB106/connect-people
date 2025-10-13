/**
 * @file src/utils/inputSecurity.ts
 * Sanitization & validation des entrées utilisateur
 */
export declare const sanitizeInput: (input: unknown) => string;
export declare const sanitizeObject: (obj: Record<string, unknown>) => Record<string, unknown>;
export declare const isValidEmail: (email: string) => boolean;
export declare const isValidFrenchPhoneNumber: (phone: string) => boolean;
export declare const isValidFrenchPostalCode: (postal: string) => boolean;
export declare const truncate: (str: string, length: number) => string;
import { z } from 'zod';
export declare const safeString: () => z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
export declare const safeEmail: () => z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
