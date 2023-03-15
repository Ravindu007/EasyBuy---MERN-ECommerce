const express = require("express")
const multer = require("multer")


// controllers
const {getAllSellerProducts, createSellerProduct} = require("../../controllers/sellerControllers")

const router = express.Router()


// productMulter 
const uploadProduct = multer({
  storage:multer.memoryStorage()
})


// get all products listed by the seller 
router.get("/seller/getAllProducts", getAllSellerProducts )

// creating a product 
router.post("/seller/createProduct", uploadProduct.array('productImage',3), createSellerProduct)

module.exports = router