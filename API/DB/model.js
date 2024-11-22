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
const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        default: true
    }
})

const productModel = mongoose.model('Product', productScheme)
const userModel = mongoose.model('User', userScheme)
module.exports = {productModel, userModel}