import { createContext, useReducer } from "react";

export const ReportContext = createContext()


export const reportReducer = (state, action) => {
  switch(action.type){
    case 'GET_ALL_REPORTS':
      return{
        reports: action.payload
      }
    
    case 'CREATE_REPORT':
      return{
        reports:[action.payload, ...state.reports]
      }
    default:
      return state
  }
}

export const ReportContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reportReducer, {
    reports:null
  })
  return(
    <ReportContext.Provider value={{...state,dispatch}}>
      {children}
    </ReportContext.Provider>
  )
}