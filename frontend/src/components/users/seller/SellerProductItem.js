import React, { useState } from 'react'

import "./SellerProductItem.scss"

const SellerProductItem = ({product, showForm}) => {

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
      body:formData
    })  

    const json = await response.json()
    if(response.ok){
      console.log(json);
      setIsEditing(false)
    }
  }

  return (
    <div className="sellerProductItem">
    {!isEditing && (
      <div className="row">
        <div className="col-4 details">
          <p><strong>Product Name: </strong>{product.productName}</p>
          <p><strong>Product Category: </strong>{product.productCategory}</p>
          <p><strong>Number of items: </strong>{product.numberOfItems}</p>
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
            <button className='btn btn-outline-danger'>DELETE</button>
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
              <div className="col-8" style={{display:"flex"}}>
                <div className="form-group">
                    <label>Product Image 1</label>
                    <input 
                      type="file"
                      className='form-control'
                      onChange={e=>setDraftProductImage1(e.target.files[0])}
                      name='productImage1'
                    />
                </div>
                <div className="form-group">
                  <label>Product Image 2</label>
                  <input 
                    type="file"
                    className='form-control'
                    onChange={e=>setDraftProductImage2(e.target.files[0])}
                    name='productImage2'
                  />
                </div>
                <div className="form-group">
                  <label>Product Image 2</label>
                  <input 
                    type="file"
                    className='form-control'
                    onChange={e=>setDraftProductImage2(e.target.files[0])}
                    name='productImage2'
                  />
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