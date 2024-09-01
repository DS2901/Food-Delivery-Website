import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  orders: [],
};

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

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const placeOrder = () => {
    dispatch({ type: 'PLACE_ORDER' });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, orders: state.orders, addToCart, removeFromCart, placeOrder, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
