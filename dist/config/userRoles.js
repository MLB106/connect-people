// src/config/userRoles.ts
export const USER_ROLES = ['publicist', 'professional', 'user'];
/* Matrice de permissions (exemple) */
export const USER_PERMISSIONS = {
    publicist: { articles: 3, media: 3 },
    professional: { offers: 3, contracts: 2 },
    user: { profile: 2, booking: 1 },
};
//# sourceMappingURL=userRoles.js.map