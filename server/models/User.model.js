import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


let User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  publicKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  privateKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  iv: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

User.prototype.getSafeAttributes = function() {
  return {
    id: this.id,
    username: this.username,
    email: this.email
  };
};

export default User;
