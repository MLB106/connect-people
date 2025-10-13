import { Request, Response, NextFunction } from 'express';
export declare const authorizeUser: (resource: string, level?: number) => (req: Request, res: Response, next: NextFunction) => void;
