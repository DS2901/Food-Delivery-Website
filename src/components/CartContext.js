// src/components/CartContext.js
import React, { createContext, useReducer, useEffect } from 'react';

// Create CartContext
export const CartContext = createContext();

// Define initial state
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  orders: JSON.parse(localStorage.getItem('orders')) || [],
};

// Define reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((_, index) => index !== action.payload),
      };
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders, ...state.cartItems],
        cartItems: [],
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

// Create CartProvider to wrap around components that need access to cart
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cartItems and orders to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.orders]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const placeOrder = () => {
    dispatch({ type: 'PLACE_ORDER' });
    localStorage.removeItem('cartItems'); // Clear cartItems from localStorage
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cartItems'); // Clear cartItems from localStorage
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, orders: state.orders, addToCart, removeFromCart, placeOrder, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
