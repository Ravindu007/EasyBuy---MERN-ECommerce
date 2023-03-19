const express = require("express")
const multer = require("multer")


// controllers
const {
  getScanDetails,getAllAuthenticatedProducts
} = require("../../controllers/consumerControllers")

const router = express.Router()


// user Roues

// get scan details
router.get("/getScanDetails", getScanDetails)

// get all authenticated products
router.get("/getAllAuthenticatedProducts", getAllAuthenticatedProducts)

module.exports = router