// src/models/searchCategory.model.ts
import { Schema, model } from 'mongoose';
const searchCategorySchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
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
    collection: 'searchCategories',
});
export const SearchCategory = model('SearchCategory', searchCategorySchema);
//# sourceMappingURL=searchCategory.model.js.map