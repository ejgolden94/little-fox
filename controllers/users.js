const express = require('express');
const router = express.Router()
const User = require('../models/users');

// ROUTES

// New User Route

router.get('/new', (req,res)=>{
    res.render('users/new.ejs',{
        title: 'New User'
    })
})

module.exports = router