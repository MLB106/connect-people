import { Router } from 'express';
const router = Router();

router.get('/reports', (_req, res) => {
  res.json({ message: 'Hello API v1 - reports', data: [] });
});

export default router;