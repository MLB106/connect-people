// src/config/userRoles.ts
export const USER_ROLES = ['publicist', 'professional', 'user'] as const;
export type UserRole = typeof USER_ROLES[number];

/* Matrice de permissions (exemple) */
export const USER_PERMISSIONS: Record<UserRole, Record<string, number>> = {
  publicist:   { articles: 3, media: 3 },
  professional: { offers: 3, contracts: 2 },
  user:         { profile: 2, booking: 1 },
};