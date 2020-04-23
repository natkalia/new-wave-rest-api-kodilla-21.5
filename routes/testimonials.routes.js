const express = require("express");
const db = require("./../db");
const uuid = require('uuid');

// prepare empty router
const router = express.Router();

// get all testimonials from db
router.route("/testimonials").get((req, res, next) => {
  res.json(db.testimonials);
});

// get testimonial with chosen id or random
router.route("/testimonials/:id").get((req, res, next) => {
  const id = req.params.id;
  let result;
  if (id === "random") {
    let index = Math.floor(Math.random() * db.testimonials.length);
    console.log(index);
    result = db.testimonials[index];
  } else {
    result = db.testimonials.filter((el) => {
      return el.id == id;
    });
  }
  res.json(result);
});

// post new testimonial with uuid generated id
router.route("/testimonials").post((req, res, next) => {
  randomId = uuid.v4();
  db.testimonials.push({
    id: randomId,
    author: req.body.author,
    text: req.body.text,
  });
  res.json({ message: "OK" });
});

// edit existing testimonial using its id
router.route("/testimonials/:id").put((req, res, next) => {
  const id = req.params.id;
  db.testimonials.map((el) => {
    if (el.id == id) {
      el.author = req.body.author;
      el.text = req.body.text;
    }
    return el;
  });
  res.json({ message: "OK" });
});

// delete existing testimonial using its id
router.route("/testimonials/:id").delete((req, res, next) => {
  const id = req.params.id;
  const testimonial = db.testimonials.filter((el) => el.id == id);
  const index = db.testimonials.indexOf(testimonial[0]);
  db.testimonials.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
