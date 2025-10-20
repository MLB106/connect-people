// src/schemas/user.schema.ts
import { z } from 'zod';
import { USER_ROLES } from '../config/userRoles';   // import manquant
// UserRole n’est pas obligatoire ici, on le laisse ou on retire

export const userRegisterSchema = z.object({
  email:           z.string().email(),
  password:        z.string().min(8),
  confirmPassword: z.string().min(8),
  firstName:       z.string().min(1),
  lastName:        z.string().min(1),
  phone:           z.string().optional(),
  city:            z.string().min(1),
  skills:          z.string().optional(),
  experience:      z.string().optional(),
  type:            z.enum(['helper', 'seeker']).optional(),
  role:            z.enum(USER_ROLES).optional(),
  terms:           z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d'utilisation"
  }),
  newsletter:      z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export const userLoginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export { USER_ROLES }; // si tu veux l’exporter