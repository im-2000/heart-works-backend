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

// PATCH - update space details

router.patch("/:id", async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id, { include: [Bid] });
  // if (!artwork.userId === req.user.id) {
  //   return res
  //     .status(403)
  //     .send({ message: "You are not authorized to update this space" });
  // }

  const hearts = artwork.hearts + 1;

  await artwork.update({ hearts });
  console.log("artwork", artwork);
  return res.status(200).send({ artwork });
});

module.exports = router;
