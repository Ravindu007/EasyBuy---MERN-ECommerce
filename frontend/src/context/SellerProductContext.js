import { createContext, useReducer } from "react";

export const SellerProductContext = createContext()

export const sellerProductReducer = (state, action) => {
  switch(action.type){
    case 'GET_ALL_PRODUCTS':
      return{
        sellerProducts:action.payload
      }
    case 'GET_SINGLE_PRODUCT':
      return{
        sellerProducts:action.payload
      }
    case 'CREATE_PRODUCT':
      return{
        sellerProducts:[action.payload, ...state.sellerProducts]
      }
    case 'UPDATE_PRODUCT':
      const updatedSellerProducts = state.sellerProducts.map(sellerProduct => sellerProduct._id === action.payload._id ? action.payload : sellerProduct)
      return{
        sellerProducts:updatedSellerProducts
      }
    case 'DELETE_PRODUCT':
      if(action.payload && action.payload._id) {
        return {
          sellerProducts:state.sellerProducts.filter((sellerProduct)=>sellerProduct._id !== action.payload._id)
        }
      }else{
        return state
      }
    default:
      return state
  }
}

export const SellerProductContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(sellerProductReducer, {
    sellerProducts:null
  })

  return(
    <SellerProductContext.Provider value={{...state, dispatch}}>
      {children}
    </SellerProductContext.Provider>
  )
}