
module.exports =(Sequelize, DataTypes)=>{

    const cronEmailLog= Sequelize.define(
        "cronEmailLog",
        {

            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
              },

              users_id: {
                type: DataTypes.INTEGER,
                allowNull: true
              },

              is_send: {
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

              created_at: {
                type: DataTypes.DATE,
                allowNull: true
              },

              updated_at: {
                type: DataTypes.DATE,
                allowNull: true
              },

        },
        {
            tableName: 'cron_email_log',
            underscored: true,
            initialAutoIncrement: 1
        }
    );
        return cronEmailLog;
};