// src/controllers/footer.controller.ts
import { Request, Response } from 'express';
import { execute } from '../utils/db.js';

export const getFooterLinks = async (_req: Request, res: Response) => {
  const socials = await execute(`SELECT platform, url, icon FROM social_links ORDER BY id`);
  const stores  = await execute(`SELECT store, url FROM app_store_links ORDER BY id`);
  res.json({ socials, stores });
};