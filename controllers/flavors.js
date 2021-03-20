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
                flavors: foundFlavors,
                title: 'Flavors',
                currentUser: req.session.currentUser
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
    res.render('new.ejs',{
        title: 'New Flavor',
        currentUser: req.session.currentUser
    })
})

// Flavors Show Route 
router.get('/:id',(req,res)=>{
    Flavors.findById(req.params.id,(err,foundFlavor)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('show.ejs',{
                flavor: foundFlavor,
                title: foundFlavor.flavor,
                currentUser: req.session.currentUser
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

// Flavors Edit Route 
router.get('/:id/edit', (req, res)=>{
    Flavors.findById(req.params.id, (err,foundFlavor)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('edit.ejs',{
                flavor: foundFlavor,
                title: 'Edit Flavor',
                currentUser: req.session.currentUser
            })
        }
    })
})

// Flavors Update Route
router.put('/:id',upload.single('img'),(req,res,next)=>{
    req.body.glutenFree = (req.body.glutenFree === 'on')
    req.body.plantBased = (req.body.plantBased === 'on')
    req.body.available = (req.body.available === 'on')
    /// making sure that the user does not have to provide a photo input every time they want to edit a record
    if (! req.body.img){
        Flavors.findById(req.params.id,(err,foundFlavor)=>{
            if (err) {
                console.log(err);
            } else {
                req.body.img = foundFlavor.img
            }
        })
    } else {
        req.body.img = {
            data: req.file.buffer,
            contentType: 'image/jpeg'
        }
    }
    Flavors.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updatedFlavor)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(updatedFlavor);
            res.redirect('/flavors/'+req.params.id)
        }
    })
})

// Flavors Destroy Route 
router.delete('/:id',(req,res)=>{
    Flavors.findByIdAndDelete(req.params.id,(err, deletedFlavor)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(deletedFlavor);
            res.redirect('/flavors')
        }
    })
})


module.exports = router