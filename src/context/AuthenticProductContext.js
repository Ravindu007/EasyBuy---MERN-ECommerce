import { createContext, useReducer } from "react";

export const AuthenticProductContext = createContext()

export const authenticProductReducer = (state,action) => {
  switch(action.type){
    case 'GET_ALL_AUTHENTICS':
      return{
        authenticProducts:action.payload
      }
    default:
      return state
  }
}

export const AuthenticProductContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(authenticProductReducer, {
    authenticProducts:null
  })

  return(
    <AuthenticProductContext.Provider value={{...state,dispatch}}>
      {children}
    </AuthenticProductContext.Provider>
  )
}