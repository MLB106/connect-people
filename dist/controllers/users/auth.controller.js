// src/controllers/user/auth.controller.ts
import { User } from '../../models/user.model';
import { generateAccessToken, generateRefreshToken } from '../../services/token.service';
import { log } from '../../services/logger.service';
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const ip = req.ip || req.socket.remoteAddress || 'unknown';
        // Vérifier que l'utilisateur existe
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            log.user('login_failed', email, { ip, reason: 'user_not_found' });
            return res.status(401).json({
                success: false,
                error: 'Email ou mot de passe incorrect'
            });
        }
        // Vérifier que le compte est actif
        if (!user.isActive) {
            log.user('login_failed', email, { ip, reason: 'account_inactive' });
            return res.status(401).json({
                success: false,
                error: 'Compte désactivé'
            });
        }
        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            log.user('login_failed', email, { ip, reason: 'invalid_password' });
            return res.status(401).json({
                success: false,
                error: 'Email ou mot de passe incorrect'
            });
        }
        // Mettre à jour la dernière connexion
        user.lastLogin = new Date();
        await user.save();
        // Générer les tokens
        const accessToken = generateAccessToken({ id: user._id, email: user.email, role: user.role }, 'userAccess');
        const refreshToken = generateRefreshToken({ id: user._id, email: user.email, role: user.role }, 'userRefresh');
        // Log de connexion réussie
        log.user('login_success', email, { ip, userId: user._id });
        // Retourner les tokens et les données utilisateur
        return res.json({
            success: true,
            data: {
                user: user.toPublicJSON(),
                accessToken,
                refreshToken
            }
        });
    }
    catch (error) {
        console.error('Erreur lors de la connexion:', error);
        log.user('login_error', req.body.email || 'unknown', {
            ip: req.ip || 'unknown',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        });
    }
};
export const userRegister = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role } = req.body;
        const ip = req.ip || req.socket.remoteAddress || 'unknown';
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            log.user('register_failed', email, { ip, reason: 'user_exists' });
            return res.status(409).json({
                success: false,
                error: 'Un compte avec cet email existe déjà'
            });
        }
        // Créer le nouvel utilisateur
        const newUser = new User({
            name: `${firstName} ${lastName}`,
            email: email.toLowerCase(),
            passwordHash: password, // Le middleware pre('save') va hasher automatiquement
            role: role || 'user',
            isActive: true,
            emailVerified: false
        });
        await newUser.save();
        // Générer les tokens
        const accessToken = generateAccessToken({ id: newUser._id, email: newUser.email, role: newUser.role }, 'userAccess');
        const refreshToken = generateRefreshToken({ id: newUser._id, email: newUser.email, role: newUser.role }, 'userRefresh');
        // Log d'inscription réussie
        log.user('register_success', email, { ip, userId: newUser._id });
        // Retourner les tokens et les données utilisateur
        return res.status(201).json({
            success: true,
            data: {
                user: newUser.toPublicJSON(),
                accessToken,
                refreshToken
            }
        });
    }
    catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        log.user('register_error', req.body.email || 'unknown', {
            ip: req.ip || 'unknown',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        });
    }
};
//# sourceMappingURL=auth.controller.js.map