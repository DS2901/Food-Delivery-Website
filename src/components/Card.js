import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";

export default function Card(props) {
  const { addToCart } = useContext(CartContext); // Use the CartContext
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(Object.keys(props.options[0])[0]);

  const options = props.options[0];
  const priceOptions = Object.keys(options);

  const handleQuantityChange = (event) => {
    setSelectedQuantity(Number(event.target.value));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddToCart = () => {
    const cartItem = {
      item: props.item,
      option: selectedOption,
      quantity: selectedQuantity,
      price: options[selectedOption],
      totalPrice: selectedQuantity * options[selectedOption],
      img: props.image, // Add the image to the cart item
    };
    addToCart(cartItem); // Add the item to the cart
    console.log(`Added ${selectedQuantity} of ${props.item} (${selectedOption}) to the cart.`);
  };

  const totalPrice = selectedQuantity * (Number(options[selectedOption]) || 0);

  return (
    <div className="card mt-3" style={{ width: "18rem" }}>
      <img
        src={props.image}
        className="card-img-top"
        alt="Product"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{props.item}</h5>
        <p className="card-text">{props.description}</p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <select
              className="form-select me-2"
              style={{ width: "45%" }}
              onChange={handleQuantityChange}
              value={selectedQuantity}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              style={{ width: "45%" }}
              onChange={handleOptionChange}
              value={selectedOption}
            >
              {priceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold">Price: ₹{totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-success w-100"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
