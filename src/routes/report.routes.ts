// fichier : src/routes/report.routes.ts

import { Router } from 'express';
import crypto from 'crypto';
import { Report } from '../models/report.model'; // à créer
import { authenticate } from '../middlewares/auth'; // à créer

const router = Router();

router.post('/report', authenticate, async (req, res) => {
  const { kind, evidence, reason } = req.body;
  const userId = req.user.id;

  await Report.create({
    id: crypto.randomUUID(),
    userId,
    kind,
    evidence: JSON.stringify(evidence),
    reason,
    status: 'pending',
  });

  res.json({ ok: true });
});

export default router;