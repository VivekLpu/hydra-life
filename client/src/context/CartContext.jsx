import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const exist = state.find((i) => i._id === item._id);
      if (exist) {
        return state.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...state, { ...item, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      return state.filter((i) => i._id !== action.payload);
    case "UPDATE_QTY":
      return state.map((i) =>
        i._id === action.payload._id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
    case "CLEAR_CART":
  return [];


    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
