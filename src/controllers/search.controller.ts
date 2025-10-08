// src/controllers/search.controller.ts
import { Request, Response } from 'express';
import { execute } from '../utils/db.js';

export const getSearchCategories = async (_req: Request, res: Response) => {
  const rows = await execute(`SELECT code, name FROM search_categories ORDER BY id`);
  res.json(rows); // [{ code: 'help', name: { fr: 'Centre d\'aide', … } }, …]
};