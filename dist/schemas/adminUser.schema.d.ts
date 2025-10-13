import { z } from 'zod';
export declare const adminRoleSchema: z.ZodEnum<{
    president: "president";
    director: "director";
    "sub-director": "sub-director";
    "agent-press": "agent-press";
    "agent-maintenance": "agent-maintenance";
    "agent-administratif": "agent-administratif";
    conseiller: "conseiller";
    commercial: "commercial";
    "agent-litige": "agent-litige";
    "agent-securite": "agent-securite";
    responsable: "responsable";
    moderator: "moderator";
    codeur: "codeur";
}>;
export declare const adminLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    totp: z.ZodString;
}, z.core.$strip>;
export type AdminRole = z.infer<typeof adminRoleSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;
