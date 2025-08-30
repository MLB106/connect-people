// src/controllers/admin/user.controller.ts

import { Request, Response } from 'express';

export const createUserController = async (_req: Request, res: Response) => {
  res.json({ ok: true });
};