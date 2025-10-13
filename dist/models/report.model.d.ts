import { Document } from 'mongoose';
export interface IReport extends Document {
    userId: string;
    kind: 'message' | 'voice' | 'photo' | 'video';
    evidence?: string;
    reason?: string;
    status: 'pending' | 'reviewed';
    createdAt: Date;
    updatedAt: Date;
}
export declare const Report: import("mongoose").Model<IReport, {}, {}, {}, Document<unknown, {}, IReport, {}, {}> & IReport & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
