module.exports = {
  development: {
    username: 'samuelho',
    database: 'products',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
