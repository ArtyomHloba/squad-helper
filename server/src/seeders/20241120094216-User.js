'use strict';
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, CUSTOMER, CREATOR } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'buyer10',
          lastName: 'buyer10',
          displayName: 'buyer10',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'buyer10@gmail.com',
          role: CUSTOMER,
        },
        {
          firstName: 'creativefn',
          lastName: 'creativeln',
          displayName: 'creativedn',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'creative10@gmail.com',
          role: CREATOR,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Users',
      {
        email: {
          [Sequelize.Op.or]: ['buyer10@gmail.com', 'creative10@gmail.com'],
        },
      },
      {}
    );
  },
};
