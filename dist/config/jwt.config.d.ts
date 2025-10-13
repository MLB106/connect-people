import 'dotenv/config';
export declare const JWT_CONFIG: {
    readonly secrets: {
        readonly adminAccess: string;
        readonly adminRefresh: string;
        readonly userAccess: string;
        readonly userRefresh: string;
        readonly csrf: string;
    };
    readonly expiry: {
        readonly ACCESS: string;
        readonly REFRESH: string;
        readonly RESET: string;
        readonly CSRF: string;
    };
    readonly cookie: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: "strict";
    };
    readonly algorithm: "HS256";
};
