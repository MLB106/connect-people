// src/schemas/user.schema.ts
import { z } from 'zod';
import { USER_ROLES } from '../config/userRoles'; // import manquant
// UserRole n’est pas obligatoire ici, on le laisse ou on retire
export const userRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    role: z.enum(USER_ROLES),
});
export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
export { USER_ROLES }; // si tu veux l’exporter
//# sourceMappingURL=user.schema.js.map