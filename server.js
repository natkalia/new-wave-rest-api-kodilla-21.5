const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const uuid = require('uuid');
const testimonialsRoutes = require('./routes/testimonials.routes');

const app = express();

// middleware enabling all CORS Requests
app.use(cors());

// middleware to be able to use urlencoded form of requests
// extended not useful at this stage
app.use(express.urlencoded({ extended: false }));

// middleware to be able to get json responses (e.g. from form-data)
app.use(express.json());

// middleware enabling all CORS Requests
app.use(cors());

// add routes from external files
app.use('/api', testimonialsRoutes); // add testimonials routes to server
// app.use('/api', concertsRoutes); // add concerts routes to server
// app.use('/api', seatsRoutes); // add seats routes to server

// catch incorrect requests
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('CORS-enabled web server is listening on port: 8000');
});