import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const GymClass = sequelize.define('GymClass', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scheduleTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: 'All Levels',
  },
  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: 25,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: 'gym_classes',
  timestamps: true,
});

export default GymClass;

