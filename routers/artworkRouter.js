const { Router } = require("express");
const auth = require("../auth/middleware");
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;

const router = new Router();

// GET ALL ARTWORKS

router.get("/", async (req, res, next) => {
  try {
    res.send(await Artwork.findAll());
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Space id is not a number" });
  }

  const artwork = await Artwork.findByPk(id, {
    include: [Bid],
    // order: [[Story, "createdAt", "DESC"]],
  });

  if (artwork === null) {
    return res.status(404).send({ message: "Artwork not found" });
  }

  res.status(200).send({ message: "ok", artwork });
});

// PATCH - update details

router.patch("/:id", async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id, { include: [Bid] });

  const hearts = artwork.hearts + 1;

  await artwork.update({ hearts });

  return res.status(200).send({ artwork });
});

// POST a new artwork

router.post("/", async (req, res, next) => {
  try {
    const { title, minimumBid, imageUrl } = req.body;
    const artwork = await Artwork.findByPk(userId);
    if (!title || !minimumBid || !imageUrl) {
      res.status(400).send("missing parameters");
    }
    if (user) {
      const newArtwork = await Artwork.create({
        title,
        minimumBid,
        imageUrl,
      });
      res.send(newArtwork);
    } else {
      console.log(`User with this id: ${userId} doesn't exist`);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
