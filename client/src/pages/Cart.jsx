

import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const increaseQty = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: item._id });
    } else {
      dispatch({
        type: "UPDATE_QTY",
        payload: { _id: item._id, quantity: item.quantity - 1 }
      });
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="cart-section py-5">
      <div className="container">
        <h2 className="text-center text-white fw-bold mb-5">Your Cart</h2>
        
        {cart.length === 0 ? (
          <p className="text-center text-light">Your cart is empty!</p>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <div>
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">₹{item.price}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="qty-btn" onClick={() => decreaseQty(item)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => increaseQty(item)}>+</button>
                    <button 
                      className="remove-btn ms-3" 
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item._id })}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary mt-4 p-4 rounded shadow">
              <h4 className="mb-3">Order Summary</h4>
              <h5>Total: ₹{total}</h5>
              <Link to="/checkout" className="btn btn-checkout w-100 mt-3">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
