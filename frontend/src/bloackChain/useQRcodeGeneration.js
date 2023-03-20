import QRCode from 'qrcode';
import { useAuthContext } from '../hooks/authHooks/useAuthContext';
import { useSellerProductContext } from '../hooks/useSellerProductContext';


export const useQRcodeGeneration = () => {

  const {user} = useAuthContext()
  const {dispatch} = useSellerProductContext()

  const generateQR = async (blockChainId, product) => {
  
    const canvas = document.createElement('canvas');
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.3,
      margin: 1,
      color: {
        dark: '#010599FF',
        light: '#FFBF60FF',
      },
    };
    
    // QR code contains the blockchain unique id
    await QRCode.toCanvas(canvas, blockChainId, opts);
  
    // Convert canvas to Blob object => then it fill be the same as normal file
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  
    // Create FormData object with the Blob object
    const formData = new FormData();
    formData.append('QRcode', blob, `${blockChainId}.png`);
  
    const response = await fetch("/api/users/seller/UpdateQR/details/" + product._id,{
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })  
  
    const json = await response.json()
    if(response.ok){
      dispatch({type:"UPDATE_PRODUCT", payload:json})
    } 
  
    
  }

  return {generateQR}

}

export default useQRcodeGeneration

