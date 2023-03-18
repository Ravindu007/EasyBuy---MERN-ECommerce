import React, { useState } from 'react'
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
      console.log(json);
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

  return (
    <div className="profileItem" style={{marginBottom:"20px", border:"1px solid black"}}>
        <div className="row">
          <div className="col-8">
              <p><strong>Business ID: </strong>{profile._id}</p>
              <p><strong>Business Name: </strong>{profile.businessName}</p>
              <p><strong>Business Type: </strong>{profile.businessType}</p>
              <p><strong>Business Owner: </strong>{profile.businessOwner}</p>
              <p><strong>Business Registration Date: </strong>{profile.businessRegistrationDate}</p>
              <a href={profile.businessLegalDocument} target="_blank">VIEW DOCUMENTS</a>
              <p><strong>Admin Approval: </strong>{profile.approvalByAdmin === true ? <span>APPROVED</span> : <span>NOT APPROVED</span>}</p>
              <p><strong>Admin Comment: </strong>{profile.adminComment}</p>
          </div>
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
    </div>
  )
}

export default ProfileItem