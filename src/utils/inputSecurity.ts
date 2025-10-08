/**
 * @file src/utils/inputSecurity.ts
 * Sanitization & validation des entrées utilisateur
 */

import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import he from 'he';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

/* ---------- 1. Sanitization ---------- */
export const sanitizeInput = (input: unknown): string => {
  if (typeof input !== 'string') return String(input);
  let sanitized = purify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  sanitized = he.encode(sanitized);        // échappe <, >, ", '…
  sanitized = sanitized.trim();
  return sanitized.slice(0, 1000);
};

export const sanitizeObject = (obj: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] =
      typeof v === 'object' && v !== null && !Array.isArray(v)
        ? sanitizeObject(v as Record<string, unknown>)
        : sanitizeInput(v as string); // ou Array / number / boolean
  }
  return out;
};

/* ---------- 2. Validation ---------- */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidFrenchPhoneNumber = (phone: string): boolean =>
  /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(phone);

export const isValidFrenchPostalCode = (postal: string): boolean =>
  /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/.test(postal);

export const truncate = (str: string, length: number): string =>
  str.length > length ? str.slice(0, length) + '…' : str;

/* ---------- 3. Schéma Zod (exemple) ---------- */
import { z } from 'zod';

export const safeString = () =>
  z.string().transform(val => sanitizeInput(val));

export const safeEmail = () =>
  safeString().refine(isValidEmail, { message: 'Email invalide' });