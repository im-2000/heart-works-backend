"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "artworks",
      [
        {
          title: "Title 1",
          imageUrl: "https://iiif.micr.io/MHQNj/full/200,/0/default.webp",
          hearts: 5,
          minimumBid: 10,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Title 2",
          imageUrl: "https://iiif.micr.io/pFHsV/full/200,/0/default.webp",
          hearts: 4,
          minimumBid: 20,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Title 3",
          imageUrl: "https://iiif.micr.io/MkOOQ/full/200,/0/default.webp",
          hearts: 3,
          minimumBid: 15,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("artworks", null, {});
  },
};
