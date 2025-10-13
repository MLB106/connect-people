// Middleware CSRF complet (protection + injection token + gestion d’erreur)
import csrf from 'csurf';
import type { Request, Response, NextFunction } from 'express';

export const csrfProtection = csrf({
  cookie: true,
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
});

export const addCsrfToken = (_req: Request, res: Response, next: NextFunction) => {
  res.locals.csrfToken = (res.req as any).csrfToken();
  next();
};

export const handleCsrfError = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.code !== 'EBADCSRFTOKEN') return _next(err);
  res.status(403).json({ error: 'Token CSRF invalide ou session expirée.' });
};