import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReportItem from '../../components/users/seller/ReportItem'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import {useReportContext} from "../../hooks/useReportContext"

const ReportView = () => {
  const {user} = useAuthContext()
  const {reports, dispatch} = useReportContext()

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
        dispatch({type:"GET_ALL_REPORTS", payload:json})
      }
    }

    if(user){
      fetchAllReportsRelatedToBusiness()
    }

  },[])

  return (
    <div className='reportView'>
      {reports && reports.map((report)=>(
        <ReportItem key={report._id} report={report}/>
      ))}
    </div>
  )
}

export default ReportView