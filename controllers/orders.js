const express = require('express');
const router = express.Router()
const Order = require('../models/orders');
const Flavors = require('../models/flavors');

/// ROUTES 


// Index Route for the Cart
// router.get('/:username/cart',(req,res)=>{
//     // find an order tied to the current user's name that is not submitted
//     // display a cart html page 
// })


// Add to Order Route 
router.get('/:username/:id/add',(req,res)=>{
    Flavors.findById(req.params.id,(err,foundFlavor)=>{
        const newOrderItem = {product: foundFlavor.flavor, qty: 1}
        Order.findOneAndUpdate(
            {user: req.params.username, orderStatus: 'in cart'},
            {$push:{orderItems: newOrderItem}, $inc:{orderTotal: foundFlavor.price}},
            {new: true},
            (err, updatedOrder)=>{
            if(updatedOrder){
                console.log(updatedOrder);
                res.redirect('back')
            } else {
                /// if no cart is found, create one
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
                        console.log("-----new cart------");
                        console.log(newOrder);
                        res.redirect('back')
                    }
                })
            }
        })
    })







    /// first i want to figure out if this user has a cart open (aka, order with status = 'in cart')
    /// if no then i want to create an order for this user and push this item to the orderItems array 
    // Order.find({user: req.params.username, orderStatus: 'in cart'}, (err, foundCart)=>{
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         // console.log(foundCart[0].orderStatus);
    //         Flavors.findById(req.params.id,(err,foundFlavor)=>{
    //             if(Object.keys(foundCart).length>0) {
    //                 // console.log("-----current cart------");
    //                 // console.log(foundCart);
    //                 foundCart[0].orderItems.push({product: foundFlavor.flavor, qty: 1})
    //                 console.log(foundCart[0].orderItems);
    //                 Order.findByIdAndUpdate(foundCart[0].id,{orderItems: foundCart[0].orderItems},{new: true},(err,updatedOrder)=>{
    //                     console.log(updatedOrder);
    //                     res.redirect('back')
    //                 })
    //             } else {
    //                 // if not, create a new order for that user
    //                 const newCart = {
    //                     orderItems: [{product: foundFlavor.flavor, qty: 1}], 
    //                     user: req.params.username,
    //                     orderStatus: 'in cart',
    //                     orderTotal: foundFlavor.price
    //                 }
    //                 // console.log(newOrder);
    //                 Order.create(newCart, (err,newOrder)=>{
    //                     if (err) {
    //                         console.log(err);
    //                     } else {
    //                         console.log("-----new cart------");
    //                         console.log(newOrder);
    //                         res.redirect('back')
    //                     }
    //                 })
    //             }

    //         })
    //     }
    // })

})


module.exports = router