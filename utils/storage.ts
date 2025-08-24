// utils/storage.ts
// Stockage côté client via localStorage (4 catégories)

export interface StoredItem<T> {
  id: string;          // UUID ou timestamp
  userId: string;      // ← ajouté
  blob: T;
}

export const getItem = (key: string): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem(key) : null;

const KEYS = {
  messages: 'chat_messages',
  voices:   'chat_voices',
  photos:   'chat_photos',
  videos:   'chat_videos',
} as const;

type MediaKind = keyof typeof KEYS;

/* ---------- Messages texte ---------- */
export const loadMessages   = (): StoredItem<string>[] =>
  JSON.parse(localStorage.getItem(KEYS.messages) ?? '[]');

export const saveMessages   = (list: StoredItem<string>[]) =>
  localStorage.setItem(KEYS.messages, JSON.stringify(list));

/* ---------- Messages vocaux ---------- */
export const loadVoices     = (): StoredItem<string>[] =>
  JSON.parse(localStorage.getItem(KEYS.voices) ?? '[]');

export const saveVoices     = (list: StoredItem<string>[]) =>
  localStorage.setItem(KEYS.voices, JSON.stringify(list));

/* ---------- Photos ---------- */
export const loadPhotos     = (): StoredItem<string>[] =>
  JSON.parse(localStorage.getItem(KEYS.photos) ?? '[]');

export const savePhotos     = (list: StoredItem<string>[]) =>
  localStorage.setItem(KEYS.photos, JSON.stringify(list));

/* ---------- Vidéos ---------- */
export const loadVideos     = (): StoredItem<string>[] =>
  JSON.parse(localStorage.getItem(KEYS.videos) ?? '[]');

export const saveVideos     = (list: StoredItem<string>[]) =>
  localStorage.setItem(KEYS.videos, JSON.stringify(list));

/* ---------- Suppression individuelle ---------- */
const removers: Record<MediaKind, (list: any[]) => void> = {
  messages: saveMessages,
  voices:   saveVoices,
  photos:   savePhotos,
  videos:   saveVideos,
};

const loaders: Record<MediaKind, () => any[]> = {
  messages: loadMessages,
  voices:   loadVoices,
  photos:   loadPhotos,
  videos:   loadVideos,
};

export const removeItem = (kind: MediaKind, id: string): void => {
  const list = loaders[kind]().filter(item => item.id !== id);
  removers[kind](list);
};