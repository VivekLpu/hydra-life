

// client/src/pages/Checkout.jsx
import Swal from "sweetalert2";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa"; // ✅ import WhatsApp icon
import "../styles/Checkout.css";

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        customer: formData,
        recipients: [formData],
        items: cart,
        total
      };

      const res = await API.post("/orders", payload);
      const id = res.data.orderId;

      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully!",
        html: `<p>Your Order ID is: <strong>${id}</strong></p>`,
        showConfirmButton: true,
        confirmButtonColor: "#2f80ed",
        background: "rgba(255, 255, 255, 0.95)",
        color: "#2f80ed"
      });

      dispatch({ type: "CLEAR_CART" });
      navigate(`/track-order`);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while placing your order.",
        confirmButtonColor: "#2f80ed"
      });
    }
  };

  // ✅ WhatsApp Order Handler
  const handleWhatsAppOrder = () => {
    const whatsappNumber = "+919693306678"; // change this to your WhatsApp number
    const message = `Hello, I want to place an order.\n\nCustomer: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nEmail: ${formData.email}\n\nItems:\n${cart
      .map((item) => `${item.name} x ${item.quantity}`)
      .join(", ")}\n\nTotal: ₹${total}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section className="checkout-section">
      <div className="container py-5">
        <h2 className="text-center text-white fw-bold mb-5" data-aos="fade-up">
          Checkout
        </h2>

        <div className="row g-4">
          {/* Delivery Details */}
          <div className="col-md-6" data-aos="fade-right">
            <div className="checkout-card p-4 rounded shadow">
              <h4 className="fw-bold text-white mb-4">Delivery Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="address"
                    placeholder="Delivery Address"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Normal Place Order */}
                <button className="btn-submit w-100">Place Order</button>

                {/* WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="btn btn-success w-100 mt-3 d-flex justify-content-center align-items-center"
                >
                  <FaWhatsapp size={20} className="me-2" />
                  Order via WhatsApp
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-6" data-aos="fade-left">
            <div className="checkout-card p-4 rounded shadow">
              <h4 className="fw-bold text-white mb-4">Order Summary</h4>
              {cart.map((item) => (
                <p className="text-white" key={item._id}>
                  {item.name} x {item.quantity}{" "}
                  <span className="float-end">
                    ₹{item.price * item.quantity}
                  </span>
                </p>
              ))}
              <hr className="text-light" />
              <h3 className="fw-bold text-warning">Total: ₹{total}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
