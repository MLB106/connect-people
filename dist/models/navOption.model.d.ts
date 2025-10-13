import { Document } from 'mongoose';
export interface INavOption extends Document {
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
    menu: 'entreprendre' | 'immobilier' | 'traduction';
    parentCode?: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const NavOption: import("mongoose").Model<INavOption, {}, {}, {}, Document<unknown, {}, INavOption, {}, {}> & INavOption & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
