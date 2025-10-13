// src/models/user.model.ts
import { Schema, model } from 'mongoose';
import { USER_ROLES } from '../config/userRoles.js';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
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
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true,
    collection: 'users',
});
// Middleware pour hasher le mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash'))
        return next();
    try {
        // Si c'est un nouveau document ou si le passwordHash a été modifié
        if (this.isNew || this.isModified('passwordHash')) {
            const saltRounds = 12;
            this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.passwordHash);
};
// Méthode pour obtenir les données publiques (sans passwordHash)
userSchema.methods.toPublicJSON = function () {
    const userObject = this.toObject();
    delete userObject.passwordHash;
    return userObject;
};
export const User = model('User', userSchema);
//# sourceMappingURL=user.model.js.map