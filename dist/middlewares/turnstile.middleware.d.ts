import { Request, Response, NextFunction } from 'express';
interface TurnstileReq extends Request {
    body: {
        turnstileToken?: string;
    };
}
export declare function turnstileGuard(req: TurnstileReq, res: Response, next: NextFunction): Promise<void>;
export {};
