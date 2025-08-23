

  import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TrackOrder from "./pages/TrackOrder";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminProductList from "./pages/AdminProductList";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  useEffect(() => {
    // Listen for storage updates (in case other tabs/windows change it)
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/products"
          element={isAdmin ? <AdminProductList /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/add-product"
          element={isAdmin ? <AdminAddProduct /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/product/:id/edit"
          element={isAdmin ? <AdminEditProduct /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/orders"
          element={isAdmin ? <AdminOrders /> : <Navigate to="/admin/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
