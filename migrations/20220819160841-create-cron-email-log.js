'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('cron_email_log', {

      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      sending_email_server_time: {
        type: Sequelize.DATE,
        allowNull: true
      },

      type: {
        type: Sequelize.STRING,
        allowNull: true
      },

      users_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      is_send: {
        type: Sequelize.STRING,
        allowNull: true
      },

      year: {
        type: Sequelize.STRING,
        allowNull: true
      },

      response: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('cron_email_log');
  }
};
