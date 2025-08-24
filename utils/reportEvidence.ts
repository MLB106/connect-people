import axiosInstance from '../src/config/axiosConfig';
import { getItem } from './storage';

type MediaKind = 'messages' | 'voices' | 'photos' | 'videos';

export const reportEvidence = async (
  kind: MediaKind,
  id: string,
  reason: string
) => {
  const keyMap: Record<MediaKind, string> = {
    messages: 'chat_messages',
    voices:   'chat_voices',
    photos:   'chat_photos',
    videos:   'chat_videos',
  };
  const key = keyMap[kind];

  const raw = getItem(key);
  if (!raw) throw new Error('Preuve introuvable');

  const list = JSON.parse(raw);
  const item = list.find((i: any) => i.id === id);
  if (!item) throw new Error('ID introuvable');

  await axiosInstance.post('/report', { kind, id, evidence: item, reason });
};