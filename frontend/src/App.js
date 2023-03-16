import {BrowserRouter, Routes,Route} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";
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

            {/* Routes for sellers */}
            <Route path="/seller/viewProducts" element={<ViewAllProducts/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
