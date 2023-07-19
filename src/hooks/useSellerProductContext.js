import { useContext } from "react";
import { SellerProductContext } from "../context/SellerProductContext";


export const useSellerProductContext = () => {
  const context = useContext(SellerProductContext)

  return context
}