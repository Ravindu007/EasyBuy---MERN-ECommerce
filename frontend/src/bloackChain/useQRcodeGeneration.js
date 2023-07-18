import QRCode from 'qrcode';

import { useAuthContext } from '../hooks/authHooks/useAuthContext';
import { useSellerProductContext } from '../hooks/useSellerProductContext';


export const useQRcodeGeneration = () => {

  const {user} = useAuthContext()
  const {dispatch} = useSellerProductContext()

  const generateQR = async (blockChainId, product, business) => {
  
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


    // get canvas context
    const ctx = canvas.getContext("2d");

    // Load the image and draw it onto the canvas using createImageBitmap
    const img = await fetch(business.businessLogo).then((response) => response.blob());
    const bitmap = await createImageBitmap(img);
    const imageWidth = 50;
    const imageHeight = 50;
    const qrCodeCenter = canvas.width / 2; // calculate the center of the QR code
    const imageX = qrCodeCenter - imageWidth / 2;
    const imageY = qrCodeCenter - imageHeight / 2;
    ctx.drawImage(bitmap, imageX, imageY, imageWidth, imageHeight);

  

    // Convert canvas to Blob object => then it fill be the same as normal file
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  
    // Create FormData object with the Blob object
    const formData = new FormData();
    formData.append('QRcode', blob, `${blockChainId}.png`);
  
    const response = await fetch("https://travelog-backend.onrender.com/api/users/seller/UpdateQR/details/" + product._id,{
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

