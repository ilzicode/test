module.exports =(sequelize, DataTypes)=>{

    const users= sequelize.define(
        "users",
        {

            // id:{
            //     type: DataTypes.INTEGER,
            //     primaryKey: true,
            //     autoIncreament: true,
            //     allowNull: true
            //   },

            timestamp:false,
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },

            first_name: {
                type: DataTypes.STRING,
                allowNull: true
            },

            last_name: {
                type: DataTypes.STRING,
                allowNull: true

            },

            birthday_date: {
                type: DataTypes.DATE,
                allowNull: true
            },

            location: {
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
            tableName: 'users',
        }
    );
        return users;
};