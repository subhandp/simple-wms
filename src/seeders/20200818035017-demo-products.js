'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Products', [{
                name: 'molto',
                stock: 10,
                price: 5000,
                UsersId: 2,
                urlImage: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'sabun cuci',
                stock: 5,
                price: 2000,
                UsersId: 2,
                urlImage: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'kain pel',
                stock: 2,
                price: 50000,
                UsersId: 3,
                urlImage: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Products', null, {});
    }
};