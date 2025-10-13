// src/models/searchCategory.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ISearchCategory extends Document {
  code: string;
  name: {
    fr: string;
    en: string;
    ar: string;
    de: string;
    es: string;
    it: string;
    pt: string;
  };
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const searchCategorySchema = new Schema<ISearchCategory>({
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

export const SearchCategory = model<ISearchCategory>('SearchCategory', searchCategorySchema);






