// src/models/report.model.ts
import { Schema, model } from 'mongoose';
const reportSchema = new Schema({
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
export const Report = model('Report', reportSchema);
//# sourceMappingURL=report.model.js.map