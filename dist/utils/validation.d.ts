import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
/**
 * Middleware de validation des données d'entrée avec Zod
 */
export declare const validateRequest: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware de validation des paramètres d'URL
 */
export declare const validateParams: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware de validation des query parameters
 */
export declare const validateQuery: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Schémas de validation communs
 */
export declare const commonSchemas: {
    mongoId: z.ZodString;
    pagination: z.ZodObject<{
        page: z.ZodDefault<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
        limit: z.ZodDefault<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
        sort: z.ZodOptional<z.ZodString>;
        order: z.ZodDefault<z.ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>;
    }, z.core.$strip>;
    search: z.ZodObject<{
        q: z.ZodString;
        category: z.ZodOptional<z.ZodString>;
        filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.core.$strip>;
};
