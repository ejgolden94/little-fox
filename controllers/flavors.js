const express = require('express');
const router = express.Router()

//ROUTES 

// Flavors Index Route
router.get('/',(req,res)=>{
    res.render('index.ejs')
})




module.exports = router