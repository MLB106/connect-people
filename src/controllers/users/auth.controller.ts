/**
 * @file src/controllers/users/auth.controller.ts
 * @description User authentication controller with strict ES2023 syntax
 * @version 1.0.0
 * @author MLB <connect_project_dz@yahoo.com>
 */

import { type Request, type Response } from 'express';
import { User } from '../../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../../services/token.service.js';
import { log } from '../../services/logger.service.js';

/**
 * Login request interface
 */
interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
    turnstileToken?: string;
  };
}

/**
 * Register request interface
 */
interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    turnstileToken?: string;
  };
}

/**
 * API response interface
 */
interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
}

/**
 * User login controller
 * @param {LoginRequest} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const userLogin = async (req: LoginRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';

    // Validate input
    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        data: null,
        error: 'Email et mot de passe requis'
      };
      res.status(400).json(response);
      return;
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      log.user('login_failed', email, { ip, reason: 'user_not_found' });
      const response: ApiResponse = {
        success: false,
        data: null,
        error: 'Email ou mot de passe incorrect'
      };
      res.status(401).json(response);
      return;
    }

    // Check if account is active
    if (!user.isActive) {
      log.user('login_failed', email, { ip, reason: 'account_inactive' });
      const response: ApiResponse = {
        success: false,
        data: null,
        error: 'Compte désactivé'
      };
      res.status(401).json(response);
      return;
    }

    // Verify password
    const isPasswordValid = await (user as any).comparePassword(password);
    if (!isPasswordValid) {
      log.user('login_failed', email, { ip, reason: 'invalid_password' });
      const response: ApiResponse = {
        success: false,
        data: null,
        error: 'Email ou mot de passe incorrect'
      };
      res.status(401).json(response);
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(
      { id: user._id, email: user.email, role: user.role }, 
      'userAccess'
    );
    const refreshToken = generateRefreshToken(
      { id: user._id, email: user.email, role: user.role }, 
      'userRefresh'
    );

    // Log successful login
    log.user('login_success', email, { ip, userId: user._id });

    // Return success response
    const response: ApiResponse<{
      user: unknown;
      accessToken: string;
      refreshToken: string;
    }> = {
      success: true,
      data: {
        user: (user as any).toPublicJSON(),
        accessToken,
        refreshToken
      },
      error: null
    };
    res.json(response);

  } catch (error) {
    console.error('Login error:', error);
    log.user('login_error', req.body.email ?? 'unknown', { 
      ip: req.ip ?? 'unknown', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    
    const response: ApiResponse = {
      success: false,
      data: null,
      error: 'Erreur interne du serveur'
    };
    res.status(500).json(response);
  }
};

/**
 * User registration controller
 * @param {RegisterRequest} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const userRegister = async (req: RegisterRequest, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      const response: ApiResponse = {
        success: false,
        data: null,
        error: 'Tous les champs sont requis'
      };
      res.status(400).json(response);
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      log.user('register_failed', email, { ip, reason: 'user_exists' });
      const response: ApiResponse = {
        success: false,
        data: null,
        error: 'Un compte avec cet email existe déjà'
      };
      res.status(409).json(response);
      return;
    }

    // Create new user
    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email: email.toLowerCase(),
      passwordHash: password, // The pre('save') middleware will hash automatically
      role: role ?? 'user',
      isActive: true,
      emailVerified: false
    });

    await newUser.save();

    // Generate tokens
    const accessToken = generateAccessToken(
      { id: newUser._id, email: newUser.email, role: newUser.role }, 
      'userAccess'
    );
    const refreshToken = generateRefreshToken(
      { id: newUser._id, email: newUser.email, role: newUser.role }, 
      'userRefresh'
    );

    // Log successful registration
    log.user('register_success', email, { ip, userId: newUser._id });

    // Return success response
    const response: ApiResponse<{
      user: unknown;
      accessToken: string;
      refreshToken: string;
    }> = {
      success: true,
      data: {
        user: (newUser as any).toPublicJSON(),
        accessToken,
        refreshToken
      },
      error: null
    };
    res.status(201).json(response);

  } catch (error) {
    console.error('Registration error:', error);
    log.user('register_error', req.body.email ?? 'unknown', { 
      ip: req.ip ?? 'unknown', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    
    const response: ApiResponse = {
      success: false,
      data: null,
      error: 'Erreur interne du serveur'
    };
    res.status(500).json(response);
  }
};