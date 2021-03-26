const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/users');
const userAdmins = require('../models/userAdmins');

// ROUTES

// New User Route
router.get('/new', (req,res)=>{
    res.render('users/new.ejs',{
        title: 'New User', 
        currentUser: req.session.currentUser
    })
})

// Create User Route
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    User.create(req.body, (err, newUser)=>{
        if (err) {
            if(err.code === 11000){
                res.send("That username is not available :(")
            }
        } else {
            console.log(newUser);
            res.redirect('/sessions/new')
        }
    })
})

// Manage Admin Users
router.get('/admins',(req,res)=>{
    User.updateMany({username: {$in : userAdmins}}, {$set:{isAdmin: true}}, (err,updatedUser)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(updatedUser);
            res.redirect('/')
        }
    })
})

module.exports = router