const express = require('express');
const router = express.Router()
const User = require('../models/users');
const bcrypt = require('bcrypt');

//ROUTES

// New Session Route --- AKA User Login
router.get('/new',(req,res)=>{
    res.render('sessions/new.ejs',{
        title:'Login',
        currentUser: req.session.currentUser,
        message: ''
    })
})

// Create Session Route 
router.post('/',(req,res)=>{
    User.findOne({username: req.body.username},(err, foundUser)=>{
        if (err) {
            console.log(err);
        } else {
            if(foundUser){
                if(bcrypt.compareSync(req.body.password,foundUser.password)){
                    req.session.currentUser = foundUser
                    res.redirect('/flavors')
                } else {
                    res.render('sessions/new.ejs',{
                        title:'Login',
                        currentUser: req.session.currentUser,
                        message: "Invalid password :("
                    })
                }
            } else {
                res.render('sessions/new.ejs',{
                    title:'Login',
                    currentUser: req.session.currentUser,
                    message: "Username not found :("
                })
            }
        }
    })
})

/// Destroy Session Route 
router.delete('/',(req,res)=>{
    const loggedOutUser = req.session.currentUser.username
    req.session.destroy( err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully Logged Out: " + loggedOutUser);
        }
        res.redirect('/sessions/new')
    })
})


module.exports = router