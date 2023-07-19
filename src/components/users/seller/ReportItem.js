import React from 'react'

const ReportItem = ({report}) => {
  return (
    <div className="reportItem mt-2" style={{border:"1px solid black"}}>
      <p><strong>Report Business Name: </strong>{report.businessName}</p>
      <p><strong>Report Product Name: </strong>{report.productName}</p>
      <p><strong>Date of purchase: </strong>{report.dateOfPurchase}</p>
      <img src={report.fakeProductImage1} alt={report.fakeProductImage1} className='img-fluid'/>
      <img src={report.fakeProductImage2} alt={report.fakeProductImage2} className='img-fluid'/>
    </div>
  )
}

export default ReportItem