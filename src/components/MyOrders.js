import React, { useContext } from 'react';
import { CartContext } from './CartContext';

export default function MyOrders() {
  const { orders } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div>
          {orders.map((item, index) => (
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
                  </div>
                </div>
              </div>
            </div>
          ))}
          <h3 className="mt-4">
            Total Amount: ₹
            {orders.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
}
