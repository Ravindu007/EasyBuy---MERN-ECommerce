const express = require("express")
const multer = require("multer")


// controllers
const {getAllBusinessRegistrationDetails} = require("../../controllers/adminControllers")


// middleware
const requireAuth = require("../../middleware/requireAuth")

const router = express.Router()


const upload = multer({
  storage:multer.memoryStorage()
})


router.use(requireAuth)


// admin routes
router.get("/getAllRegistrationDetails", getAllBusinessRegistrationDetails)



module.exports = router