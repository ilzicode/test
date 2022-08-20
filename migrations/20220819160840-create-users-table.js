'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users', {

      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true
      },

      first_name: {
        type: Sequelize.STRING,
        allowNull: true
      },

      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },

      birthday_date: {
        type: Sequelize.DATE,
        allowNull: true
      },

      timezone_offset: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      sending_email_server_time: {
        type: Sequelize.DATE,
        allowNull: true
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },


    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
