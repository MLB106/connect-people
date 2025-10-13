import type { Request, Response, NextFunction } from 'express';
export declare const rateLimitAdmin: (windowSeconds?: number, maxHits?: number) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
