const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
projectData = [];

// port
const port = 3000

// listening
const listening = () => console.log(`Started on localhost:${port}`)

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// routes

app.get('/get', (req, res) => res.send(projectData));

const add = (req, res) => {
  const newObject = {
    zip: req.body.zip,
    feeling: req.body.feeling,
  };

  projectData.push(newObject);
  res.send(projectData);
}

app.post('/post', add);


// Initialize the main project folder
app.use(express.static('website'));

app.listen(port, listening);