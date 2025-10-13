import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            admin?: {
                id: string;
                email: string;
                role: string;
            };
        }
    }
}
export declare const authenticateAdmin: (req: Request, res: Response, next: NextFunction) => void;
