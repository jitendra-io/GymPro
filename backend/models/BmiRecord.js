import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const BmiRecord = sequelize.define('BmiRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  heightCm: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weightKg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  bmi: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recordedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'bmi_records',
  timestamps: true,
});

export default BmiRecord;

