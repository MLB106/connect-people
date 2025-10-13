// src/models/report.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IReport extends Document {
  userId: string;
  kind: 'message' | 'voice' | 'photo' | 'video';
  evidence?: string;
  reason?: string;
  status: 'pending' | 'reviewed';
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>({
  userId: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    enum: ['message', 'voice', 'photo', 'video'],
    required: true,
  },
  evidence: {
    type: String,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed'],
    default: 'pending',
  },
}, {
  timestamps: true,
  collection: 'reports',
});

export const Report = model<IReport>('Report', reportSchema);