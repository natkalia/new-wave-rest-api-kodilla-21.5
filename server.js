const express = require('express');
const cors = require('cors');
const { db } = require('./db'); // TODO: change to const and refactor in endpoints
const uuid = require('uuid');

const app = express();

// middleware to be able to use urlencoded form of requests
// extended not useful at this stage
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
   const id = req.params.id;
   let result;
   if (id === 'random') {
     let index = Math.floor(Math.random() * db.length);
     console.log(index);
     result = db[index];
    } else {
      result = db.filter(el => {
        return el.id == id;
      });
    }
   res.json(result);
})

// post new testimonial with uuid generated id
app.post('/testimonials', (req, res, next) => {
  randomId = uuid.v4();
  db.push({id: randomId, author: req.body.author, text: req.body.text});
  res.json({message: 'OK'}); 
})

// edit existing testimonial using its id
app.put('/testimonials/:id', (req, res, next) => {
  const id = req.params.id;
  db.map(el => {
    if (el.id == id) {
      el.author = req.body.author;
      el.text = req.body.text;
    }
    return el;
  });
  res.json({message: 'OK'}); 
})

// delete existing testimonial using its id
app.delete('/testimonials/:id', (req, res, next) => {
  const id = req.params.id;
  const testimonial = db.filter(el => el.id == id);
  const index = db.indexOf(testimonial[0]);
  db.splice(index, 1);
  res.json({message: 'OK'}); 
}) 

// catch incorrect requests
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
  console.log('CORS-enabled web server is listening on port: 8000');
});