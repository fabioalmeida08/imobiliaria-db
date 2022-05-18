import { DataSource } from 'typeorm'
import 'dotenv/config'

/*export const AppDataSource =
  process.env.NODE_ENV === 'test'
    ? new DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities: ['src/entities/*.*'],
        synchronize: true,
      })
    : new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
        synchronize:
          process.env.NODE_ENV === 'dev' ? true : false,
        logging: true,
        entities:
          process.env.NODE_ENV === 'production'
            ? ['dist/src/entities/*.js']
            : ['src/entities/*.ts'],
        migrations:
          process.env.NODE_ENV === 'production'
            ? ['dist/src/migrations/*.js']
            : ['src/migrations/*.ts'],
      })
*/

export const AppDataSource =
  process.env.NODE_ENV === 'test'
    ? new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: ['src/entities/*.*'],
        migrations: ['src/migrations/*.ts'],
        synchronize: true,
      })
    : new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
        synchronize: process.env.NODE_ENV === 'dev' ? true : false,
        logging: true,
        entities:
          process.env.NODE_ENV === 'production'
            ? ['dist/src/entities/*.js']
            : ['src/entities/*.ts'],
        migrations:
          process.env.NODE_ENV === 'production'
            ? ['dist/src/migrations/*.js']
            : ['src/migrations/*.ts'],
      })
