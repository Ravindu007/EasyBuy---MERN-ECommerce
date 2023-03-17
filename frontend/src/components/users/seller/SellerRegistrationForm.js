import React, { useState } from 'react'
import {useSellerProfileContext} from "../../../hooks/useSellerProfileContext"
 
const SellerRegistrationForm = () => {

  const {dispatch} = useSellerProfileContext()


  // input fiels
  const [businessName, setBusinessName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [businessOwner, setBusinessOwner] = useState("")
  const [businessRegistrationDate, setBusinessRegistrationDate] = useState("")
  const [businessLegalDocument, setBusinessLegalDocument] = useState(null)
  

  const handleSubmit = async(e) => {
    e.preventDefault()

    // details
    const formData = new FormData()
    formData.append('businessName', businessName)
    formData.append('businessType', businessType)
    formData.append('businessOwner', businessOwner)
    formData.append('businessRegistrationDate', businessRegistrationDate)
    formData.append('businessLegalDocument', businessLegalDocument)
    formData.append('approvalByAdmin', false)
    formData.append('adminComment', "No Comment")


    const response = await fetch("/api/users/seller/createRegistrationDetails",{
      method:"POST",
      body:formData
    })

    const json = await response.json()
    if(response.ok){
      dispatch({type:"CREATE_PROFILE", payload:json})
    }
  }



  return (
    <div className="sellerRegistrationForm">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bisness Name</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>setBusinessName(e.target.value)}
            value={businessName}
          />
        </div>
        <div className="form-group">
          <label>Bisness Type</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>setBusinessType(e.target.value)}
            value={businessType}
          />
        </div>
        <div className="form-group">
          <label>Bisness Owner</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>setBusinessOwner(e.target.value)}
            value={businessOwner}
          />
        </div>
        <div className="form-group">
          <label>Bisness RegistrationDate</label>
          <input 
            type="date"
            className='form-control'
            onChange={e=>setBusinessRegistrationDate(e.target.value)}
            value={businessRegistrationDate}
          />
        </div>
        <div className="form-group">
          <label>Legal Document</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>setBusinessLegalDocument(e.target.files[0])}
            name='businessLegalDocument'
          />
        </div>
        <button className='btn btn-outline-info'>REQUEST REGISTRATION</button>
      </form>
    </div>
  )
}

export default SellerRegistrationForm