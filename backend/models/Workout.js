import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Workout = sequelize.define('Workout', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  workoutType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  durationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 45,
  },
  caloriesBurned: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 300,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  workoutDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'workouts',
  timestamps: true,
});

export default Workout;

