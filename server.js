require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT
const app = express()
const methodOverride = require('method-override');

/// MIDDLEWARE

/// ROUTES

/// LISTENER
app.listen(PORT, ()=>{
    console.log('Listening for '+PORT+' melting icecream cones...');
})