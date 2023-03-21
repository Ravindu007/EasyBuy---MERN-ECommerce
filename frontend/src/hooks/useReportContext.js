import { useContext } from "react";
import { ReportContext } from "../context/ReportContext";

export const useReportContext = () => {
  const context = useContext(ReportContext)

  if(!context){
    throw Error("Outof context")
  }

  return context
}