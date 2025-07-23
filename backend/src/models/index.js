import sequelize from '../config/database.js';
import User from './User.model.js';
import UserChannel from './UserChannel.model.js';
import Channel from './Channel.model.js';
import Message from './Message.model.js';

const db = {
  sequelize,
  User,
  Channel,
  UserChannel,
  Message,
};

await sequelize.sync({ alter: true }); 

export default db;