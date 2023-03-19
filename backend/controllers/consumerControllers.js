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


module.exports = {getScanDetails}