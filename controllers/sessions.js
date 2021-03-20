const express = require('express');
const router = express.Router()
const User = require('../models/users');
const bcrypt = require('bcrypt');

//ROUTES

// New Session Route --- AKA User Login
router.get('/new',(req,res)=>{
    res.render('/sessions/new.ejs',{
        title:'Login'
    })
})

// Create Session Route 
router.post('/',(req,res)=>{
    User.findOne({username: req.body.username},(err, foundUser)=>{
        if (err) {
            console.log(err);
        } else {
            if(foundUser){
                if(bcrypt.compareSync(foundUser.password, req.body.password)){
                    req.session.currentUser = foundUser.username
                    res.redirect('/flavors')
                } else {
                    res.send("Invlaid password")
                }
            } else {
                res.send("User not found")
            }
        }
    })
})


module.exports = router