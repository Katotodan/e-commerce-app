const productModel = require('../DB/model')

const getAllProducts = async(req,res,next) =>{
    try {
        const allProducts = await productModel.find()
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}
const getProductById = async(req,res, next) =>{
    try {   
        const id = req.params.id
        console.log(id)
    } catch (error) {
        
    }
}
const getProduct = async(req,res,next) =>{
    try {
        // Any query params
        const {name, campany,price,rate, id} = req.query
        let queryParams = {}
        if(name) queryParams.name = name
        if(campany) queryParams.company = campany
        if(price) queryParams.price = price
        if(rate) queryParams.rate = rate
        if(id) queryParams._id = id
        const product = await productModel.find(queryParams)
        res.status(200).send(product)
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}
const addProduct = async(req,res,next) =>{
    try {
        const product = await productModel.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}
const updateProduct = async(req, res, next) =>{
    try {
        const product = await productModel
        .findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}

const deleteProduct = async(req, res, next) =>{
    try {
        const product = await productModel.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({
            status: "deleted successfully",
            [product.name]: "has been deleted"
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}


module.exports = {addProduct, getProduct, getAllProducts, updateProduct, deleteProduct, getProductById}

