import dotenv from 'dotenv';
dotenv.config();

const { env } = process;

export const {
  DATABASE_HOST = env.DATABASE_HOST || 'moberries-postgres',
  DATABASE_NAME = env.DATABASE_NAME || 'moberries',
  DATABASE_USERNAME = env.DATABASE_USERNAME || 'api',
  DATABASE_PASSWORD = env.DATABASE_PASSWORD || 'api',
  DATABASE_PORT = env.DATABASE_PORT || '5432',
  DATABASE_DIALECT = env.DATABASE_DIALECT || 'postgres',
  NODE_ENV = env.NODE_ENV || 'production',
  SERVER_ENDPOINT_SCHEME = env.SERVER_ENDPOINT_SCHEME || 'http',
  SERVER_ENDPOINT_HOST = env.SERVER_ENDPOINT_HOST || 'localhost',
  SERVER_ENDPOINT_PORT = env.SERVER_ENDPOINT_PORT || 8080,
  SERVER_OPEN_SWAGGER = env.SERVER_OPEN_SWAGGER || false,
} = env;
