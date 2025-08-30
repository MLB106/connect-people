// src/utils/reportEvidence.ts
import axiosInstance from '../config/axiosConfig';
import { loadMedia } from '../client/storage';



type MediaKind = 'messages' | 'voices' | 'photos' | 'videos';

export const reportEvidence = async (
  kind: MediaKind,
  id: string,
  reason: string
) => {
  const list = loadMedia<unknown>(kind);
  const item = list.find(i => i.id === id); // plus de type explicite ici
  if (!item) throw new Error('ID introuvable');
  await axiosInstance.post('/report', { kind, id, evidence: item, reason });
};