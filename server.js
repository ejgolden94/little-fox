require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT
const app = express()
const methodOverride = require('method-override');

/// MODLES
const Flavors = require('./models/flavors');

/// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

/// CONTROLLERS
const flavorsController = require('./controllers/flavors');
app.use('/flavors',flavorsController)

/// LISTENER
app.listen(PORT, ()=>{
    console.log('Listening for '+PORT+' melting icecream cones...');
})