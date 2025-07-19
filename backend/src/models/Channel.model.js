import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 


const Channel = sequelize.define('Channel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
}, {
  timestamps: true,
}); 

export default Channel;