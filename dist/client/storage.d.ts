export interface StoredItem<T> {
    id: string;
    userId: string;
    blob: T;
}
declare const MEDIA_KEYS: {
    readonly messages: "chat_messages";
    readonly voices: "chat_voices";
    readonly photos: "chat_photos";
    readonly videos: "chat_videos";
};
type MediaKind = keyof typeof MEDIA_KEYS;
export declare const loadMedia: <T>(kind: MediaKind) => StoredItem<T>[];
export declare const loadMessages: () => StoredItem<string>[];
export declare const saveMessages: (list: StoredItem<string>[]) => void;
export declare const loadVoices: () => StoredItem<string>[];
export declare const saveVoices: (list: StoredItem<string>[]) => void;
export declare const loadPhotos: () => StoredItem<string>[];
export declare const savePhotos: (list: StoredItem<string>[]) => void;
export declare const loadVideos: () => StoredItem<string>[];
export declare const saveVideos: (list: StoredItem<string>[]) => void;
export declare const removeMediaItem: (kind: MediaKind, id: string) => void;
export declare const saveAuthToken: (token: string, ttlMs?: number) => void;
export declare const getAuthToken: () => string | null;
export declare const removeAuthToken: () => void;
export declare const saveAdminToken: (token: string, ttlMs?: number) => void;
export declare const getAdminToken: () => string | null;
export declare const removeAdminToken: () => void;
export declare const saveCsrf: (token: string) => void;
export declare const loadCsrf: () => string | null;
export declare const removeCsrf: () => void;
export {};
