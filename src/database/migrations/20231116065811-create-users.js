'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.createTable('users', {
    id : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: true
    },
    user_status : {
      type : Sequelize.STRING,
      allowNull: true
    },
    address : {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pin_code: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    nif: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    level: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    verification_by_email_token: {
      type: Sequelize.STRING,
      allowNull: true
    },
    verification_by_email_expires: {
      type: Sequelize.DATE,
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
