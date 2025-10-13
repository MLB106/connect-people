export declare const USER_ROLES: readonly ["publicist", "professional", "user"];
export type UserRole = typeof USER_ROLES[number];
export declare const USER_PERMISSIONS: Record<UserRole, Record<string, number>>;
