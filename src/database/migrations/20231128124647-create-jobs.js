'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('jobs', {
      id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title :{
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      image :{
        type: Sequelize.STRING,
        allowNull: true
      }, 
      description :{
        type: Sequelize.STRING,
        allowNull: true
      }, 
      address :{
        type: Sequelize.STRING,
        allowNull: false
      },
      remuneration :{
        type: Sequelize.NUMBER,
        allowNull: false
      }, 
       authorId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('jobs');
  }
};
