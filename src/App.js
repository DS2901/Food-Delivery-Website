import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SignUp from "./screens/SignUp";
import MyCart from "./components/MyCart";
import MyOrders from "./components/MyOrders";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/createuser" element={<SignUp/>}/>
          <Route exact path="/my-cart" element={<MyCart />} />
          <Route exact path="/my-orders" element={<MyOrders />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
