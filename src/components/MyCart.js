import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function MyCart() {
  const { cartItems, removeFromCart, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handlePlaceOrder = () => {
    placeOrder();
    navigate('/my-orders');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <img
                    src={item.img} 
                    className="img-fluid rounded-start"
                    alt={item.item}
                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.item}</h5>
                    <p className="card-text">Option: {item.option}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <p className="card-text">Price: ₹{item.price}</p>
                    <p className="card-text fw-bold">Total: ₹{item.totalPrice}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <h3 className="mt-4">
            Total Amount: ₹
            {cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
          </h3>
          <button
            className="btn btn-primary mt-4"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
