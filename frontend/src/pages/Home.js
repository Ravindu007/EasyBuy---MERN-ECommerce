import React, { useState , useEffect} from 'react'
import QrScanner from 'qr-scanner';
import {useSellerProductContext} from "../hooks/useSellerProductContext"
import AuthenticProductItem from '../components/users/consumer/AuthenticProductItem';
import { useAuthenticProductContext } from '../hooks/useAuthenticProductContext';


 
const Home = () => {


  /** ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////**/
  const [isLoadingDetails, setIsLoadingDetails] = useState(true)

  const {sellerProducts:singleProduct, dispatch} = useSellerProductContext()
  const [noMatchFound, setNoMatchFound] = useState(false)


  const [showCameraDevision, setShowCameraDevision] = useState(false)
  const show = () => {
    setShowCameraDevision(!showCameraDevision)
    setIsLoadingDetails(true)
  }

  const [readQR, setReadQR] = useState("")

  // do not delete this part. this will triger the scan each time new input detected
  useEffect(() => {
    if (readQR && !showAuthenticityButton) {
      alert('Please press the authenticity button');
    }
  }, []);

  const scanQR = () => {
    const qrScanner = new QrScanner(
      document.getElementById('cam'),
      result => setReadQR(result),
      setNoMatchFound(false),
      setShowAuthenticityButton(true),
    );

    qrScanner.start();
  }
  

  const [showAuthenticityButton, setShowAuthenticityButton] = useState(false)

  const checkAuthenticity = async(e) => {
  
    const response = await fetch(`/api/users/consumer/getScanDetails?result=${readQR}`)
    const json = await response.json()
    if(response.ok){
      setIsLoadingDetails(false)
      if(json === null){
        setShowAuthenticityButton(false)
        setReadQR("")
        scanQR()
        setNoMatchFound(true);
      }else{
        dispatch({type:"GET_SINGLE_PRODUCT", payload:json})
        setShowAuthenticityButton(false)
        setReadQR("")
        scanQR()
      }
    }
  }



  /** ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////**/

  const {authenticProducts, dispatch:dispatchAuthentics} = useAuthenticProductContext()


  useEffect(()=>{
    const fetchAllAuthentic = async() => {
      const response = await fetch("/api/users/consumer/getAllAuthenticatedProducts")
      const json = await response.json()
  
      if(response.ok){
        dispatchAuthentics({type:"GET_ALL_AUTHENTICS", payload:json})
      }
    }
    
    fetchAllAuthentic()

  },[])





  return (
    <div className='home'>
      <div className="row">
        <div className="col-8">
          <p>block chain added product</p>
          {Array.isArray(authenticProducts) && authenticProducts.map((product)=>(
              <AuthenticProductItem key={product._id} product={product}/>
          ))}
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-12" style={{display:"flex", flexDirection:"column"}}>
              <p>pop up camera</p>
              <button 
                className='btn btn-outline-primary'
                onClick={show}
              >
                OPEN CAMERA
              </button>
              {showCameraDevision && (
                <>
                <video id='cam'></video>
                <button className='btn btn-warning' onClick={scanQR}>SCAN</button>
                </>
              )}
            </div>
            <div className="col-12">
              <p>scanned details</p>
              {readQR && (
                  showAuthenticityButton && (
                    <button 
                    className=''
                    onClick={checkAuthenticity}
                    >
                      CHECK AUTHENTICITY
                  </button>
                  )
              )}
            </div>
            {isLoadingDetails ? null : ( 
              <div className="col-12">
              {noMatchFound && (
                <>
                <p>No match found in Our block chain</p>
                <button>Report</button>
                </>
              )}
              {singleProduct && !noMatchFound && (
                <>
                  <p><strong>AUTHENTIC</strong></p>
                  <button data-toggle="modal" data-target="#viewMore">View more</button>
                  <div className="modal" tabIndex={-1} role="dialog" id='viewMore'>
                    <div className="modal-dialog" role='documnet'>
                      <div className="modal-content">
                        <div className="modal-body">
                        <>
                          <p><strong>Product Name: </strong>{singleProduct.productName}</p>
                          <p><strong>Business Email: </strong>{singleProduct.userEmail}</p>
                          <p><strong>Product Category: </strong>{singleProduct.productCategory}</p>
                          <p>Product images</p>
                          <button data-toggle="modal" data-target="#productImages">See Images</button>

                          {/* image model */}
                          <div className="modal" tabIndex={-1} role="dialog" id="productImages">
                            <div className="modal-dialog modal-dialog-centerd modal-lg" role="document">
                              <div className="modal-content">
                                <div className="modal-body">
                                
                                  <div className="images" style={{display:"flex", padding:"50px"}}>
                                    <img src={singleProduct.productImage1} className='mx-auto d-block img-fluid' />
                                    <img src={singleProduct.productImage2} className='mx-auto d-block img-fluid' />
                                    <img src={singleProduct.productImage2} className='mx-auto d-block img-fluid' />
                                  </div>
                                
                                </div>
                                <div className="modal-footer">
                                  <button data-dismiss="modal">close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                        </div>
                        <div className="modal-footer">
                          <button data-dismiss="modal">close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home