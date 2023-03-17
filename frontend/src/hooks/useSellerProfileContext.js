import { useContext } from "react";
import { SellerProfileContext } from "../context/SellerProfileContext";


export const useSellerProfileContext = () => {
  const context = useContext(SellerProfileContext)

  return context
}