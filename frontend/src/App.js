import {BrowserRouter, Routes,Route, Navigate} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";
import AdminPannel from "./pages/admin/AdminPannel";
import ProductManagement from "./pages/admin/ProductManagement";
import SellerManagement from "./pages/admin/SellerManagement";
import Home from "./pages/Home";
import ViewAllProducts from "./pages/seller/ViewAllProducts";
import Signup from "./pages/userForms/Signup";
import Login from "./pages/userForms/Login"
import { useAuthContext } from "./hooks/authHooks/useAuthContext";

function App() {
  const {user} = useAuthContext()

  let isAdmin = null
  if(user){
     isAdmin = user && user.email === process.env.REACT_APP_ADMIN_EMAIL
  }
  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAdmin={isAdmin}/> 
        <div className="pages">
          <Routes>
            {/* Router for home page */}
            <Route path="/" element={<Home />}/>

            {/* routes for users */}
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}/>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}/>

            {/* route for admin */}
            {isAdmin &&  (
              <>
              <Route path="/admin" element={user ? <AdminPannel/> :<Navigate to="/login"/> }/>
              <Route path="/admin/sellerManagement" element={user ? <SellerManagement/>: <Navigate to="/login"/>}/>
              <Route path="/admin/productManagement" element={user ?<ProductManagement/>: <Navigate to="/login"/>}/>
              </>
            )}


            {/* Routes for sellers */}
            <Route path="/seller/viewProducts" element={user ? <ViewAllProducts/> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
