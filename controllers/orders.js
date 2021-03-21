const express = require('express');
const router = express.Router()
const Order = require('../models/orders');
const Flavors = require('../models/flavors');

/// ROUTES 


// Index Route for the Cart
router.get('/:username/cart',(req,res)=>{
    // find an order tied to the current user's name that is not submitted
    // display a cart html page 
    Order.find({user: req.params.username, orderStatus: 'in cart'}, (err, foundCart)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(foundCart[0].orderItems)
            res.render('cart/index.ejs', {
                cart: foundCart[0],
                currentUser: req.session.currentUser,
                title: 'Cart'
            })
        }
    })
})


// Add to Order Route 
router.get('/:username/:id/add',(req,res)=>{
    Flavors.findById(req.params.id,(err,foundFlavor)=>{
        const newOrderItem = {product: foundFlavor.flavor, quantity: 1}
        Order.findOneAndUpdate(
            {user: req.params.username, orderStatus: 'in cart'},
            {$push:{orderItems: newOrderItem}, $inc:{orderTotal: foundFlavor.price}},
            {new: true},
            (err, updatedOrder)=>{
                if(updatedOrder){
                    console.log(updatedOrder);
                    res.redirect('back')
                } else {
                    /// if no cart is found to add to, create one
                    const newCart = {
                        orderItems: [newOrderItem], 
                        user: req.params.username,
                        orderStatus: 'in cart',
                        orderTotal: foundFlavor.price
                    }
                    Order.create(newCart, (err,newOrder)=>{
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(newOrder);
                            res.redirect('back')
                        }
                    })
                }
            })
    })
})


module.exports = router