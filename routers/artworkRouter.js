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

module.exports = router;
