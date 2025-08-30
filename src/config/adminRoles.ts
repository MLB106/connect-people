// src/config/adminRoles.ts
export const ADMIN_ROLES = [
  'president',
  'director',
  'sub-director',
  'agent-press',
  'moderator',
  'agent-maintenance',
  'codeur',
  'agent-administratif',
  'conseiller',
  'commercial',
  'agent-litige',
  'agent-securite',
  'responsable',
] as const;

export type AdminRole = typeof ADMIN_ROLES[number];

/* Matrice de permissions */
export const PERMISSION_MATRIX: Record<AdminRole, Record<string, number>> = {
  president:      { users: 5, finance: 5, maintenance: 5, code: 5, analytics: 5, security: 5 },
  director:       { users: 4, finance: 4, maintenance: 4, code: 3, analytics: 4, security: 4 },
  'sub-director': { users: 4, finance: 3, maintenance: 4, code: 2, analytics: 3, security: 3 },
  'agent-press':  { users: 1, articles: 3, media: 3 },
  moderator:      { users: 1, content: 3, reports: 2 },
  'agent-maintenance': { tickets: 4, assets: 3 },
  codeur:         { repos: 3, deployments: 2 },
  'agent-administratif': { documents: 3, calendar: 2 },
  conseiller:     { clients: 2, sessions: 3 },
  commercial:     { leads: 3, contracts: 2 },
  'agent-litige': { claims: 4, refunds: 3 },
  'agent-securite': { logs: 3, incidents: 4 },
  responsable:    { team: 3, reports: 2 },
};

export const TOKEN_CONSTANTS = {
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  RESET_TOKEN_EXPIRY: '1h',
  CSRF_TOKEN_EXPIRY: '1h',
} as const;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
} as const;