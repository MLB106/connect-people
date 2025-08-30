// src/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodType<any, any, any>) =>
  (req: Request, res: Response, next: NextFunction) => { 
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: (err as any).errors });
  }
};