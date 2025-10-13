// src/models/appStoreLink.model.ts
import { Schema, model } from 'mongoose';
const appStoreLinkSchema = new Schema({
    store: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
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
    collection: 'appStoreLinks',
});
export const AppStoreLink = model('AppStoreLink', appStoreLinkSchema);
//# sourceMappingURL=appStoreLink.model.js.map