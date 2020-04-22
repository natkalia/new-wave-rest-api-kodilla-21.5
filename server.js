const express = require('express');
const cors = require('cors');
const { db } = require('./db');

const app = express();

// middleware to be able to use urlencoded form of requests
// extended for nested data now false
app.use(express.urlencoded({ extended: false }));

// middleware to be able to get json responses (e.g. from form-data)
app.use(express.json());

// middleware enabling all CORS Requests
app.use(cors());

// test endpoint
app.get('/', (req, res, next) => {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

// get all testimonials from db
app.get('/testimonials', (req, res, next) => {
  res.json(db);
})

// get testimonial with chosen id or random
app.get('/testimonials/:id', (req, res, next) => {
   let id = req.params.id;
   if (id === 'random') {
     id = Math.floor(Math.random() * db.length) + 1;
   }
   const result = db.filter(el => {
    return el.id == id;
   });
   // TODO: add error handling when no id
   res.json(result);
})

app.listen(8000, () => {
  console.log('CORD-enabled web server is listening on port: 8000');
});