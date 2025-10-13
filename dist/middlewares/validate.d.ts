import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
export declare const validate: (schema: z.ZodType<any, any, any>) => (req: Request, res: Response, next: NextFunction) => void;
