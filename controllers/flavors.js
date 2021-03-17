const express = require('express');
const router = express.Router()
const Flavors = require('../models/flavors');
const flavorsSeed = require('../models/flavorsSeed');

//ROUTES 

// Flavors Index Route
router.get('/',(req,res)=>{
    res.render('index.ejs')
})

// Flavors Seed Route 
router.get('/seed',(req,res)=>{
    Flavors.create(flavorsSeed, (err, newFlavors)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(newFlavors);
        }
    })
})


module.exports = router