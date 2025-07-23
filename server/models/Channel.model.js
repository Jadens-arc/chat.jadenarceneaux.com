import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import User from './User.model.js';


const Channel = sequelize.define('Channel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
}, {
  timestamps: true,
}); 

Channel.belongsTo(User, { foreignKey: 'ownerId' });

export default Channel;