// src/models/navOption.model.ts
import { Schema, model } from 'mongoose';
const navOptionSchema = new Schema({
    code: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
        ar: { type: String, required: true },
        de: { type: String, required: true },
        es: { type: String, required: true },
        it: { type: String, required: true },
        pt: { type: String, required: true },
    },
    menu: {
        type: String,
        enum: ['entreprendre', 'immobilier', 'traduction'],
        required: true,
    },
    parentCode: {
        type: String,
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
    collection: 'navOptions',
});
export const NavOption = model('NavOption', navOptionSchema);
//# sourceMappingURL=navOption.model.js.map