import React, { useEffect } from 'react'
import {useAuthContext} from "../../hooks/authHooks/useAuthContext"
import {useSellerProfileContext} from "../../hooks/useSellerProfileContext"

const SellerManagement = () => {
  const {user} = useAuthContext()
  const {sellerProfiles, dispatch} = useSellerProfileContext()

  useEffect(()=>{
    const fetchAllRegistrations = async() => {
      const response = await fetch("/api/admin/getAllRegistrationDetails",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        console.log(json);
        dispatch({type:"GET_ALL_PROFILES", payload:json})
      }
    }

    if(user){
      fetchAllRegistrations()
    }

  },[])

  return (
    <div className="sellerManagement">

    </div>
  )
}

export default SellerManagement