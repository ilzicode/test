
module.exports =(Sequelize, DataTypes)=>{

    const cron= Sequelize.define(
        "cron",
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

              year: {
                type: DataTypes.STRING,
                allowNull: true
              },

              response: {
                type: DataTypes.STRING,
                allowNull: true
              },



        },
        {
            tableName: 'cron_email_log',
            underscored: true,
            initialAutoIncrement: 1
        }
    );

    return cron;
};