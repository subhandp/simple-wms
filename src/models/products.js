const sequelizePaginate = require('sequelize-paginate')
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Users, {
                foreignKey: 'UsersId'
            })

            this.hasMany(models.Product_in, {
                foreignKey: 'ProductsId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                hooks: true
            })

            this.hasMany(models.Product_out, {
                foreignKey: 'ProductsId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                hooks: true
            })


        }
    };
    Products.init({
        name: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        UsersId: DataTypes.INTEGER,
        urlImage: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Products',
    });

    sequelizePaginate.paginate(Products)
    return Products;
};