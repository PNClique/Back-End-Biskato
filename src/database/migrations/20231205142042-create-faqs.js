"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("faqs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      asked: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "professions",
          },
          key: "id",
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('faqs');
  },
};
