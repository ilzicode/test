
module.exports =(Sequelize, DataTypes)=>{

    const users= Sequelize.define(
        "users",
        {

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
            underscored: true
        }
    );
        return users;
};