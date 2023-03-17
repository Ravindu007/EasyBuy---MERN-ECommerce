const express = require("express")
const multer = require("multer")


// controllers
const {getAllSellerProducts, createSellerProduct, updateSellerProduct,deleteProduct} = require("../../controllers/sellerControllers")

const router = express.Router()


// productMulter 
const uploadProduct = multer({
  storage:multer.memoryStorage()
})


// get all products listed by the seller 
router.get("/getAllProducts", getAllSellerProducts )

// creating a product 
router.post('/createProduct', uploadProduct.fields([
  { name: 'productImage1' },
  { name: 'productImage2' },
  { name: 'productImage3' }
]), createSellerProduct);


router.patch("/updateProduct/:id", uploadProduct.fields([
  { name: 'productImage1' },
  { name: 'productImage2' },
  { name: 'productImage3' }
]), updateSellerProduct)


router.delete("/deleteProduct/:id", deleteProduct)

module.exports = router