import { createContext, useReducer } from "react";

export const SellerProfileContext = createContext()

export const sellerReducer = (state,action) => {
  switch(action.type){
    case 'GET_ALL_PROFILES':
      return{
        sellerProfiles:action.payload
      }
    case 'GET_SINGLE_PROFILE':
      return{
        sellerProfiles:action.payload
      }
    case 'CREATE_PROFILE':
      return{
        sellerProfiles:[action.payload, ...state.sellerProfiles]
      }
    case 'UPDATE_PROFILE':
      const updatedSellerProfile = state.sellerProfiles.map(sellerProfile => sellerProfile._id === action.payload._id ? action.payload : sellerProfile)
      return{
        sellerProfiles:updatedSellerProfile
      }
    case 'DELETE_PRODUCT':
      if(action.payload && action.payload._id) {
        return {
          sellerProfiles:state.sellerProfiles.filter((sellerProfile)=>sellerProfile._id !== action.payload._id)
        }
      }else{
        return state
      }
    default:
      return state
  }
}

export const SellerProfileContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(sellerReducer, {
    sellerProfiles:null
  })

  return(
    <SellerProfileContext.Provider value={{...state,dispatch}}>
      {children}
    </SellerProfileContext.Provider>
  )
}