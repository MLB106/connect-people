// src/middlewares/slidingRefresh.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const slidingRefresh =
  (secretEnv: 'JWT_ADMIN_REFRESH_SECRET' | 'JWT_USER_REFRESH_SECRET') =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const oldRefresh = req.cookies?.refreshToken;
      if (!oldRefresh) return next();

      const payload = jwt.verify(oldRefresh, process.env[secretEnv]!) as any;
      const now = Math.floor(Date.now() / 1000);
      const ONE_DAY = 24 * 60 * 60;

      if (payload.exp - now < 6 * ONE_DAY) {
        const newRefresh = jwt.sign(
          { userId: payload.userId, role: payload.role },
          process.env[secretEnv]!,
          { expiresIn: '7d' }
        );
        res.cookie('refreshToken', newRefresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }
    } catch {
      /* ignore */
    }
    next();
  };

//   // exemple route
// import { hit } from '../services/rateLimit';
// import { isIPAllowed } from '../services/security';

// router.post('/login', async (req, res) => {
//   if (!isIPAllowed(req.ip)) return res.status(403).end();

//   const id = `login:${req.ip}`;
//   if ((await hit(id, 60, 5)) === 'BLOCKED') return res.status(429).end();

//   /* … suite logique SQL … */
// });