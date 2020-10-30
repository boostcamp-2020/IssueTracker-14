require("dotenv").config();

module.exports = {
  development: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    operatorAlias: false,
    dialect: "mysql",
    timezone: "+09:00",
  },
  production: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    operatorAlias: false,
    dialect: "mysql",
    timezone: "+09:00",
  },
};
