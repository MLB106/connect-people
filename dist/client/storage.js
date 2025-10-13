// src/client/storage.ts
// Stockage côté client (localStorage / sessionStorage) – ES2022
/* ---------- Helpers internes ---------- */
const get = (key) => typeof window !== 'undefined' ? localStorage.getItem(key) : null;
const set = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch {
        /* ignore write errors */
    }
};
const remove = (key) => localStorage.removeItem(key);
const parse = (key) => {
    try {
        const raw = get(key);
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
};
/* ---------- Media ---------- */
const MEDIA_KEYS = {
    messages: 'chat_messages',
    voices: 'chat_voices',
    photos: 'chat_photos',
    videos: 'chat_videos',
};
export const loadMedia = (kind) => parse(MEDIA_KEYS[kind]) ?? [];
const saveMedia = (kind, list) => set(MEDIA_KEYS[kind], list);
export const loadMessages = () => loadMedia('messages');
export const saveMessages = (list) => saveMedia('messages', list);
export const loadVoices = () => loadMedia('voices');
export const saveVoices = (list) => saveMedia('voices', list);
export const loadPhotos = () => loadMedia('photos');
export const savePhotos = (list) => saveMedia('photos', list);
export const loadVideos = () => loadMedia('videos');
export const saveVideos = (list) => saveMedia('videos', list);
export const removeMediaItem = (kind, id) => {
    const filtered = loadMedia(kind).filter(item => item.id !== id);
    saveMedia(kind, filtered);
};
/* ---------- Tokens ---------- */
const TOKEN_KEY = 'accessToken';
const ADMIN_KEY = 'adminAccessToken';
const CSRF_KEY = 'csrf';
const saveTokenWithExpiry = (key, token, ttlMs) => set(key, { value: token, expiry: Date.now() + ttlMs });
const loadTokenWithExpiry = (key) => {
    const payload = parse(key);
    if (!payload || Date.now() > payload.expiry) {
        remove(key);
        return null;
    }
    return payload.value;
};
export const saveAuthToken = (token, ttlMs = 3_600_000) => saveTokenWithExpiry(TOKEN_KEY, token, ttlMs);
export const getAuthToken = () => loadTokenWithExpiry(TOKEN_KEY);
export const removeAuthToken = () => remove(TOKEN_KEY);
export const saveAdminToken = (token, ttlMs = 3_600_000) => saveTokenWithExpiry(ADMIN_KEY, token, ttlMs);
export const getAdminToken = () => loadTokenWithExpiry(ADMIN_KEY);
export const removeAdminToken = () => remove(ADMIN_KEY);
export const saveCsrf = (token) => set(CSRF_KEY, token);
export const loadCsrf = () => parse(CSRF_KEY);
export const removeCsrf = () => remove(CSRF_KEY);
//  UTILISATION DAN SLE CLIENT FETCH 
// import { loadToken, loadAdminToken, loadCsrf } from '../client/storage.js';
// const token   = admin ? loadAdminToken() : loadToken();
// const csrf    = loadCsrf();
//# sourceMappingURL=storage.js.map