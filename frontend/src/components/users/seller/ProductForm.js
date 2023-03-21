import React, { useState } from 'react'
import { useAuthContext } from '../../../hooks/authHooks/useAuthContext'
import { useSellerProductContext } from '../../../hooks/useSellerProductContext'
import {useSellerProfileContext} from "../../../hooks/useSellerProfileContext"

const ProductForm = ({business}) => {
  const {user} = useAuthContext()
  const {dispatch} = useSellerProductContext()
  const {dispatch:dispatchSellerProfile} = useSellerProfileContext()

  // input fields 
  const [productName, setProductName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [numberOfItems, setNumberOfItems] = useState("")
  const [productImage1, setProductImage1] = useState(null)
  const [productImage2, setProductImage2] = useState(null)
  const [productImage3, setProductImage3] = useState(null)


  const addProduct = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('userEmail',user.email)
    formData.append('businessId', business._id)
    formData.append('businessName',business.businessName)
    formData.append('productCategory', productCategory)
    formData.append('numberOfItems',numberOfItems)
    formData.append('productImage1', productImage1)
    formData.append('productImage2', productImage2)
    formData.append('productImage3',productImage3)
    formData.append('requestedToAddToBlockChain',false)
    formData.append('blockChainId',"NO ID YET")
    formData.append('QRcode', null)

    const response = await fetch("/api/users/seller/createProduct",{
      method:"POST",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:"CREATE_PRODUCT", payload:json})
      setProductName("")
      setProductCategory("")
      setNumberOfItems("")
      setProductImage1("")
      setProductImage2("")
      setProductImage3("")
    }

  }


  return (
    <div className="productForm">
      <form onSubmit={addProduct}>
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>setProductName(e.target.value)}
            value={productName}
          />
        </div>
        <div className="form-group">
          <label>Product Category</label>
          <select
            className='form-select'
            onChange={e=>setProductCategory(e.target.value)}
            value={productCategory}
          >
            <option>SELECT</option>
            <option value="cloth">Cloth</option>
            <option value="electronic">Electronic</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of Items</label>
          <input 
            type="number" 
            className='form-control'
            onChange={e=>setNumberOfItems(e.target.value)}
            value={numberOfItems}
          />
        </div>
        <div className="form-group">
          <label>Product Image 1</label>
          <input 
            type="file" 
            className='form-control'
            onChange={e=>setProductImage1(e.target.files[0])}
            name='productImage1'
          />
        </div>
        <div className="form-group">
          <label>Product Image 2</label>
          <input 
            type="file" 
            className='form-control'
            onChange={e=>setProductImage2(e.target.files[0])}
            name='productImage2'
          />
        </div>
        <div className="form-group">
          <label>Product Image 3</label>
          <input 
            type="file" 
            className='form-control'
            onChange={e=>setProductImage3(e.target.files[0])}
            name='productImage3'
          />
        </div>
        <button className='btn btn-outline-primary'>ADD</button>
      </form>
    </div>
  )
}

export default ProductForm