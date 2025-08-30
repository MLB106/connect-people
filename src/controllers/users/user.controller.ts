import { Request, Response } from 'express';

export const userLogin    = async (_req: Request, res: Response) => res.status(501).json({ error: 'Not implemented' });
export const userRegister = async (_req: Request, res: Response) => res.status(501).json({ error: 'Not implemented' });