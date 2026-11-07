import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plan: {
    type: DataTypes.ENUM('Basic', 'Standard', 'Premium', 'VIP'),
    defaultValue: 'Standard',
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'Pending'),
    defaultValue: 'Active',
  },
  joinDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'members',
  timestamps: true,
});

export default Member;

