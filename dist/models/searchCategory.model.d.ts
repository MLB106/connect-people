import { Document } from 'mongoose';
export interface ISearchCategory extends Document {
    code: string;
    name: {
        fr: string;
        en: string;
        ar: string;
        de: string;
        es: string;
        it: string;
        pt: string;
    };
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SearchCategory: import("mongoose").Model<ISearchCategory, {}, {}, {}, Document<unknown, {}, ISearchCategory, {}, {}> & ISearchCategory & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
