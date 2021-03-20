require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT
const app = express()
const methodOverride = require('method-override');
const session = require('express-session');
const fs = require('fs');

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
app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: false
}))

/// CONTROLLERS
const flavorsController = require('./controllers/flavors');
const usersController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');
const ordersController = require('./controllers/orders');
app.use('/flavors',flavorsController)
app.use('/users',usersController)
app.use('/sessions',sessionsController)
app.use('/orders',ordersController)

/// ROUTES
// Home Route
app.get('/',(req,res)=>{
    res.render('home.ejs',{
        title: 'Home',
        currentUser: req.session.currentUser
    })
})

// Menu Route
app.get('/menu',(req,res)=>{
    const menuFile="./public/media/menu.pdf";
    fs.readFile(menuFile, (err,data)=>{
       res.contentType("application/pdf");
       res.send(data);
    })
})

/// LISTENER
app.listen(PORT, ()=>{
    console.log('Listening for '+PORT+' melting icecream cones...');
})