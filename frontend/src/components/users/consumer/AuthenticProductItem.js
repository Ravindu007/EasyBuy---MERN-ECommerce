import React from 'react'

const AuthenticProductItem = ({product}) => {
  return (
    <div className='AuthenticProductItem mt-3' style={{border:"1px solid"}}>
      <div className="row">
        <div className="col-4">
          <p><strong>Product Name: </strong>{product.productName}</p>
          <p><strong>Business Name: </strong>{product.businessName}</p>
          <p><strong>Business Email: </strong>{product.userEmail}</p>
          <p><strong>Product Category: </strong>{product.productCategory}</p>
        </div>
        <div className="col-8">
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
    </div>
  )
}

export default AuthenticProductItem