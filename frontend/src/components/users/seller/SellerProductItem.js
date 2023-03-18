import React, { useState } from 'react'
import { useAuthContext } from '../../../hooks/authHooks/useAuthContext'
import { useSellerProductContext } from '../../../hooks/useSellerProductContext'

import "./SellerProductItem.scss"

const SellerProductItem = ({product}) => {
  const {user} = useAuthContext()
  const {dispatch} = useSellerProductContext()

  const [isEditing, setIsEditing] = useState(false)

  // update fields
  const [draftNumberOfItems, setDraftNumberOfItems] = useState(null)
  const [draftProductImage1, setDraftProductImage1] = useState(null)
  const [draftProductImage2, setDraftProductImage2] = useState(null)
  const [draftProductImage3, setDraftProductImage3] = useState(null)

  const handleUpdate = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('numberOfItems', draftNumberOfItems)
    formData.append('productImage1', draftProductImage1)
    formData.append('productImage2', draftProductImage2)
    formData.append('productImage3', draftProductImage3)

    const response = await fetch("/api/users/seller/updateProduct/" + product._id,{
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })  

    const json = await response.json()
    if(response.ok){
      dispatch({type:"UPDATE_PRODUCT", payload:json})
      setIsEditing(false)
    }
  }


  const handleDelete = async(e)=> {
    e.preventDefault()

    const response = await fetch("/api/users/seller/deleteProduct/" + product._id,{
      method:"DELETE",
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:"DELETE_PRODUCT", payload:json})
    }
  }

 
  return (
    <div className="sellerProductItem">
      {!isEditing && (
        <div className="row" style={{border:"1px solid black"}}>
          <div className="col-4 details">
            <p><strong>Product Name: </strong>{product.productName}</p>
            <p><strong>Product Category: </strong>{product.productCategory}</p>
            <p><strong>Number of items : </strong>{product.numberOfItems}</p>
              
            <div className="buttons">
              <div className="row">
                <div className="col-6" style={{display:"flex", justifyContent:"center"}}>
                  <button 
                    className='btn btn-outline-success'
                    onClick={()=>{
                      setIsEditing(true)
                      setDraftNumberOfItems(product.numberOfItems)
                      setDraftProductImage1(product.productImage1)
                      setDraftProductImage2(product.productImage2)
                      setDraftProductImage3(product.productImage3)
                    }}
                    >
                      UPDATE
                    </button>
                </div>
                <div className="col-6" style={{display:"flex", justifyContent:"center"}}>
                <button 
                  className='btn btn-outline-danger'
                  onClick={handleDelete}
                  >DELETE
                  </button>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12" style={{display:"flex", justifyContent:"center"}}>
                  <button 
                    className='btn btn-outline-warning'
                  >
                    REQUEST
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8 images">
            <div className="row">
              <div className="col-4">
                <img src={product.productImage1} alt={product.productImage1}  className='mx-auto d-block img-fluid'/>
              </div>
              <div className="col-4">
                <img src={product.productImage2} alt={product.productImage2}  className='mx-auto d-block img-fluid'/>
              </div>
              <div className="col-4">
                <img src={product.productImage3} alt={product.productImage3}  className='mx-auto d-block img-fluid'/>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <form onSubmit={handleUpdate}  style={{border:"1px solid black"}}>
          <div className="row">
            <div className="col-3 edit-details">
              <div className="col-12">
                <div className="form-group">
                  <label>Number of Itmes</label>
                  <input 
                    type="text"
                    className='form-control'
                    onChange={e=>setDraftNumberOfItems(e.target.value)}
                    value={draftNumberOfItems}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="buttons">
                  <button className='btn btn-primary mr-3'>SAVE</button>
                  <button 
                    className='btn btn-secondary'
                    onClick={()=>{
                      setIsEditing(false)
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
            <div className="col-9" style={{border:"1px solid black"}}>
              <div className="row edit-images">
                  <div className="col-4 image-item">
                    <img src={product.productImage1} alt="" className='mx-auto d-block img-fluid'/>
                    <div className="form-group">
                    <input 
                      type="file" 
                      className='form-control'
                      onChange={e=>{
                        setDraftProductImage1(e.target.files[0])
                        product.productImage1 = null
                      }}
                      name='productImage1'
                    />
                    </div>
                  </div>
                  <div className="col-4 image-item">
                    <img src={product.productImage2} alt="" className='mx-auto d-block img-fluid'/>
                    <div className="form-group">
                    <input 
                    type="file" 
                    className='form-control'
                    onChange={e=>{
                      setDraftProductImage2(e.target.files[0])
                      product.productImage2 = null
                    }}
                    name='productImage2'
                    />
                    </div>
                  </div>
                  <div className="col-4 image-item">
                    <img src={product.productImage3} alt="" className='mx-auto d-block img-fluid'/>
                    <div className="form-group">
                    <input 
                    type="file" 
                    className='form-control'
                    onChange={e=>{
                      setDraftProductImage3(e.target.files[0])
                      product.productImage3 = null
                    }}
                    name='productImage3'
                    />
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default SellerProductItem