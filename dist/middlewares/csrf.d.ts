import type { Request, Response, NextFunction } from 'express';
export declare const csrfProtection: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const addCsrfToken: (_req: Request, res: Response, next: NextFunction) => void;
export declare const handleCsrfError: (err: any, _req: Request, res: Response, _next: NextFunction) => void;
