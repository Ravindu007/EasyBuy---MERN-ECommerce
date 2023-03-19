import uniqid from 'uniqid';


export const generateBlockChainID  = (productId, businessId) => {
  const hashedValue  = uniqid(String(productId), String(businessId))
  return hashedValue;
}