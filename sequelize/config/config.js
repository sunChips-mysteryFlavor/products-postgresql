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
    username: process.env.dbuser,
    password: process.env.dbpassword,
    port: 5432,
    database: 'products',
    host: '54.88.155.195',
    dialect: 'postgres',
  },
};
