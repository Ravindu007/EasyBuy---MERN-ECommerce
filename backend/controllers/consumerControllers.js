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


module.exports = {getScanDetails,getAllAuthenticatedProducts}