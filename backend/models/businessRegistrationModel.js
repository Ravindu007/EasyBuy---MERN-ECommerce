const mongoose = require("mongoose")

const Schema = mongoose.Schema

const businessRegistrationSchema = new Schema({
  businessName:{type:String, required:true},
  businessType:{type:String, required:true},
  businessOwner:{type:String, required:true},
  userEmail:{type:String, required:true},
  businessRegistrationDate:{type:String, required:true},
  businessLegalDocument:{type:String, required:true},
  approvalByAdmin:{type:Boolean, required:true},
  adminComment:{type:String, required:true},
  package:{type:String, required:true}
},{timestamps:true})

module.exports = mongoose.model('business', businessRegistrationSchema)