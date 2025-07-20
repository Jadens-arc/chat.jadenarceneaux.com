import sequelize from '../config/database.js'; 
import User from './User.model.js';
import Channel from './Channel.model.js';

const UserChannel = sequelize.define('UserChannel', { }, { timestamps: false }); 

User.belongsToMany(Channel, { through: UserChannel });
Channel.belongsToMany(User, { through: UserChannel });

export default UserChannel;