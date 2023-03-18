const businessRegistrationModel = require("../models/businessRegistrationModel")
const productModel = require("../models/productModel")

const {admin}  = require("../server")
const bucket  = admin.storage().bucket(process.env.BUCKET)

// get all the business registration details 
const getAllBusinessRegistrationDetails = async(req,res) => {
  try {
    const allRegistrations = await businessRegistrationModel.find({}).sort({createdAt:-1})
    res.status(200).json(allRegistrations)
  } catch (error) {
    res.status(400).json(error)
  }
}


module.exports = {getAllBusinessRegistrationDetails}