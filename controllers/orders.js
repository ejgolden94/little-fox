const express = require('express');
const router = express.Router()
const Order = require('../models/orders');
const Flavors = require('../models/flavors');

/// ROUTES 

// Index route for active orders
router.get('/active', (req,res)=>{
    Order.find({orderStatus: {$nin:['in cart', 'cancelled', 'picked up']}}, (err, foundOrders)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('orders/index.ejs',{
                currentUser: req.session.currentUser,
                title: 'Cart',
                orders: foundOrders
            })
        }
    })
})

// Index Route for the Cart
router.get('/:username/cart',(req,res)=>{
    // find an order tied to the current user's name that is not submitted
    // display a cart html page 
    Order.find({user: req.params.username, orderStatus: 'in cart'}, (err, foundCart)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('cart/index.ejs', {
                cart: foundCart[0],
                currentUser: req.session.currentUser,
                title: 'Cart'
            })
        }
    })
})

// Add to Cart Route 
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

// edit item From your cart
router.put('/:username/:id/:itemId/:action',(req, res)=>{
    if (req.params.action === 'remove') {
        Order.findByIdAndUpdate(req.params.id,{$pull:{orderItems:{ '_id': req.params.itemId }}}, { safe: true, upsert: true }, (err, updatedItem)=>{
            if (err) {
                console.log(err);
            } else {
                res.redirect('/orders/'+req.params.username+'/cart')
            }
        })
    } else if(req.params.action === 'inc') {
        Order.findOneAndUpdate({'_id': req.params.id,'orderItems._id': req.params.itemId },{$inc:{'orderItems.$.quantity': 1}}, (err, updatedItem)=>{
            if (err) {
                console.log(err);
            } else {
                res.redirect('/orders/'+req.params.username+'/cart')
            }
        })
    } else if(req.params.action === 'dec') {
        Order.findOneAndUpdate({'_id': req.params.id,'orderItems._id': req.params.itemId },{$inc:{'orderItems.$.quantity': -1}}, (err, updatedItem)=>{
            if (err) {
                console.log(err);
            } else {
                res.redirect('/orders/'+req.params.username+'/cart')
            }
        })
    }
})

/// Edit Order Route 
router.put('/:id/edit',(req,res)=>{
    Order.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updatedOrder)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/orders/active')
        }
    })
})

/// Place Order (Edit) Route 
router.put('/:id/placeOrder',(req,res)=>{
    req.body.orderStatus = 'pending'
    Order.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updatedOrder)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/orders/'+req.session.currentUser.username+'/cart')
        }
    })
})


module.exports = router