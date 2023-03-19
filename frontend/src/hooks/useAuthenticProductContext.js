import { useContext } from "react";
import {AuthenticProductContext} from "../context/AuthenticProductContext"


export const useAuthenticProductContext = () => {
  const context = useContext(AuthenticProductContext)

  return context
}