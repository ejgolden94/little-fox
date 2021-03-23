const mongoose = require('mongoose');
const {Schema, model} = mongoose

const orderSchema = new Schema ({
    orderItems: [{
        product: String,
        quantity: Number,
        price: Number
    }], 
    orderName: String,
    user: {type: String, required: true},
    orderStatus: String,
    pickUpTime: String,
    pickUpDate: Date,
    orderTotal: Number
})

const Order = model('Order', orderSchema)

module.exports = Order