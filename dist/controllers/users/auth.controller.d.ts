import { Request, Response } from 'express';
interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
        turnstileToken?: string;
    };
}
interface RegisterRequest extends Request {
    body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: string;
        turnstileToken?: string;
    };
}
export declare const userLogin: (req: LoginRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const userRegister: (req: RegisterRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
