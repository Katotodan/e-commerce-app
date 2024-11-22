const express = require('express')
const {
    addProduct, 
    getProduct, 
    getAllProducts, 
    updateProduct, 
    deleteProduct, 
    getProductById
} = require('../Controller/product')
const { login, logOut, signUp } = require( '../Controller/auth')

const router = express.Router()

router.route("/getallproducts").get(getAllProducts)
router.route("/getproduct").get(getProduct)
router.route("/addproduct").post(addProduct)
router.route("/updateproduct/:id").put(updateProduct)
router.route("/deleteproduct/:id").delete(deleteProduct)
router.route("/getproduct/:id").get(getProductById)

// Auth
router.route("/login").post(login)
router.route("/logout").post(logOut)
router.route("/signup").post(signUp)

router.route("/token").get((req, res, next) =>{
    const token = req.headers
        res.json(req.headers)
    

    // if(!token){
    //     res.json({
    //         status: "no token"
    //     })
    // }
})

module.exports = router