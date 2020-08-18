'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Products, {
                foreignKey: 'UsersId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                hooks: true
            })
        }
    };
    Users.init({
        fullName: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        salt: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Users',
    });
    return Users;
};