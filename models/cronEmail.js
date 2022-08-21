'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

	class cronEmail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	cronEmail.init({

		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		type: {
			type: DataTypes.STRING,
			allowNull: false
		},

		usersId: {
			type: DataTypes.INTEGER,
			allowNull: true
		},

        isSuccess: {
			type: DataTypes.INTEGER,
			allowNull: true
		},

		year: {
			type: DataTypes.STRING,
			allowNull: true
		},

		sendingEmailServerTime: {
			type: DataTypes.STRING,
			allowNull: true
		},


	}, {
		sequelize,
		modelName: 'cronEmail',
		tableName: 'cron_email',
		underscored: true,
	});


	return cronEmail;
};