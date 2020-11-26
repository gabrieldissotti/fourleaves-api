import { createConnection } from 'typeorm';

/* read ormconfig.json by default */
createConnection({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'fourleaves',
  password: process.env.DATABASE_PASSWORD || 'fourleaves',
  database: process.env.DATABASE_NAME || 'fourleaves',
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  logging: process.env.DATABASE_LOGGING === 'true',
  cli: {
    migrationsDir: './src/database/migrations',
  },
});
