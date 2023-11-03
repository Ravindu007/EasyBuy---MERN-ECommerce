import React, { useState , useEffect} from 'react'
import QrScanner from 'qr-scanner';
import {useSellerProductContext} from "../hooks/useSellerProductContext"
import AuthenticProductItem from '../components/users/consumer/AuthenticProductItem';
import { useAuthenticProductContext } from '../hooks/useAuthenticProductContext';
import ReportForm from '../components/users/consumer/ReportForm';
import { Modal, Button } from 'react-bootstrap';


 
const Home = () => {

  //QRCODE** ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////**/
  const [isLoadingDetails, setIsLoadingDetails] = useState(true)

  const {sellerProducts:singleProduct, dispatch} = useSellerProductContext()
  const [noMatchFound, setNoMatchFound] = useState(false)




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

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = async() => {
    await setShowModal(true)
    await scanQR()
  };
  
  const [showAuthenticityButton, setShowAuthenticityButton] = useState(false)

  
  // 2nd modal
  const [showSecondModal, setShowSecondModal] = useState(false);

  const handleResultModalCLose = () => setShowSecondModal(false);

  const showResultModel = () => {
    setShowSecondModal(true)
    setShowModal(false)
  };



  const checkAuthenticity = async(e) => {
  
    const response = await fetch(`/api/users/consumer/getScanDetails?result=${readQR}`)
    const json = await response.json()
    if(response.ok){
      setIsLoadingDetails(false)
      if(json === null){
        // setShowAuthenticityButton(false)
        setReadQR("")
        scanQR()
        setNoMatchFound(true);
      }else{
        dispatch({type:"GET_SINGLE_PRODUCT", payload:json})
        // setShowAuthenticityButton(false)
        setReadQR("")
        scanQR()
      }
    }
  }



  //FETCHING AUTHENTICS** /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////**/

  const {authenticProducts, dispatch:dispatchAuthentics} = useAuthenticProductContext()

  // Iman, could you please check this code: this is where we are fetching authentic product data
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

        {/* banner part */}
        <div className="col-12 w-full border-2 border-blue-400">
          <div className="row">
            <div className="col-12  flex flex-col items-center">

              <p>pop up camera</p>
              <button 
                className='btn bg-red-400'
                onClick={handleShow}
              >
                OPEN CAMERA
              </button>
              {/* Camera Model  */}
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <video id='cam'></video>
                  </Modal.Body>
                  <Modal.Footer>
                    {/* results */}
                    <div className="col-12">
                      <p>scanned details</p>
                      {readQR && (
                          showAuthenticityButton && (
                            <Modal
                              show={showResultModel}
                              onHide={handleResultModalCLose}
                              backdrop="static"
                              keyboard={false}
                              className='flex items-center justify-center mt-40'
                            >
                              <Modal.Body className='flex items-center justify-center'>
                                  <button 
                                    className='btn btn-outline-danger'
                                    onClick={checkAuthenticity}
                                  >
                                    CHECK AUTHENTICITY
                                </button>
                              </Modal.Body>
                            </Modal>
                          )
                      )}
                    </div>
                    {isLoadingDetails ? null : ( 
                        <div className="col-12">
                        {noMatchFound && (
                          <>
                          <p>No match found in Our block chain</p>
                          <button data-toggle="modal" data-target="#report">Report</button>

                          {/* report-modal */}
                          <div className="modal" tabIndex={-1} role="dialog" id="report">
                            <div className="modal-dialog modal-dialog-centerd modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                      {/* Report component */}
                                      <ReportForm/>
                                    </div>
                                    <div className="modal-footer">
                                        <button data-dismiss="modal">close</button>
                                    </div>
                                </div>
                              </div>
                          </div>
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
                                    <p><strong>Business Name: </strong>{singleProduct.businessName}</p>
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
                                              <img src={singleProduct.productImage3} className='mx-auto d-block img-fluid' />
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
                    <Button variant="btn btn-outline-secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>

          </div>
        </div>

        {/* Block chain added products part */}
        <div className="col-12">
          <p>block chain added product</p>
          {Array.isArray(authenticProducts) && authenticProducts.map((product)=>(
              <AuthenticProductItem key={product._id} product={product}/>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home