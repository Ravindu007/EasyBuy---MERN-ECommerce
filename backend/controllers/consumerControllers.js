const businessRegistrationModel = require("../models/businessRegistrationModel")
const productModel = require("../models/productModel")

const getScanDetails = async(req, res) => {
  const result = req.query.result

  try{
    const scannedItem = await productModel.findOne({blockChainId:result})
    res.status(200).json(scannedItem)
  }catch(error){
    res.status(400).json(error)
  }
}

const getAllAuthenticatedProducts = async(req,res)=>{
  try{
    const allAuthenticProducts = await productModel.find({requestedToAddToBlockChain:true}).sort({createdAt:-1})
    res.status(200).json(allAuthenticProducts)
  }catch(error){
    res.status(400).json(error)
  }
}



// for reporting feature get all the business Details
const getAllBusinessRegistrationDetails = async(req,res) => {
  try {
    const allRegistrations = await businessRegistrationModel.find({}).select('businessName').sort({createdAt:-1})
    res.status(200).json(allRegistrations)
  } catch (error) {
    res.status(400).json(error)
  }
}



module.exports = {getScanDetails,getAllAuthenticatedProducts,getAllBusinessRegistrationDetails}