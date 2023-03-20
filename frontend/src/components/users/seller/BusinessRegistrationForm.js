import React, { useState } from 'react'
import {useAuthContext} from "../../../hooks/authHooks/useAuthContext"
import {useSellerProfileContext} from "../../../hooks/useSellerProfileContext"

const BusinessRegistrationForm = () => {

  const {user} = useAuthContext()
  const {sellerProfiles, dispatch} = useSellerProfileContext()

  // input fiels
  const [businessName, setBusinessName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [businessOwner, setBusinessOwner] = useState("")
  const [userEmail, setUserEmail] = useState(user.email)
  const [businessRegistrationDate, setBusinessRegistrationDate] = useState("")
  const [businessLogo, setBusinessLogo] = useState(null)
  const [businessLegalDocument, setBusinessLegalDocument] = useState(null)
  const [approvalByAdmin, setApprovalByAdmin] = useState(false)
  const [adminComment, setAdminComment] = useState("")
  const [selectedPackage, setSelectedPackage] = useState(3)
  const [productsPublished, setProductsPublished] = useState(0)

  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('businessName', businessName)
    formData.append('businessType', businessType)
    formData.append('businessOwner',businessOwner)
    formData.append('userEmail',userEmail)
    formData.append('businessRegistrationDate', businessRegistrationDate)
    formData.append('businessLogo',businessLogo)
    formData.append('businessLegalDocument', businessLegalDocument)
    formData.append('approvalByAdmin',approvalByAdmin)
    formData.append('adminComment', "No Comment")
    formData.append('package',selectedPackage)
    formData.append('productsPublished', productsPublished)

    const response = await fetch("/api/users/seller/createRegistrationDetails", {
      method:"POST",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:"CREATE_PROFILE", payload:json})
    }
  }

  return (
    <div className="businessRegistrationForm">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Business Name</label>
          <input 
            type="text"
            className='form-control' 
            onChange={e=>setBusinessName(e.target.value)}
            value={businessName}
          />
        </div>
        <div className="form-group">
          <label>Business Type</label>
          <input 
            type="text"
            className='form-control' 
            onChange={e=>setBusinessType(e.target.value)}
            value={businessType}
          />
        </div>
        <div className="form-group">
          <label>Business Owner</label>
          <input 
            type="text"
            className='form-control' 
            onChange={e=>setBusinessOwner(e.target.value)}
            value={businessOwner}
          />
        </div>
        <div className="form-group">
          <label>Business RegistrationDate</label>
          <input 
            type="date"
            className='form-control' 
            onChange={e=>setBusinessRegistrationDate(e.target.value)}
            value={businessRegistrationDate}
          />
        </div>
        <div className="form-group">
          <label>Business Logo</label>
          <input 
            type="file"
            className='form-control' 
            onChange={e=>setBusinessLogo(e.target.files[0])}
            name='businessLogo'
          />
        </div>
        <div className="form-group">
          <label>Business Legal Document</label>
          <input 
            type="file"
            className='form-control' 
            onChange={e=>setBusinessLegalDocument(e.target.files[0])}
            name='businessLegalDocument'
          />
        </div>
        <div className="packages">
        <label>Packages</label>
        <div className="row">
          <div className="col-4" style={{display:"flex",flexDirection:"column",alignItems:"center", border:"1px solid black"}}>
          <h4>3 ITEMS</h4>
          <h5>USD 5</h5>
          <label>
            <input 
              type="radio" 
              name="optradio" 
              value={3} 
              checked={selectedPackage === 3} 
              onChange={e=>setSelectedPackage(Number(e.target.value))} 
            />
            SELECT
          </label>
          </div>
          <div className="col-4" style={{display:"flex",flexDirection:"column",alignItems:"center", border:"1px solid black"}}>
          <h4>5 ITEMS</h4>
          <h5>USD 8</h5>
          <label>
            <input 
              type="radio" 
              name="optradio" 
              value={5} 
              checked={selectedPackage === 5} 
              onChange={e=>setSelectedPackage(Number(e.target.value))}  
            />
            SELECT
          </label>
          </div>
          <div className="col-4" style={{display:"flex",flexDirection:"column",alignItems:"center", border:"1px solid black"}}>
          <h4>10 ITEMS</h4>
          <h5>USD 12</h5>
          <label>
            <input 
              type="radio" 
              name="optradio" 
              value={10} 
              checked={selectedPackage === 10} 
              onChange={e=>setSelectedPackage(Number(e.target.value))}  
            />
            SELECT
          </label>
          </div>
        </div>
        </div>
        <button className='btn btn-outline-info'>REQUEST REGISTRATION</button>
      </form>
    </div>
  )
}

export default BusinessRegistrationForm