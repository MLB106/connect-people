import { Document } from 'mongoose';
export interface IAdminUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    totpSecret?: string;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AdminUser: import("mongoose").Model<IAdminUser, {}, {}, {}, Document<unknown, {}, IAdminUser, {}, {}> & IAdminUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
