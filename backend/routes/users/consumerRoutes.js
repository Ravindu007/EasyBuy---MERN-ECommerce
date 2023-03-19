const express = require("express")
const multer = require("multer")


// controllers
const {
  getScanDetails
} = require("../../controllers/consumerControllers")

const router = express.Router()


// user Roues

// get scan details
router.get("/getScanDetails", getScanDetails)

module.exports = router