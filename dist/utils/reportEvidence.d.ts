type MediaKind = 'messages' | 'voices' | 'photos' | 'videos';
export declare const reportEvidence: (kind: MediaKind, id: string, reason: string) => Promise<void>;
export {};
