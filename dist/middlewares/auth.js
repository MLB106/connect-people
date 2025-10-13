import jwt from 'jsonwebtoken';
export const authenticate = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token manquant ou invalide' });
        return next();
    }
    const token = auth.slice(7);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ou typer via interface
        next();
    }
    catch {
        return res.status(401).json({ error: 'Token expiré ou corrompu' });
    }
};
//# sourceMappingURL=auth.js.map