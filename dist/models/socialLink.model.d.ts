import { Document } from 'mongoose';
export interface ISocialLink extends Document {
    platform: string;
    url: string;
    icon: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SocialLink: import("mongoose").Model<ISocialLink, {}, {}, {}, Document<unknown, {}, ISocialLink, {}, {}> & ISocialLink & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
