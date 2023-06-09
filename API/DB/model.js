const mongoose = require('mongoose')

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    price:{
        type : Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now 
    },
    rate:{
        type: Number
    },
    campany:{
        type: String,
        required: true
    },
    images:{
        type: [String],
        default: undefined
    }
})

const productModel = mongoose.model('Product', productScheme)
module.exports = productModel