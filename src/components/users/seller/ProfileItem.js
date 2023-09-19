import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { useAuthContext } from '../../../hooks/authHooks/useAuthContext'
import { useSellerProfileContext } from '../../../hooks/useSellerProfileContext'

const ProfileItem = ({profile, parentComponent}) => {
  const {user} = useAuthContext()
  const {dispatch} = useSellerProfileContext()


  const [showAdminComment, setShowAdminComment] = useState(false)

  const sendReason_sendReject = () => {
    setShowAdminComment(true)
  }

  const handleApproval = async(e) => {

    e.preventDefault()
    setShowAdminComment(false)

    const formData = new FormData()
    formData.append('approvalByAdmin',true)
    formData.append('adminComment','YOUR BUSINESS IS ELIGIBLE FOR BUSINESS')

    const response = await fetch("/api/admin/registrationDetails/approval/" +    profile._id, {
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type:"UPDATE_PROFILE", payload:json})
    }
  }

  // admin comment 
  const [adminComment, setAdminComment] = useState("")

  const handleReject = async(e) => {
    e.preventDefault()
    setShowAdminComment(false)

    const formData = new FormData()
    formData.append('approvalByAdmin',false)
    formData.append('adminComment',adminComment)

    const response = await fetch("/api/admin/registrationDetails/approval/" +    profile._id, {
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type:"UPDATE_PROFILE", payload:json})
    }


  }



  // update business profile by seller
  const [isEditing , setIsEditing] = useState(false)

  const [draftBusinessLegalDocument, setDraftBusinessLegalDocument] = useState(null)
  const [draftPackage, setDraftPackage] = useState("")

  const handleUpdate = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('businessLegalDocument',draftBusinessLegalDocument)
    formData.append('package', draftPackage)
    formData.append('approvalByAdmin', false)
    formData.append('adminComment', "No Comment")

    const response = await fetch("/api/users/seller/updateRegistrationDetails/" + profile._id,{
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:"UPDATE_SINGLE_PROFILE", payload:json})
      setIsEditing(false)
    }
  }

  return (
    <div className="profileItem" style={{marginBottom:"20px", border:"1px solid black"}}>
        {!isEditing && (
          <div className="row">
          <div className="col-8">
              <p><strong>Business ID: </strong>{profile._id}</p>
              <p><strong>Business Name: </strong>{profile.businessName}</p>
              <p><strong>Business Type: </strong>{profile.businessType}</p>
              <p><strong>Business Owner: </strong>{profile.businessOwner}</p>
              <p><strong>Business Registration Date: </strong>{profile.businessRegistrationDate}</p>
              <div className="logo">
                <img src={profile.businessLogo} className='img-fluid' />
              </div>
              <strong>Legal Documents: </strong><a href={profile.businessLegalDocument} target="_blank">VIEW DOCUMENTS</a>
              <p><strong>Admin Approval: </strong>{profile.approvalByAdmin === true ? <span>APPROVED</span> : <span>NOT APPROVED</span>}</p>
              <p><strong>Admin Comment: </strong>{profile.adminComment}</p>
              <p><strong>Package: </strong>{profile.package} items</p>
              {profile.approvalByAdmin === true ?
                <p><strong>Number of items published: </strong>{profile.productsPublished}/{profile.package}</p> 
                :
                null
              }
          </div>
          {parentComponent === "/seller/ViewProfile" && (
            <div className="col-4">
              <div className="buttons" style={{display:"flex", flexDirection:"column"}}>
                  <button 
                    className='btn btn-outline-success'
                    onClick={()=>{
                      setDraftBusinessLegalDocument(profile.businessLegalDocument)
                      setDraftPackage(profile.package)
                      setIsEditing(true)
                    }}
                  >
                    UPDATE
                  </button>
                  <Link to={`/seller/ViewProfile/reportView?businessId=${profile._id}`}>
                  <button
                    className='btn btn-outline-danger mt-5'
                    >
                      Access Reports
                  </button>
                  </Link>
              </div>
            </div>
          )}
          {parentComponent === "/admin/sellerManagement" && (
            <div className="col-4">
              <button 
                className='btn btn-outline-success' 
                onClick={handleApproval}
              >
                APPROVED
              </button>
              <button 
                className='btn btn-outline-danger' 
                onClick={sendReason_sendReject}
                >
                  REJECT
              </button>
              {showAdminComment && (
                <form>
                  <div className="form-group">
                    <label>Reason to Reject</label>
                    <input 
                      type="text"
                      className='form-control'
                      onChange={e=>setAdminComment(e.target.value)}
                      value={adminComment}
                    />
                  </div>
                  <button 
                    className='btn btn-danger'
                    onClick={handleReject}
                    >
                      REJECT
                    </button>
                </form>
              )}
            </div>
          )}
        </div>
        )}
        {isEditing && (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Businsess Legal Document</label>
              <input 
                type="file" 
                className='form-control'
                onChange={e=>setDraftBusinessLegalDocument(e.target.files[0])}
                name='businessLegalDocument'
              />
            </div>
            <div className="packages">
            <label>Packages</label>
            <div className="row">
              <div className="col-3" style={{display:"flex",flexDirection:"column",alignItems:"center", border:"1px solid black"}}>
              <h4>3 ITEMS</h4>
              <h5>USD 5</h5>
              <label>
                <input 
                  type="radio" 
                  name="optradio" 
                  value={3} 
                  checked={draftPackage === 3} 
                  onChange={e=>setDraftPackage(Number(e.target.value))} 
                />
                SELECT
              </label>
              </div>
              <div className="col-3" style={{display:"flex",flexDirection:"column",alignItems:"center", border:"1px solid black"}}>
              <h4>5 ITEMS</h4>
              <h5>USD 8</h5>
              <label>
                <input 
                  type="radio" 
                  name="optradio" 
                  value={5} 
                  checked={draftPackage === 5} 
                  onChange={e=>setDraftPackage(Number(e.target.value))}  
                />
                SELECT
              </label>
              </div>
              <div className="col-3" style={{display:"flex",flexDirection:"column",alignItems:"center", border:"1px solid black"}}>
              <h4>10 ITEMS</h4>
              <h5>USD 12</h5>
              <label>
                <input 
                  type="radio" 
                  name="optradio" 
                  value={10} 
                  checked={draftPackage === 10} 
                  onChange={e=>setDraftPackage(Number(e.target.value))}  
                />
                SELECT
              </label>
              </div>
            </div>
            </div>

            <div className="buttons  mt-5">
              <button className='btn btn-outline-primary'>SAVE</button>
              <button 
                className='btn btn-outline-secondary'
                onClick={()=>{
                  setIsEditing(false)
                }}
              >
                CANCEL
              </button>
            </div>
          </form>
        )}
    </div>
  )
}

export default ProfileItem