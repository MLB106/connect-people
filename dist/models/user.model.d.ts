import { Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: string;
    isActive: boolean;
    emailVerified: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
