import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://express:1bACnLFEssTdactr@localhost:5432/chatjadenarceneaux', {
  logging: false,
});

export default sequelize;