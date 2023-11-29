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
    address : {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_admin: {
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
