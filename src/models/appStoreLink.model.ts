// src/models/appStoreLink.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IAppStoreLink extends Document {
  store: string;
  url: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const appStoreLinkSchema = new Schema<IAppStoreLink>({
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

export const AppStoreLink = model<IAppStoreLink>('AppStoreLink', appStoreLinkSchema);






