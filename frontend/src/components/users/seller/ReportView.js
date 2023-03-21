import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/authHooks/useAuthContext'

const ReportView = () => {
  const {user} = useAuthContext()

  const location = useLocation()
  const businessId = new URLSearchParams(location.search).get('businessId')

  // fetch reports related to a business
  useEffect(()=>{
    const fetchAllReportsRelatedToBusiness = async() => {
      const response = await fetch(`/api/users/seller/getAllRelatedReports?businessId=${businessId}`,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        console.log(json);
      }
    }

    if(user){
      fetchAllReportsRelatedToBusiness()
    }

  },[])

  return (
    <div className='reportView'>
      <p>{businessId}</p>
    </div>
  )
}

export default ReportView