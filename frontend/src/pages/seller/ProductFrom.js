import React, { useState } from 'react'

const ProductFrom = () => {
  // input fields
  const [productName, setProductName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [numberOfItems, setNumberOfItems] = useState(0)
  const [productImage1, setProductImage1] = useState(null)
  const [productImage2, setProductImage2] = useState(null)
  const [productImage3, setProductImage3] = useState(null)


  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('productName' , productName)
    formData.append('productCategory', productCategory)
    formData.append('numberOfItems', numberOfItems)
    formData.append('productImage1', productImage1)
    formData.append('productImage2', productImage2)
    formData.append('productImage3', productImage3)

    const response = await fetch("/api/users/seller/createProduct", {
      method:"POST",
      body:formData
    })

    const json = await response.json()
    if(response.ok){
      console.log(json);
    }
  }

  return (
    <div className='productForm'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setProductName(e.target.value)}}
            value={productName}
          />
        </div>
        <div className="form-group">
          <label>Product Category</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setProductCategory(e.target.value)}}
            value={productCategory}
          />
        </div>
        <div className="form-group">
          <label>Number of items</label>
          <input 
            type="number"
            className='form-control'
            onChange={e=>{setNumberOfItems(e.target.value)}}
            value={numberOfItems}
          />
        </div>
        <div className="form-group">
          <label>Product Image 1</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>{setProductImage1(e.target.files[0])}}
            name='productImage1'
          />
        </div>
        <div className="form-group">
          <label>Product Image 2</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>{setProductImage2(e.target.files[0])}}
            name='productImage2'
          />
        </div>
        <div className="form-group">
          <label>Product Image 3</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>{setProductImage3(e.target.files[0])}}
            name='productImage3'
          />
        </div>
        <button className='btn btn-primary'>ADD</button>
      </form>
    </div>
  )
}

export default ProductFrom