
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/homepage/logo.png";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const { cart } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg glass-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Hydra Life" className="navbar-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <Link className="nav-link nav-btn" to="/">Home</Link>
            <Link className="nav-link nav-btn" to="/products">Products</Link>
            <Link className="nav-link nav-btn" to="/about">About Us</Link>
            <Link className="nav-link nav-btn" to="/contact">Contact Us</Link>
            <Link className="nav-link nav-btn" to="/track-order">Track Order</Link>
          </ul>

          <div className="d-flex">
            <Link
              to="/cart"
              className="btn btn-primary position-relative"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "80px", marginRight: "10px" }}
            >
              <i id="cart-icon" className="bi bi-cart" style={{ fontSize: "1.2rem" }}></i>
              <span style={{ marginLeft: "5px" }}>Cart</span>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 7px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {isAdmin && (
              <button onClick={handleLogout} className="btn btn-danger ms-2">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
