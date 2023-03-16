import React, { useEffect, useState } from 'react'
import ProductFrom from './ProductFrom'

const ViewAllProducts = () => {
  const [products, setProducts] = useState(null)
  
  useEffect(()=>{
    const fetchAllSellerProducts = async() => {
      const response = await fetch("/api/users/seller/getAllProducts")
      const json = await response.json()

      if(response.ok){
        setProducts(json)
        console.log(json);
      }
    }

    fetchAllSellerProducts()

  },[])


  return (
    <div className='vewAllProducts'>
    <div className="row">
    <div className="col-8">
        <p>Products</p>
        {/* {products && products.map((product)=>(
          <p key={product._id}>{product.productName}</p>
        ))} */}
      </div>
      <div className="col-4">
        <ProductFrom/>
      </div>
    </div>
    </div>
  )
}

export default ViewAllProducts