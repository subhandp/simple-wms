'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
                fullName: 'subhan dinda putra',
                username: 'subhandp',
                email: 'subhan.dinda.putra@gmail.com',
                phone_number: '082134890325',
                salt: '***',
                password: '12345',
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'sutisna sulisto',
                username: 'sutisna',
                email: 'subhan.dinda.putra@gmail.com',
                phone_number: '082134890325',
                salt: '###',
                password: '12345',
                role: 'supplier',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'andi wirdani',
                username: 'andiwir',
                email: 'subhan.dinda.putra@gmail.com',
                phone_number: '082134890325',
                salt: '@@@',
                password: '12345',
                role: 'supplier',
                createdAt: new Date(),
                updatedAt: new Date()
            }

        ]);

    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};