

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/Products.css";

const Products = () => {
  const [addedMessage, setAddedMessage] = useState("");
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await API.get("/products");
  //       setProducts(res.data);
  //     } catch (err) {
  //       console.log("Error getting products:", err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      const productList = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.products)
        ? res.data.products
        : [];
      setProducts(productList);
    } catch (err) {
      console.log("Error getting products:", err);
      setProducts([]);
    }
  };
  fetchProducts();
}, []);


  const addToCart = (product, e) => {
    const button = e.currentTarget;
    const card = button.closest(".card");
    const img = card ? card.querySelector("img") : null;
    const cartIcon = document.getElementById("cart-icon");

    setAddedMessage(`${product.name} added to cart!`);
    setTimeout(() => setAddedMessage(""), 2000);

    if (!img || !cartIcon) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      return;
    }

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const imgClone = img.cloneNode(true);
    imgClone.classList.add("fly-img");
    Object.assign(imgClone.style, {
      left: `${imgRect.left}px`,
      top: `${imgRect.top}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
      opacity: "1",
      transform: "scale(1.2)",
    });

    document.body.appendChild(imgClone);

    requestAnimationFrame(() => {
      const midX = imgRect.left + (cartRect.left - imgRect.left) / 2;
      const midY = imgRect.top - 150;

      const deltaX =
        cartRect.left + cartRect.width / 2 - (imgRect.left + imgRect.width / 2);
      const deltaY =
        cartRect.top + cartRect.height / 2 - (imgRect.top + imgRect.height / 2);

      imgClone.style.transition =
        "transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 1s";

      imgClone.animate(
        [
          { transform: `translate(0,0) scale(1.2)`, opacity: 1 },
          {
            transform: `translate(${midX - imgRect.left}px, ${
              midY - imgRect.top
            }px) scale(1.1)`,
            opacity: 0.9,
          },
          {
            transform: `translate(${deltaX}px, ${deltaY}px) scale(0.2)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        }
      );

      setTimeout(() => {
        imgClone.remove();
        cartIcon.classList.add("cart-bounce");
        setTimeout(() => cartIcon.classList.remove("cart-bounce"), 300);
        dispatch({ type: "ADD_TO_CART", payload: product });
      }, 1000);
    });
  };

  const buyNow = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    navigate("/cart");
  };

  // ⭐ Helper function to render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="products-section">
      <h2 className="products-heading">
        ✨ Explore Our Exclusive Collection ✨
      </h2>
      {addedMessage && <div className="cart-message">{addedMessage}</div>}

      <div className="container">
        <div className="row g-4">
          {products.map((item, index) => {
            // average rating calculation
            const avgRating =
              item.reviews && item.reviews.length > 0
                ? (
                    item.reviews.reduce((acc, r) => acc + r.rating, 0) /
                    item.reviews.length
                  ).toFixed(1)
                : 0;

            return (
              <div
                key={item._id}
                className="col-6 col-md-4 col-lg-3"
                style={{
                  animation: `fadeIn 0.6s ease forwards`,
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0,
                }}
              >
                <div className="card product-card h-100">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top product-img"
                    onClick={() => navigate(`/product/${item._id}`)}
                    style={{
                      cursor: "pointer",
                      animation: `zoomIn 0.5s ease forwards`,
                      animationDelay: `${index * 0.15 + 0.15}s`,
                      opacity: 0,
                    }}
                  />

                  <div className="card-body d-flex flex-column text-center">
                    {/* Title */}
                    <h6
                      className="card-title fw-bold mb-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      {item.name}
                    </h6>

                    {/* ⭐ Reviews Section */}
                    <div className="mb-2">
                      <span className="stars">
                        {renderStars(avgRating)}
                      </span>
                      <span className="review-count text-muted small">
                        ({item.reviews?.length || 0})
                      </span>
                    </div>

                    {/* Price */}
                    <p className="text-success fw-semibold mb-3">
                      ₹{item.price}
                    </p>

                    {/* Buttons */}
                    <button
                      onClick={(e) => addToCart(item, e)}
                      className="btn btn-outline-primary btn-sm mb-2"
                      style={{ borderRadius: "20px" }}
                    >
                      🛒 Add to Cart
                    </button>

                    <button
                      onClick={() => buyNow(item)}
                      className="btn btn-primary btn-sm btn-rounded"
                      style={{
                        animation: `fadeUp 0.4s ease forwards`,
                        animationDelay: `${index * 0.15 + 0.45}s`,
                        opacity: 0,
                      }}
                    >
                      ⚡ Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;

