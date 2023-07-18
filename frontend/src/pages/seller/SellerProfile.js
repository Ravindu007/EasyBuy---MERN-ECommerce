import React, { useEffect, useState } from 'react'
import BusinessRegistrationForm from '../../components/users/seller/BusinessRegistrationForm'
import ProfileItem from '../../components/users/seller/ProfileItem'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { useSellerProfileContext } from '../../hooks/useSellerProfileContext'
import {useSellerProductContext} from "../../hooks/useSellerProductContext"
import SellerProductItem from '../../components/users/seller/SellerProductItem'
import ProductForm from '../../components/users/seller/ProductForm'

const SellerProfile = () => {
  const {user} = useAuthContext()
  const {sellerProfiles:singleProfile , dispatch} = useSellerProfileContext()
  const {sellerProducts, dispatch:dispatchProducts}  = useSellerProductContext()

  const [showProfile, setShowProfile] = useState(false)


  useEffect(()=>{
    const fetchProfile = async() => {
      const response = await fetch(`https://easyproof-backend.onrender.com/api/users/seller/getAllRegistrationDetails?userEmail=${user.email}`,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        if(json === null){
          setShowProfile(false)
        }else{
          dispatch({type:"GET_SINGLE_PROFILE", payload:json})
          setShowProfile(true)
        }
      }
    } 

    
    const fetchAllProducts = async() => {
      const response = await fetch(`https://easyproof-backend.onrender.com/api/users/seller/getAllProducts?userEmail=${user.email}`,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        dispatchProducts({type:"GET_ALL_PRODUCTS", payload:json})
      }
    }

    if(user){
      fetchProfile()
      fetchAllProducts()
    }
  },[singleProfile])

  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  const showForm = () => {
    setShowRegistrationForm(!showRegistrationForm)
  }

  return (
    <div className="sellerProfile">
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-12">
              {showProfile && (
                <ProfileItem profile={singleProfile} parentComponent="/seller/ViewProfile"/>
              )}
              {!showProfile && (
                <>
                <button onClick={showForm} className='btn btn-primary'>Register</button>
                {showRegistrationForm && (
                  <BusinessRegistrationForm/>
                )}
                </>
              )}
            </div>
            <div className="col-12">
              {/* show all products related to email */}
              {showProfile && singleProfile.approvalByAdmin === true && (
                <>
                <p>Products</p>
                  {sellerProducts && sellerProducts.map((sellerProduct)=>(
                    <SellerProductItem key={sellerProduct._id} product={sellerProduct} business={singleProfile}/>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-4">
          {/* product form */}
          {showProfile && singleProfile.approvalByAdmin === true && (
            <>
            <p>show Create product</p>
              <ProductForm business={singleProfile}/>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerProfile