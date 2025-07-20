import sequelize from '../config/database.js'; 
import User from './User.model.js';
import Channel from './Channel.model.js';

const UserChannel = sequelize.define('UserChannel', { }, { timestamps: false }); 

User.belongsToMany(Channel, { through: UserChannel, as: 'channels' });
Channel.belongsToMany(User, { through: UserChannel, as: 'users' });

export default UserChannel;