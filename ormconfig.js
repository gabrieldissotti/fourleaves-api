require('dotenv/config')

const extensionFiles = process.env.NODE_ENV === 'development' ? '.ts' : '.js'

module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'fourleaves',
  password: process.env.DATABASE_PASSWORD || 'fourleaves',
  database: process.env.DATABASE_NAME || 'fourleaves',
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: [ "./src/models/*"+extensionFiles],
  migrations: ["./src/database/migrations/*"+extensionFiles],
  logging: true,
  cli: {
    "migrationsDir": "./src/database/migrations"
  }
}
