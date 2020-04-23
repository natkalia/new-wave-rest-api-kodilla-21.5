const express = require("express");
const db = require("./../db");
const uuid = require('uuid');

// prepare empty router
const router = express.Router();

// get all concerts from db
router.route("/concerts").get((req, res, next) => {
  res.json(db.concerts);
});

// get concert with chosen id or random
router.route("/concerts/:id").get((req, res, next) => {
  const id = req.params.id;
  let result;
  if (id === "random") {
    let index = Math.floor(Math.random() * db.concerts.length);
    console.log(index);
    result = db.concerts[index];
  } else {
    result = db.concerts.filter((el) => {
      return el.id == id;
    });
  }
  res.json(result);
});

// post new concert with uuid generated id
router.route("/concerts").post((req, res, next) => {
  randomId = uuid.v4();
  db.concerts.push({
    id: randomId,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  });
  res.json({ message: "OK" });
});

// edit existing concert using its id
router.route("/concerts/:id").put((req, res, next) => {
  const id = req.params.id;
  db.concerts.map((el) => {
    if (el.id == id) {
    el.performer = req.body.performer;
    el.genre = req.body.genre;
    el.price = req.body.price;
    el.day = req.body.day;
    el.image = req.body.image;
    }
    return el;
  });
  res.json({ message: "OK" });
});

// delete existing concert using its id
router.route("/concerts/:id").delete((req, res, next) => {
  const id = req.params.id;
  const concert = db.concerts.filter((el) => el.id == id);
  const index = db.concerts.indexOf(concert[0]);
  db.concerts.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
