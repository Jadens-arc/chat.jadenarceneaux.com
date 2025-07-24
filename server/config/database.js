import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  pool: {
    max: 1,
    min: 1,
    acquire: 30000,
    idle: 10000,
    evict: 10000,
  },
});

export default sequelize;