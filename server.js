require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT
const app = express()
const methodOverride = require('method-override');

/// MODELS
const Flavors = require('./models/flavors');

/// DATABASE
const mongoURI = process.env.MONGODBURI
const db = mongoose.connection
mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})

db.on('error',(err)=>{console.log('ERROR! ' + err.message)})
db.on('connected',()=>{console.log('mongo is connected')})
db.on('disconnected',()=>{console.log('mongo is disconnected')})

/// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

/// CONTROLLERS
const flavorsController = require('./controllers/flavors');
app.use('/flavors',flavorsController)

/// LISTENER
app.listen(PORT, ()=>{
    console.log('Listening for '+PORT+' melting icecream cones...');
})