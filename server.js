const express = require('express');
const cors = require('cors');

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

app.listen(8000, () => {
  console.log('CORD-enabled web server is listening on port: 8000');
});