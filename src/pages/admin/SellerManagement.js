import React, { useEffect, useState } from 'react'
import {useAuthContext} from "../../hooks/authHooks/useAuthContext"
import {useSellerProfileContext} from "../../hooks/useSellerProfileContext"

import ProfileItem from '../../components/users/seller/ProfileItem'

const SellerManagement = () => {
  const {user} = useAuthContext()
  const {sellerProfiles, dispatch} = useSellerProfileContext()


  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true)

  useEffect(()=>{
    const fetchAllRegistrations = async() => {
      const response = await fetch("https://easyproof-backend.onrender.com/api/admin/getAllRegistrationDetails",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        dispatch({type:"GET_ALL_PROFILES", payload:json})
        setIsLoadingProfiles(false)
      }
    }

    if(user){
      fetchAllRegistrations()
    }

  },[sellerProfiles])

  return (
    <div className="sellerManagement">
      {isLoadingProfiles ? <p>LOADING</p> : (
        sellerProfiles && sellerProfiles.map((sellerProfile)=>(
          <ProfileItem key={sellerProfile._id} profile={sellerProfile} parentComponent="/admin/sellerManagement"/>
        ))
      )}
    </div>
  )
}

export default SellerManagement