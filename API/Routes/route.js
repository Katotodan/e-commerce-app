const express = require('express')
const {addProduct, getProduct, getAllProducts, updateProduct, deleteProduct, getProductById} = require('../Controller/product')
const router = express.Router()

router.route("/getallproducts").get(getAllProducts)
router.route("/getproduct").get(getProduct)
router.route("/addproduct").post(addProduct)
router.route("/updateproduct/:id").put(updateProduct)
router.route("/deleteproduct/:id").delete(deleteProduct)
router.route("/getproduct/:id").get(getProductById)

module.exports = router