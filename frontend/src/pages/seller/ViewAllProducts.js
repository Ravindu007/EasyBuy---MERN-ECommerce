import React, { useEffect, useState } from 'react'
import { useSellerProductContext } from '../../hooks/useSellerProductContext'
import ProductFrom from '../../components/users/seller/ProductFrom'
import SellerProductItem from '../../components/users/seller/SellerProductItem'
import SellerProfile from '../../components/users/seller/SellerProfile'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'

const ViewAllProducts = () => {

  const {user} = useAuthContext()
  const {sellerProducts:products, dispatch} = useSellerProductContext()


  // loading state
  const [isProductsLoading , setIsProductLoading] = useState(true)
  // show form
  const [showForm, setShowForm] = useState(true)


  useEffect(()=>{
    const fetchAllSellerProducts = async() => {
      const response = await fetch("/api/users/seller/getAllProducts",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:"GET_ALL_PRODUCTS", payload:json})
        setIsProductLoading(false)
      }
    }

    if(user){
      fetchAllSellerProducts()
    }

  },[user, dispatch])


  return (
    <div className='vewAllProducts'>
    <div className="row">
    <div className="col-8" style={{paddingLeft:"50px"}}>
        <div className="row">
          <div className="col-12">
            <SellerProfile/>
          </div>
          <div className="col-12">
          <p>Products</p>
            {isProductsLoading ? <p>LOADING</p> : (
              products && products.map((product)=>(
                <SellerProductItem key={product._id} product={product} showForm={setShowForm}/>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="col-4">
        {showForm && (
          <ProductFrom/>
        )}
      </div>
    </div>
    </div>
  )
}

export default ViewAllProducts