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
  const [businessLegalDocument, setBusinessLegalDocument] = useState(null)
  const [approvalByAdmin, setApprovalByAdmin] = useState(false)
  const [adminComment, setAdminComment] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('businessName', businessName)
    formData.append('businessType', businessType)
    formData.append('businessOwner',businessOwner)
    formData.append('userEmail',userEmail)
    formData.append('businessRegistrationDate', businessRegistrationDate)
    formData.append('businessLegalDocument', businessLegalDocument)
    formData.append('approvalByAdmin',approvalByAdmin)
    formData.append('adminComment', "No Comment")

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
          <label>Business Legal Document</label>
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

export default BusinessRegistrationForm