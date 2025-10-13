export declare const ADMIN_ROLES: readonly ["president", "director", "sub-director", "agent-press", "moderator", "agent-maintenance", "codeur", "agent-administratif", "conseiller", "commercial", "agent-litige", "agent-securite", "responsable"];
export type AdminRole = typeof ADMIN_ROLES[number];
export declare const PERMISSION_MATRIX: Record<AdminRole, Record<string, number>>;
export declare const TOKEN_CONSTANTS: {
    readonly ACCESS_TOKEN_EXPIRY: "15m";
    readonly REFRESH_TOKEN_EXPIRY: "7d";
    readonly RESET_TOKEN_EXPIRY: "1h";
    readonly CSRF_TOKEN_EXPIRY: "1h";
};
export declare const COOKIE_OPTIONS: {
    readonly httpOnly: true;
    readonly secure: boolean;
    readonly sameSite: "strict";
};
