// TypeORM cli configuration
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_DSN,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};
