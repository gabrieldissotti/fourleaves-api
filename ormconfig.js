require('dotenv/config')

module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost123',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'fourleaves123',
  password: process.env.DATABASE_PASSWORD || 'fourleaves123',
  database: process.env.DATABASE_NAME || 'fourleaves123',
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: ["./src/models/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  logging: true,
  cli: {
    "migrationsDir": "./src/database/migrations"
  }
}
