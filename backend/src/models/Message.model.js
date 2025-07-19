import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 


const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
}, {
  timestamps: true,
}); 



export default Message;