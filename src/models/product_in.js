'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product_in extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Products, {
                foreignKey: 'ProductsId'
            })
        }
    };
    Product_in.init({
        date: DataTypes.DATE,
        total: DataTypes.INTEGER,
        ProductsId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product_in',
    });
    return Product_in;
};