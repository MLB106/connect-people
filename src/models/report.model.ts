// src/models/report.model.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kind: {
    type: DataTypes.ENUM('message', 'voice', 'photo', 'video'),
    allowNull: false,
  },
  evidence: {
    type: DataTypes.TEXT,
  },
  reason: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'reports',
  timestamps: true,
});