const express = require("express")
const multer = require("multer")


// controllers
const {
  getScanDetails,getAllAuthenticatedProducts, getAllBusinessRegistrationDetails
} = require("../../controllers/consumerControllers")

const router = express.Router()


// user Roues

// get scan details
router.get("/getScanDetails", getScanDetails)

// get all authenticated products
router.get("/getAllAuthenticatedProducts", getAllAuthenticatedProducts)

// get all registered business Details
router.get("/gatAllBusinessNames", getAllBusinessRegistrationDetails)

module.exports = router