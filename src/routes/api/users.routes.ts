// src/routes/api/users.routes.ts
import { Router, Request, Response } from 'express';
import { User, IUser } from '../../models/user.model.js';
import { z } from 'zod';
import { ApiResponseUtil, asyncHandler } from '../../utils/apiResponse.js';
import { validateRequest, validateParams, commonSchemas } from '../../utils/validation.js';
import { Logger } from '../../utils/logger.js';

export const usersApiRouter = Router();

// Schémas de validation Zod
const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['publicist', 'professional', 'user']).optional().default('user'),
});

const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  role: z.enum(['publicist', 'professional', 'user']).optional(),
  isActive: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
});

const userIdSchema = z.object({
  id: commonSchemas.mongoId
});

// Fonction utilitaire pour masquer les données sensibles
const sanitizeUser = (user: IUser) => {
  const userObj = user.toObject();
  delete userObj.passwordHash;
  return userObj;
};

// GET /api/users - Liste tous les utilisateurs (champs publics uniquement)
usersApiRouter.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find({ isActive: true })
    .select('-passwordHash')
    .sort({ createdAt: -1 });
  
  const sanitizedUsers = users.map(user => sanitizeUser(user));
  
  Logger.info('Utilisateurs récupérés avec succès', { count: sanitizedUsers.length });
  ApiResponseUtil.success(res, 200, sanitizedUsers);
}));

// GET /api/users/:id - Détail d'un utilisateur (sans password, tokens)
usersApiRouter.get('/:id', 
  validateParams(userIdSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).select('-passwordHash');
    
    if (!user) {
      return ApiResponseUtil.notFound(res, 'Utilisateur non trouvé');
    }

    if (!user.isActive) {
      return ApiResponseUtil.notFound(res, 'Utilisateur non trouvé');
    }

    Logger.info('Utilisateur récupéré avec succès', { userId: id });
    ApiResponseUtil.success(res, 200, sanitizeUser(user));
  })
);

// POST /api/users - Création d'un utilisateur (hash du password)
usersApiRouter.post('/', 
  validateRequest(createUserSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponseUtil.conflict(res, 'Un utilisateur avec cet email existe déjà');
    }

    // Créer l'utilisateur (le hash sera fait automatiquement par le middleware)
    const newUser = new User({
      name,
      email,
      passwordHash: password, // Le middleware va le hasher
      role,
    });

    await newUser.save();
    
    Logger.info('Utilisateur créé avec succès', { userId: String((newUser as any)._id), email });
    ApiResponseUtil.success(res, 201, sanitizeUser(newUser));
  })
);

// PATCH /api/users/:id - Mise à jour partielle d'un utilisateur
usersApiRouter.patch('/:id', 
  validateParams(userIdSchema),
  validateRequest(updateUserSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    // Vérifier si l'utilisateur existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return ApiResponseUtil.notFound(res, 'Utilisateur non trouvé');
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await User.findOne({ 
        email: updateData.email, 
        _id: { $ne: id } 
      });
      if (emailExists) {
        return ApiResponseUtil.conflict(res, 'Un utilisateur avec cet email existe déjà');
      }
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!updatedUser) {
      return ApiResponseUtil.notFound(res, 'Utilisateur non trouvé');
    }

    Logger.info('Utilisateur mis à jour avec succès', { userId: id });
    ApiResponseUtil.success(res, 200, sanitizeUser(updatedUser));
  })
);

// DELETE /api/users/:id - Suppression logique d'un utilisateur
usersApiRouter.delete('/:id', 
  validateParams(userIdSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Vérifier si l'utilisateur existe
    const user = await User.findById(id);
    if (!user) {
      return ApiResponseUtil.notFound(res, 'Utilisateur non trouvé');
    }

    // Suppression logique (marquer comme inactif)
    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    ).select('-passwordHash');

    if (!deletedUser) {
      return ApiResponseUtil.notFound(res, 'Utilisateur non trouvé');
    }

    Logger.info('Utilisateur supprimé avec succès', { userId: id });
    ApiResponseUtil.success(res, 200, { message: 'Utilisateur supprimé avec succès' });
  })
);
