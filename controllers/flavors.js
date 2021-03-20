const express = require('express');
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = express.Router()
const Flavors = require('../models/flavors');
const flavorsSeed = require('../models/flavorsSeed');

//ROUTES 

// Flavors Index Route
router.get('/',(req,res)=>{
    Flavors.find({},(err,foundFlavors)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('index.ejs',{
                flavors: foundFlavors
            })
        }
    })
})

// Flavors Seed Route 
router.get('/seed',(req,res)=>{
    Flavors.create(flavorsSeed, (err, newFlavors)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(newFlavors);
            res.redirect('/flavors')
        }
    })
})

// Flavors New route 
router.get('/new',(req,res)=>{
    res.render('new.ejs')
})

// Flavors Show Route 
router.get('/:id',(req,res)=>{
    Flavors.findById(req.params.id,(err,foundFlavor)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('show.ejs',{
                flavor: foundFlavor
            })
        }
    })
})

// Flavors Create Route
router.post('/',upload.single('img'),(req,res,next)=>{
    req.body.glutenFree = (req.body.glutenFree === 'on')
    req.body.plantBased = (req.body.plantBased === 'on')
    req.body.available = true
    req.body.img = {
        data: req.file.buffer,
        contentType: 'image/jpeg'
    }
    Flavors.create(req.body,(err,newFlavor)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/flavors')
        }
    })
})


module.exports = router