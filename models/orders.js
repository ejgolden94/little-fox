const mongoose = require('mongoose');
const {Schema, model} = mongoose

const orderSchema = new Schema ({
    orderItems: [{
        product: String,
        quantity: Number
    }], 
    orderName: String,
    user: {type: String, required: true},
    orderStatus: String,
    pickUpTime: Date,
    orderTotal: Number
})

const Order = model('Order', orderSchema)

module.exports = Order