// src/models/adminUser.model.ts
import { Schema, model } from 'mongoose';
const adminUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: [
            'president',
            'director',
            'sub-director',
            'agent-press',
            'agent-maintenance',
            'agent-administratif',
            'conseiller',
            'commercial',
            'agent-litige',
            'agent-securite',
            'responsable',
            'moderator',
            'codeur',
        ],
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    totpSecret: {
        type: String,
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true,
    collection: 'adminUsers',
});
export const AdminUser = model('AdminUser', adminUserSchema);
//# sourceMappingURL=adminUser.model.js.map