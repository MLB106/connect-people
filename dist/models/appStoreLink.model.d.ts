import { Document } from 'mongoose';
export interface IAppStoreLink extends Document {
    store: string;
    url: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AppStoreLink: import("mongoose").Model<IAppStoreLink, {}, {}, {}, Document<unknown, {}, IAppStoreLink, {}, {}> & IAppStoreLink & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
