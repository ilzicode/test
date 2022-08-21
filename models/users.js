
module.exports =(Sequelize, DataTypes)=>{

    const users= Sequelize.define(
        "users",
        {

            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            email: {
                type: DataTypes.STRING,
                allowNull: true
            },

            firstName: {
                type: DataTypes.STRING,
                allowNull: true
            },

            lastName: {
                type: DataTypes.STRING,
                allowNull: true
            },

            birthdayDate: {
                type: DataTypes.DATE,
                allowNull: true
            },

            timezoneOffset: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            sendingEmailServerTime: {
                type: DataTypes.DATE,
                allowNull: true
            },

        },
        {
            tableName: 'users',
            underscored: true,
            initialAutoIncrement: 1
        }
    );
        return users;
};


