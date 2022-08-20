
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

            location: {
                type: DataTypes.STRING,
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