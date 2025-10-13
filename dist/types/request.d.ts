import type { Request } from 'express';
export interface User {
    id: string;
    email: string;
    role: string;
    authentificationMultiFacteurs?: boolean;
}
export type AppRequest = Request & {
    user?: User;
};
