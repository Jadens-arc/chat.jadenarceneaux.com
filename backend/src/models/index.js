import sequelize from '../config/database.js';
import User from './user.model.js';

const db = {
  sequelize,
  User,
};

await sequelize.sync({ alter: true }); // only in dev

export default db;