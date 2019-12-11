const dotenv = require('dotenv');

dotenv.config();

const { env } = process;
const dbPort = env.DATABASE_PORT || '5432';
const dialect = env.DATABASE_DIALECT || 'postgres';
module.exports = {
  development: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    port: dbPort,
    dialect,
  },
  test: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    port: dbPort,
    dialect,
  },
  staging: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    port: dbPort,
    dialect,
  },
  production: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    port: dbPort,
    dialect,
  },
};
