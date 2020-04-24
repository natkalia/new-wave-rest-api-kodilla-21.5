const express = require('express');
const cors = require('cors');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const path = require('path');

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

// serve static files from the React app (setup for heroku)
app.use(express.static(path.join(__dirname, '/client/build')));

// add routes from external files
app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

// endpoint sending whole front app (setup for heroku)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// catch incorrect requests
app.use((req, res, next) => {
  res.status(404).send({ message: 'Not found...' });
});

// if heroku, take port from heroku environment variables, otherwise localhost:8000
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});