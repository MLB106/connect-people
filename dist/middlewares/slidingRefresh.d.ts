import { Request, Response, NextFunction } from 'express';
export declare const slidingRefresh: (secretEnv: "JWT_ADMIN_REFRESH_SECRET" | "JWT_USER_REFRESH_SECRET") => (req: Request, res: Response, next: NextFunction) => Promise<void>;
