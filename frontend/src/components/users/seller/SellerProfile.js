import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/authHooks/useAuthContext'
import { useSellerProfileContext } from '../../../hooks/useSellerProfileContext'
import SellerRegistrationForm from './SellerRegistrationForm'

const SellerProfile = () => {

  const {user} = useAuthContext()
  const {sellerProfiles:profile, dispatch} = useSellerProfileContext()

  const [isProfileLoading, setIsProfileLoading] = useState(true)

  const [isProfileAvailabale, setIsProfileAvailable] = useState(false)

  // fetch the profile if any
  useEffect(()=>{
    // later we need to fetch the profile according to user email 
    const fetchUserProfile = async() => {
      const response = await fetch(`/api/users/seller/getAllRegistrationDetails?userEmail=${user.email}`,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        if(json === null){
          // console.log("No profile");
          setIsProfileLoading(false)
        }else{
          dispatch({type:"GET_SINGLE_PROFILE", payload:json})
          setIsProfileLoading(false)
          setIsProfileAvailable(true)
        }
      }
    }

    if(user){
      fetchUserProfile()
    }
  },[])

  const [isEditing, setIsEditing] = useState(false)
  const [showRegistrationForm, setRegistrationForm] = useState(false)


  const handleShowRegister = () => {
    setRegistrationForm(!showRegistrationForm)
  }

  return (
    <div className="sellerProfile">
      {!isEditing && 
        isProfileLoading ? <p>LOADING</p> : (
          <div className='row'>
            {profile && (
                <div className="col-6">
                <p><strong>Business Name: </strong>{profile.businessName}</p>
                <p><strong>Business Owner: </strong>{profile.businessOwner}</p>
                <p><strong>Business Registration Date: </strong>{profile.businessRegistrationDate}</p>
                <p><strong>Approval: </strong>{profile.approvalByAdmin === false ? <span>Not yet approved</span> : <span>Approved</span>}</p>  
                {/* peding registration status  */}
              </div>
            )}
            {!profile && (
              <div className="col-6">
              <div className="row">
              <div className="col-12">
                <button className='btn btn-primary' onClick={handleShowRegister}>REGISTER</button>
              </div>
              <div className="col-12">
                {showRegistrationForm && (
                  <SellerRegistrationForm/>
                )}
              </div>
              </div>
            </div>
            )}
        </div>
        )
      }
    </div>
  )
}

export default SellerProfile