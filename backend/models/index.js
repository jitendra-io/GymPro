import { sequelize, ensureDatabaseExists } from '../config/db.js';
import User from './User.js';
import Member from './Member.js';
import GymClass from './GymClass.js';
import Workout from './Workout.js';
import BmiRecord from './BmiRecord.js';

export async function syncDatabase(alter = false) {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  await sequelize.sync({ alter });
  console.log('✅ MySQL Database & Tables synchronized successfully via Sequelize ORM');
}

export {
  sequelize,
  User,
  Member,
  GymClass,
  Workout,
  BmiRecord,
};

export default {
  sequelize,
  syncDatabase,
  User,
  Member,
  GymClass,
  Workout,
  BmiRecord,
};
