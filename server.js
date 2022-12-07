//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const cors = require('cors')
const Music = require('./models/music.js')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
  console.log('connected')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(cors())

//___________________
// Routes
//___________________
//localhost:3000
app.post('/music', (req,res) => {
  Music.create(req.body, (err, createdMusic) => {
      res.json(createdMusic)
  })
})

app.get('/music', (req,res) => {
  Music.find({}, (err, foundMusic) => {
      res.json(foundMusic)
  })
})


app.delete('/music/:id', (req, res) => {
  Music.findByIdAndRemove(req.params.id, (err, deletedMusic) => {
    res.json(deletedMusic)
  })
})

app.put('/music/:id', (req, res) => {
  Music.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedMusic) => {
    res.json(updatedMusic)
  })
})


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));