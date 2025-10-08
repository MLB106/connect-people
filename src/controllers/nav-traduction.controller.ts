// src/controllers/nav-traduction.controller.ts
import { Request, Response } from 'express';
import { execute } from '../utils/db.js';

export const getTraductionOptions = async (_req: Request, res: Response) => {
  const opts = await execute(
    `SELECT id, code, name, parent_code FROM nav_options WHERE menu = 'traduction' ORDER BY parent_code NULLS FIRST, id`
  );
  res.json(opts);
};