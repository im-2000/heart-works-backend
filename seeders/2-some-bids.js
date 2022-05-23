"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "test1@test.com",
          amount: 10,
          artworkId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test2@test.com",
          amount: 10,
          artworkId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test3@test.com",
          amount: 10,
          artworkId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test4@test.com",
          amount: 10,
          artworkId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test5@test.com",
          amount: 10,
          artworkId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {});
  },
};
