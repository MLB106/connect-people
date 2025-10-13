// Configuration et gestionnaire CSRF pour Express
import csrf from 'csurf';
import type { Request, Response, NextFunction } from 'express';

export const configureCsrf = () =>
  csrf({
    cookie: true,
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    value: (req: Request) =>
      req.body._csrf || req.query._csrf || req.headers['x-csrf-token'],
  });

export const addCsrfToken = (_req: Request, res: Response, next: NextFunction) => {
  res.locals.csrfToken = (res.req as any)._csrf;
  next();
};

export const handleCsrfError = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.code !== 'EBADCSRFTOKEN') return _next(err);
  res.status(403).json({
    error: 'Session expirée ou token CSRF invalide. Veuillez rafraîchir la page et réessayer.',
  });
};