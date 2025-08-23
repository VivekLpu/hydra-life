

import React, { useState } from "react";
import API from "../utils/api";
import "../styles/TrackOrder.css";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/orders/track", { orderId, phone });
      setOrder(res.data.order);
    } catch (err) {
      alert("Order not found!");
    }
  };

  return (
    <section className="track-section py-5">
      <div className="container">
        <h2 className="text-center text-white fw-bold mb-4">
          Track Your Order
        </h2>
        <p className="text-center text-light mb-5">
          Enter your Order ID and Phone Number to check your order status.
        </p>

        <form
          onSubmit={handleSubmit}
          className="track-form mx-auto p-4 rounded shadow"
          style={{ maxWidth: "450px" }}
        >
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button className="btn-track w-100">Track Order</button>
        </form>

        {order && (
          <div className="order-details mt-4 p-4 rounded shadow text-white">
            <h5>
              <strong>Status:</strong> {order.status}
            </h5>
            <p>
              <strong>Name:</strong> {order.customer.name}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackOrder;
