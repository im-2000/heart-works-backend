const { Router } = require("express");
const { user } = require("pg/lib/defaults");
const auth = require("../auth/middleware");
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;
const User = require("../models").user;

const router = new Router();

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

router.patch("/:id", async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id, { include: [Bid] });

  const hearts = artwork.hearts + 1;

  await artwork.update({ hearts });

  return res.status(200).send({ artwork });
});

router.post("/:id/bids", auth, async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id);
  const user = req.user;

  if (artwork === null) {
    return res.status(404).send({ message: "This artwork does not exist" });
  }

  if (!artwork.userId === req.userId) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this artwork" });
  }

  const { amount } = req.body;

  if (!amount) {
    return res.status(400).send({ message: "A bit must have a amount" });
  }

  const bid = await Bid.create({
    amount,
    email: user.email,
    artworkId: artwork.id,
  });

  return res.status(201).send({ message: "Bid created", bid });
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { title, minimumBid, imageUrl, userId } = req.body;
    const user = req.user;

    if (!title || !minimumBid || !imageUrl) {
      res.status(400).send("missing parameters");
    }
    if (user) {
      const newArtwork = await Artwork.create({
        title,
        minimumBid,
        imageUrl,
        userId: user.id,
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
