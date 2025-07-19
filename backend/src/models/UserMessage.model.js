import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import User from './User.model.js';
import Message from './Message.model.js';


const UserMessage = sequelize.define('UserMessage', { }, { timestamps: false }); 

User.belongsToMany(Channel, { through: UserMessage });
Message.belongsToMany(User, { through: UserMessage });

export default UserMessage;