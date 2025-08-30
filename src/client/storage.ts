// src/client/storage.ts
// Stockage côté client (localStorage / sessionStorage) – ES2022

// src/client/storage.ts
// Stockage côté client – ES2022
export interface StoredItem<T> {
  id: string;
  userId: string;
  blob: T;
}

interface TokenPayload {
  value: string;
  expiry: number;
}

/* ---------- Helpers internes ---------- */
const get = (key: string): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem(key) : null;

const set = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore write errors */
  }
};

const remove = (key: string): void => localStorage.removeItem(key);

const parse = <T>(key: string): T | null => {
  try {
    const raw = get(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/* ---------- Media ---------- */
const MEDIA_KEYS = {
  messages: 'chat_messages',
  voices:   'chat_voices',
  photos:   'chat_photos',
  videos:   'chat_videos',
} as const;

type MediaKind = keyof typeof MEDIA_KEYS;

export const loadMedia = <T>(kind: MediaKind): StoredItem<T>[] =>
  parse(MEDIA_KEYS[kind]) ?? [];

const saveMedia = <T>(kind: MediaKind, list: StoredItem<T>[]) =>
  set(MEDIA_KEYS[kind], list);

export const loadMessages = (): StoredItem<string>[] => loadMedia('messages');
export const saveMessages = (list: StoredItem<string>[]) => saveMedia('messages', list);

export const loadVoices   = (): StoredItem<string>[] => loadMedia('voices');
export const saveVoices   = (list: StoredItem<string>[]) => saveMedia('voices', list);

export const loadPhotos   = (): StoredItem<string>[] => loadMedia('photos');
export const savePhotos   = (list: StoredItem<string>[]) => saveMedia('photos', list);

export const loadVideos   = (): StoredItem<string>[] => loadMedia('videos');
export const saveVideos   = (list: StoredItem<string>[]) => saveMedia('videos', list);

export const removeMediaItem = (kind: MediaKind, id: string): void => {
  const filtered = loadMedia(kind).filter(item => item.id !== id);
  saveMedia(kind, filtered);
};

/* ---------- Tokens ---------- */
const TOKEN_KEY = 'accessToken';
const ADMIN_KEY = 'adminAccessToken';
const CSRF_KEY  = 'csrf';

const saveTokenWithExpiry = (key: string, token: string, ttlMs: number): void =>
  set(key, { value: token, expiry: Date.now() + ttlMs });

const loadTokenWithExpiry = (key: string): string | null => {
  const payload = parse<TokenPayload>(key);
  if (!payload || Date.now() > payload.expiry) {
    remove(key);
    return null;
  }
  return payload.value;
};

export const saveAuthToken   = (token: string, ttlMs = 3_600_000): void =>
  saveTokenWithExpiry(TOKEN_KEY, token, ttlMs);
export const getAuthToken    = (): string | null => loadTokenWithExpiry(TOKEN_KEY);
export const removeAuthToken = (): void => remove(TOKEN_KEY);

export const saveAdminToken   = (token: string, ttlMs = 3_600_000): void =>
  saveTokenWithExpiry(ADMIN_KEY, token, ttlMs);
export const getAdminToken    = (): string | null => loadTokenWithExpiry(ADMIN_KEY);
export const removeAdminToken = (): void => remove(ADMIN_KEY);

export const saveCsrf = (token: string): void => set(CSRF_KEY, token);
export const loadCsrf = (): string | null => parse(CSRF_KEY);
export const removeCsrf = (): void => remove(CSRF_KEY);

//  UTILISATION DAN SLE CLIENT FETCH 

// import { loadToken, loadAdminToken, loadCsrf } from '../client/storage.js';

// const token   = admin ? loadAdminToken() : loadToken();
// const csrf    = loadCsrf();