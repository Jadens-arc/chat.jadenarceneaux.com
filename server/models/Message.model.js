import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import User from './User.model.js';
import Channel from './Channel.model.js';


const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
}, {
  timestamps: true,
}); 

Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });
Message.belongsTo(Channel, { foreignKey: 'channelId', as: 'channel' });
Channel.hasMany(Message, { foreignKey: 'channelId', as: 'messages' });



export default Message;