// src/utils/reportEvidence.ts
import axiosInstance from '../config/axiosConfig';
import { loadMedia } from '../client/storage';
export const reportEvidence = async (kind, id, reason) => {
    const list = loadMedia(kind);
    const item = list.find(i => i.id === id); // plus de type explicite ici
    if (!item)
        throw new Error('ID introuvable');
    await axiosInstance.post('/report', { kind, id, evidence: item, reason });
};
//# sourceMappingURL=reportEvidence.js.map