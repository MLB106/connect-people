// src/models/socialLink.model.ts
import { Schema, model } from 'mongoose';
const socialLinkSchema = new Schema({
    platform: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
        required: true,
        trim: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    collection: 'socialLinks',
});
export const SocialLink = model('SocialLink', socialLinkSchema);
//# sourceMappingURL=socialLink.model.js.map