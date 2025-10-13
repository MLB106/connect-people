import { Request, Response } from 'express';
export declare const userLogin: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const userRegister: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
