import 'reflect-metadata';
import 'dotenv/config';
import { Products } from '@modules/products/infra/typeorm/models/Products';
import { User } from '@modules/users/infra/typeorm/models/User';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host:
    process.env.NODE_ENV === 'test'
      ? 'localhost'
      : process.env.POSTGRES_DB_HOST,
  port: Number(process.env.POSTGRES_DB_PORT || 5432),
  username: process.env.POSTGRES_DB_USERNAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? 'projeto2_test'
      : process.env.POSTGRES_DB_DATABASE,
  entities: [User, Products],
  migrations: [`./dist/src/shared/infra/typeorm/migrations/*.js`],
};

export const AppDataSource = new DataSource(dataSourceOptions);
