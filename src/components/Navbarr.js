import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon from react-icons

export default function Navbarr() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Fetch user email from localStorage
    const email = localStorage.getItem("userEmail");
    console.log("Retrieved email from localStorage:", email); // Debug log
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail"); // Remove userEmail on logout
    setUserEmail(null); // Clear email from state
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Deliver Now</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/my-orders">My Orders</Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <div className="btn bg-white text-success mx-2">
                  <Link to="/my-cart" className="text-decoration-none text-success">
                    My Cart ({cartItems.length})
                  </Link>
                </div>
                <div className="d-flex align-items-center mx-2">
                  <FaUserCircle size={40} className="text-white me-2" /> {/* Larger profile icon */}
                  <div className="text-white">
                    <div className="d-flex flex-column align-items-start">
                      <span className="fs-6 text-color-black">{userEmail}</span> {/* Display email */}
                    </div>
                  </div>
                </div>
                <div className="btn bg-danger text-white mx-2" onClick={handleLogOut}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
