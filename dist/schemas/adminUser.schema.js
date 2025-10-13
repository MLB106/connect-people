// src/schemas/adminUser.schema.ts
import { z } from 'zod';
export const adminRoleSchema = z.enum([
    'president',
    'director',
    'sub-director',
    'agent-press',
    'agent-maintenance',
    'agent-administratif',
    'conseiller',
    'commercial',
    'agent-litige',
    'agent-securite',
    'responsable',
    'moderator',
    'codeur',
]);
export const adminLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    totp: z.string().length(6), // rendu obligatoire pour le 2FA
});
//# sourceMappingURL=adminUser.schema.js.map