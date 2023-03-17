import React, { useState } from 'react'

import "./SellerProductItem.scss"
import {useSellerProductContext} from "../../../hooks/useSellerProductContext"
import { useAuthContext } from '../../../hooks/authHooks/useAuthContext'

const SellerProductItem = ({product, showForm}) => {


  // contexts
  const {user} = useAuthContext()
  const {dispatch} = useSellerProductContext()


  // editing state 
  const [isEditing , setIsEditing] = useState(false)



  // update fields
  const [draftNumberOfItems, setDraftNumberOfItems] = useState(0)
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
      showForm(true)
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


  const sendRequestToAdmin = async(e) => {
    // make patch request 
    // make send to admin true
  }

  return (
    <div className="sellerProductItem">
    {!isEditing && (
      <div className="row">
        <div className="col-4 details">
          <p><strong>Product Name: </strong>{product.productName}</p>
          <p><strong>Product Category: </strong>{product.productCategory}</p>
          <p><strong>Number of items: </strong>{product.numberOfItems}</p>
          <p><strong>Request to add block chain: </strong>Not send</p>
          <div className="buttons" style={{display:"flex", justifyContent:"space-evenly"}}>
            <button 
              className='btn btn-outline-success'
              onClick={()=>{
                showForm(false)
                setIsEditing(true)
                setDraftNumberOfItems(product.numberOfItems)
                setDraftProductImage1(product.productImage1)
                setDraftProductImage2(product.productImage2)
                setDraftProductImage3(product.productImage3)
              }}
              >
                UPDATE
              </button>
            <button 
              className='btn btn-outline-danger'
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
          <div className="requestButton" style={{display:"flex", justifyContent:"center", marginTop:"5px"}}>
            <button 
              className='btn btn-outline-warning'
              onClick={sendRequestToAdmin}
            >
              REQUEST
            </button>
          </div>
        </div>
        <div className="col-8 images" style={{display:"flex"}}>
          <div className="row">
            <div className="col-4 item">
                <img src={product.productImage1} alt={product.productImage1}  className='d-block mx-auto img-fluid'/>
            </div>
            <div className="col-4 item">
                <img src={product.productImage2} alt={product.productImage2}  className='d-block mx-auto img-fluid'/>
            </div>
            <div className="col-4 item">
                <img src={product.productImage3} alt={product.productImage3}  className='d-block mx-auto img-fluid'/>
            </div>
          </div>
        </div>
      </div>
    )}
    {isEditing && (
      <div className="row" style={{border:"1px solid black", padding:"10px"}}>
        <form onSubmit={handleUpdate}>
          <div className="row">
              <div className="col-4">
                    <div className="form-group">
                    <label>Number of items</label>
                      <input 
                      type="number"
                      className='form-control'
                      onChange={e=>setDraftNumberOfItems(e.target.value)}
                      value={draftNumberOfItems}
                      />
                    </div>
                    
              </div>
              <div className="col-8 imageUpdates" style={{display:"flex"}}>
                <div className="row">
                  <div className="col-4">
                      <div className="form-group">
                          <label>Product Image 1</label>
                          <img src={product.productImage1} className='mx-auto d-block img-fluid'/>
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
                  <div className="col-4">
                      <div className="form-group">
                      <label>Product Image 2</label>
                      <img src={product.productImage2} className='mx-auto d-block img-fluid'/>
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
                  <div className="col-4">
                    <div className="form-group">
                      <label>Product Image 3</label>
                      <img src={product.productImage3} className='mx-auto d-block img-fluid'/>
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
          <div className="row">
            <div className="col-12">
              <div className="buttons" style={{display:"flex", justifyContent:"flex-end"}}>
               <button className='btn btn-outline-info'>SAVE</button>
               <button 
                 className='btn btn-outline-secondary'
                 onClick={()=>{
                   setIsEditing(false)
                   showForm(true)
                 }}
               >
                 CANCEL
               </button>
              </div>  
            </div>
          </div>
        </form>
      </div>
    )}
    </div>
  )
}

export default SellerProductItem