import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import * as path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const entitiesPath = isProduction
  ? path.join(__dirname, 'database', 'entities', '*.entity.js')
  : path.join(__dirname, 'database', 'entities', '*.entity.ts');

const migrationsPath = isProduction
  ? path.join(__dirname, 'database', 'migrations', '*.js')
  : path.join(__dirname, 'database', 'migrations', '*.ts');

const ConfigDataSource: DataSourceOptions = {
  type: 'postgres',
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  host: process.env.DB_HOST_DEPLOY,
  port: Number(process.env.DB_PORT_DEPLOY),
  username: process.env.DB_USERNAME_DEPLOY,
  password: process.env.DB_PASSWORD_DEPLOY,
  database: process.env.DB_DATABASE_DEPLOY,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  ssl: {
    rejectUnauthorized: false,
  },
  schema: process.env.DB_SCHEMA,
};

export const dataSource = new DataSource(ConfigDataSource);
