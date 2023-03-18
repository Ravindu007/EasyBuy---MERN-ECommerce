const express = require("express")
const multer = require("multer")


// controllers
const {
  getAllSellerProducts, createSellerProduct, updateSellerProduct,deleteProduct,

  getBusinessRegistrationDetails, createBusinessRegistrationDetails, updateBusinessRegistrationDetails, deleteBusinessRegistrationDetails, 


} = require("../../controllers/sellerControllers")

// middleware
const requireAuth = require("../../middleware/requireAuth")

const router = express.Router()


// productMulter 
const uploadProduct = multer({
  storage:multer.memoryStorage()
})


const uploadRegistration = multer({
  storage:multer.memoryStorage()
})



router.use(requireAuth)


// registrationRoutes

// get gegistration details by email
router.get("/getAllRegistrationDetails", getBusinessRegistrationDetails)

router.post("/createRegistrationDetails", uploadRegistration.single('businessLegalDocument'), createBusinessRegistrationDetails)

router.patch("/updateRegistrationDetails/:id", uploadRegistration.single('businessLegalDocument'),updateBusinessRegistrationDetails)

router.delete("/deleteRegistrationDetails/:id", deleteBusinessRegistrationDetails)





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