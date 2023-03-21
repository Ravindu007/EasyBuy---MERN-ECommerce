import React, { useEffect, useState } from 'react'

const ReportForm = () => {

  

  // fetch all the registerd brands / business => for select options
  const [businessList, setBusinessList] = useState([])

  useEffect(()=>{
    const fetchAllRegisteredBusinesses = async() => {
      const response = await fetch("/api/users/consumer/gatAllBusinessNames")
      const json = await response.json()

      if(response.ok){
        setBusinessList(json)
      }
    }

    fetchAllRegisteredBusinesses()

  },[])


  // need to inform (report) to that particular business with the follwoing id
  const [businessId, setBusinessId] = useState("")

  
  // input fields
  const [businessName, setBusinessName] = useState("")
  const [productName, setProductName] = useState("")
  const [dateOfPurchase, setDateOfPurchase] = useState("")
  const [fakeProductImage1, setFakeProductImage1] = useState(null)
  const [fakeProductImage2, setFakeProductImage2] = useState(null)

  // submit a report including above details and businessId
  const submitReport = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('businessId', businessId)
    formData.append('businessName', businessName)
    formData.append('productName',productName)
    formData.append('dateOfPurchase', dateOfPurchase)
    formData.append('fakeProductImage1', fakeProductImage1)
    formData.append('fakeProductImage2', fakeProductImage2)

    const response = await fetch("/api/users/consumer/createReport",{
      method:"POST",
      body:formData
    })

    const json = await response.json()
    if(response.ok){
      console.log(json);
    }
  }

  return (
    <div className="reportForm">
      <form onSubmit={submitReport}>
        <div className="form-group">
        <label>Business Name of your bought Product</label>
        <select
          className='form-select'
          value={businessName}
          onChange = {e=>{
            setBusinessName(e.target.value)
            const selectedBusiness = businessList.find(business => business.businessName === e.target.value)
            setBusinessId(selectedBusiness._id)
          }}
        > 
           <option>Select</option>
            {businessList.map((business, index) => (
              <option key={index} value={business.businessName}>{business.businessName}</option>
            ))}
        </select>
        <p>{businessId}</p>
        </div>
        <div className="form-group">
          <label>Name of the product</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>setProductName(e.target.value)}
            value={productName}
          />
        </div>
        <div className="form-group">
          <label>Date of purchase</label>
          <input 
            type="date"
            className='form-control'
            onChange={e=>setDateOfPurchase(e.target.value)}
            value={dateOfPurchase}
          />
        </div>
        <div className="form-group">
          <label>Image 1 of the product</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>setFakeProductImage1(e.target.files[0])}
            name='fakeProduct1'
          />
        </div>
        <div className="form-group">
          <label>Image 2 of the product</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>setFakeProductImage2(e.target.files[0])}
            name='fakeProduct2'
          />
        </div>
        <button className='btn btn-outline-secondary'>REPORT</button>
      </form>
    </div>
  )
}

export default ReportForm