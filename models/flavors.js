const mongoose = require('mongoose');
const {Schema, model} = mongoose

const flavorSchema = new Schema ({
        flavor: {type: String, unique: true, required: true},
        description: String,
        price: {type: Number, required: true, min: 0}, 
        available: {type: Boolean, default: true},
        glutenFree: {type: Boolean, default: false},
        plantBased: {type: Boolean, default: false},
        allergens: Array,  
        img: {data: Buffer, contentType: String}
})

const Flavors = model('Flavor', flavorSchema)

module.exports = Flavors