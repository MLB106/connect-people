// src/controllers/entreprendre.controller.ts
import { Request, Response } from 'express';
import { execute } from '../utils/db.js';

export const getEntreprendreOptions = async (_req: Request, res: Response) => {
  const opts = await execute(
    `SELECT id, code, name, parent_code FROM nav_options WHERE menu = 'entreprendre' ORDER BY parent_code NULLS FIRST, id`
  );
  res.json(opts);
};