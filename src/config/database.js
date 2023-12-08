require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const { Sequelize } = require('sequelize');

// Connection parameters
// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   dialect: process.env.DB_DIALECT || "postgres",
//   storage: "./__tests__/database.sqlite",
//   operatorsAliases: 0,
//   logging: false,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// });

// const testDbConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// module.exports = { db: sequelize, testDbConnection };

// with URI
// const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI)

// require('dotenv').config({
//   path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
// });

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || "postgres",
  storage: "./__tests__/database.sqlite",
  operatorsAliases: 0,
  ssl: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle_timeout: 3000
    // idle: 10000
  }
};
