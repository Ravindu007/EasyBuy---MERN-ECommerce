import React, { useState } from 'react'

import "./SellerProductItem.scss"

const SellerProductItem = ({product}) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="sellerProductItem">
      {!isEditing && (
        <div className="row">
          <div className="col-4 details">
            <p><strong>Product Name: </strong>{product.productName}</p>
            <p><strong>Product Category: </strong>{product.productCategory}</p>
            <p><strong>Number of items : </strong>{product.numberOfItems}</p>
            <p><strong>Send to admin: </strong>{product.sendToAdmin === true ? <span>SENT</span> : <span>NOT SENT YET</span>}</p>
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
    </div>
  )
}

export default SellerProductItem