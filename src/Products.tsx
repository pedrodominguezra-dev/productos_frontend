import { BrowserRouter } from "react-router"
import { AppRoute } from "./router/AppRoute"
import { Toaster } from "sonner"



export const Products = () => {
  return (
     <BrowserRouter>
        <AppRoute />
        <Toaster position="top-center" richColors />    
     </BrowserRouter>
  )
}
