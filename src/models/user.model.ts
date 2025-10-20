// src/models/user.model.ts
import { Schema, model, Document } from 'mongoose';
import { USER_ROLES } from '../config/userRoles.js';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  phone?: string;
  city?: string;
  skills?: string;
  experience?: string;
  isActive: boolean;
  emailVerified: boolean;
  newsletter?: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide'],
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 60, // bcrypt hash length
  },
  role: {
    type: String,
    enum: USER_ROLES,
    required: true,
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20,
  },
  city: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  skills: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  experience: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  newsletter: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
  },
}, {
  timestamps: true,
  collection: 'users',
});

// Middleware pour hasher le mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  try {
    // Si c'est un nouveau document ou si le passwordHash a été modifié
    if (this.isNew || this.isModified('passwordHash')) {
      const saltRounds = 12;
      this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Méthode pour obtenir les données publiques (sans passwordHash)
userSchema.methods.toPublicJSON = function() {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  return userObject;
};

export const User = model<IUser>('User', userSchema);
