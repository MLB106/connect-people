import { Request, Response, NextFunction } from 'express';
export declare const authorizeAdmin: (resource: string, level?: number) => (req: Request, res: Response, next: NextFunction) => void;
