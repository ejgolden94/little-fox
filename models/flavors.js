const mongoose = require('mongoose');
const {Schema, model} = mongoose

const flavorSchema = new Schema ({
        flavor: {type: String, unique: true, required: true},
        description: String,
        price: {type: Number, required: true, min: 0}, 
        available: {type: Boolean, default: true},
        allergens: Array  
})

const Flavors = model('Flavor', flavorSchema)

module.exports = Flavors