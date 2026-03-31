const { Sequelize } = require('sequelize');
require('dotenv').config();

const useSsl = process.env.DB_SSL === 'true' || (!process.env.DB_SSL && process.env.NODE_ENV === 'production');
const commonConfig = {
  dialect: 'postgres',
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  pool: {
    max: 20,
    min: 2,
    acquire: 30000,
    idle: 10000
  }
};

if (useSsl) {
  commonConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, commonConfig)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        ...commonConfig,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
      }
    );

module.exports = sequelize;
