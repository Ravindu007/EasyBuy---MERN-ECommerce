import uniqid from 'uniqid';

// simulation for block chain log


export const generateBlockChainID  = (productId, businessId) => {
  const hashedValue  = uniqid(String(productId), String(businessId))
  return hashedValue;
}