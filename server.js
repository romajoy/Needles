//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const Needle = require('./models/schema.js');
const seedNeedle = require ('./models/seed.js');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

// app.put('/needles/:id', (req, res) => {
//   Needle.findByIdAndUpdate(req.params.id, req.body, {new: true},  (err, needleUpdate) => {
//     res.redirect('/needles/')
//   })
// })

// app.get('/needles/:id/edit', (req, res) => {
//   Needle.findById(req.params.id, (err, foundNeedle) => {
//     res.render('edit.ejs', {
//       needles: foundNeedle
//     })
//   })
// })

// app.delete('/needles/:id', (req, res) => {
//   Needle.findByIdAndRemove(req.params.id, (err, badNeedle => {
//     res.redirect('/needles')
//   }))
// })

app.get('/needles/new', (req, res) => {
  res.render('new.ejs')
})

app.get('/needles/:id', (req, res) => {
  Needle.findById (req.params.id, (err, myNeedle) => {
    res.render('show.ejs', 
    {
      needle: myNeedle
    })
  })
})

app.post('/needles', (res, req) => {
  if(req.body.setComplete === 'on') {
    req.body.setComplete = true;
  } else {
    req.body.setComplete = false;
  };
  // if(req.body.inUse === 'on') {
  //   req.body.inUse = true;
  // } else {
  //   req.body.inUse = false;
  // };
  // if(req.body.replace === 'on') {
  //   req.body.replace = true;
  // } else {
  //   req.body.replace = false;
  // };
  // if(req.body.favorite === 'on') {
  //   req.body.favorite = true;
  // } else {
  //   req.body.favorite = false;
  // };
  Needle.create(req.body, (err, newNeedle) => {
    res.redirect('/needles')
  })
})

// app.get('/needles/seed', (req, res) => {
//   Needle.create(seedNeedle, (err, data) => {
//     if (err) console.log (err.message);
//     console.log('Needles added to stash')
//   })
//   res.redirect('/needles')
// })

app.get('/needles', (req, res) => {
  Needle.find({}, (error, needleMinder) => {
    res.render('index.ejs', 
      {
        needle:needleMinder
      }
    )
  })
})



// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

