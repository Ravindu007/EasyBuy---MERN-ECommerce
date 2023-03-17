import {BrowserRouter, Routes,Route} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";
import AdminPannel from "./pages/admin/AdminPannel";
import ProductManagement from "./pages/admin/ProductManagement";
import SellerManagement from "./pages/admin/SellerManagement";
import Home from "./pages/Home";
import ViewAllProducts from "./pages/seller/ViewAllProducts";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/> 
        <div className="pages">
          <Routes>
            {/* Router for home page */}
            <Route path="/" element={<Home />}/>

            {/* route for admin */}
            <Route path="/admin" element={<AdminPannel/>}/>
            <Route path="/admin/sellerManagement" element={<SellerManagement/>}/>
            <Route path="/admin/productManagement" element={<ProductManagement/>}/>


            {/* Routes for sellers */}
            <Route path="/seller/viewProducts" element={<ViewAllProducts/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
