// src/models/socialLink.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ISocialLink extends Document {
  platform: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const socialLinkSchema = new Schema<ISocialLink>({
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

export const SocialLink = model<ISocialLink>('SocialLink', socialLinkSchema);






