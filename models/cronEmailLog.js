
module.exports =(Sequelize, DataTypes)=>{

    const cronEmailLog= Sequelize.define(
        "cronEmailLog",
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
              },

              usersId: {
                type: DataTypes.INTEGER,
                allowNull: true
              },

              isSend: {
                type: DataTypes.STRING,
                allowNull: true
              },

              type: {
                type: DataTypes.STRING,
                allowNull: true
              },

              response: {
                type: DataTypes.STRING,
                allowNull: true
              },
        },
        {
            // sequelize,
            // modelName: 'cronEmail',
            tableName: 'cron_email_log',
            underscored: true,
        }
    );

    return cronEmailLog;
};