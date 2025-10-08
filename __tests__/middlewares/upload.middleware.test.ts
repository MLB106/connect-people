// __tests__/middlewares/upload.middleware.test.ts
import { jest, describe, it, expect } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';

/* 1. config multer */
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (_, __, cb) => cb(null, true),
  limits: { files: 1 },
});

/* 2. application Express */
const app = express();

/* 3. route test : on renvoie le buffer en base64 */
app.post('/test', upload.single('file'), (req, res) => {
  if (!req.file) return res.json({ file: undefined });

  const { buffer, ...rest } = req.file;
  return res.json({
    file: {
      ...rest,
      buffer: buffer.toString('base64'),
    },
  });
});

/* 4. gestion d’erreur multer */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.code === 'LIMIT_UNEXPECTED_FILE') return res.json({ file: undefined });
  return res.status(500).json({ error: err.message });
});

/* 5. tests */
describe('upload.middleware', () => {
  it('accepte un fichier et le stocke en mémoire', async () => {
    const res = await request(app)
      .post('/test')
      .attach('file', Buffer.from('hello'), 'test.txt');

    expect(res.status).toBe(200);
    const file = res.body.file;
    expect(file).toBeDefined();
    expect(file).toMatchObject({
      fieldname: 'file',
      originalname: 'test.txt',
      mimetype: 'text/plain',
      size: 5,
    });

    // ✅ On reconstruit le buffer depuis base64
    expect(Buffer.from(file.buffer, 'base64').toString('utf8')).toBe('hello');
  });

  it('ne crée aucun fichier sur le disque', async () => {
    const spy = jest.spyOn(require('fs'), 'createWriteStream');
    await request(app)
      .post('/test')
      .attach('file', Buffer.from('data'), 'dummy.bin');

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('renvoie undefined si aucun fichier envoyé', async () => {
    const res = await request(app).post('/test').send({});
    expect(res.status).toBe(200);
    expect(res.body.file).toBeUndefined();
  });

  it('ignore un champ dont le nom ne correspond pas', async () => {
    const res = await request(app)
      .post('/test')
      .attach('wrongField', Buffer.from('skip'), 'skip.txt');

    expect(res.status).toBe(200);
    expect(res.body.file).toBeUndefined();
  });
});

// A UTILISER LORS DES CREATIONS DE CERTAINES ROUTES 

// import upload from '../middlewares/upload.middleware';

// router.post('/avatar', authenticateUser, upload.single('avatar'), updateAvatarController);