const express = require("express");
const db = require("./../db");
const uuid = require('uuid');

// prepare empty router
const router = express.Router();

// get all seats from db
router.route("/seats").get((req, res, next) => {
  res.json(db.seats);
});

// get seat with chosen id or random
router.route("/seats/:id").get((req, res, next) => {
  const id = req.params.id;
  let result;
  if (id === "random") {
    let index = Math.floor(Math.random() * db.seats.length);
    console.log(index);
    result = db.seats[index];
  } else {
    result = db.seats.filter((el) => {
      return el.id == id;
    });
  }
  res.json(result);
});

// post new seat with uuid generated id
router.route("/seats").post((req, res, next) => {
  let ifSeatFree = true;
  db.seats.forEach(seat => {
    if ((seat.day == req.body.day) && (seat.seat == req.body.seat)) {
      ifSeatFree = false;
      res.status(404).json({ message: 'The slot is already taken...' }); // TODO: check if error code ok
    }
  });
  if (ifSeatFree) {
    randomId = uuid.v4();
    db.seats.push({
      id: randomId,
      day: req.body.day,
      seat: req.body.seat,
      client: req.body.client,
      email: req.body.email,
    });
    res.json({ message: "OK" })
  }
});

// edit existing seat using its id
router.route("/seats/:id").put((req, res, next) => {
  const id = req.params.id;
  db.seats.map((el) => {
    if (el.id == id) {
    el.day = req.body.day;
    el.seat = req.body.seat;
    el.client = req.body.client;
    el.email = req.body.email;
    }
    return el;
  });
  res.json({ message: "OK" });
});

// delete existing seat using its id
router.route("/seats/:id").delete((req, res, next) => {
  const id = req.params.id;
  const seat = db.seats.filter((el) => el.id == id);
  const index = db.seats.indexOf(seat[0]);
  db.seats.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
