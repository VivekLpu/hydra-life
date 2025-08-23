  // client/src/pages/ProductDetails.jsx
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import API from "../utils/api";
  import ProductReviews from "../components/ProductReviews";
  import "../styles/ProductDetails.css";
  import { div } from "framer-motion/client";

  const StarsInline = ({ value = 0 }) => {
    const full = Math.round(value);
    return (
      <span className="stars-inline" aria-label={`Rating ${full} out of 5`}>
        {"★".repeat(full)}
        <span className="dimmed">{"★".repeat(5 - full)}</span>
      </span>
    );
  };

  const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    // load product
    useEffect(() => {
      (async () => {
        try {
          const { data } = await API.get(`/products/${id}`);
          setProduct(data);
        } catch (e) {
          console.error(e);
        }
      })();
    }, [id]);

    // when a new review is added, keep header stats in sync immediately
    const handleReviewAdded = (newRating) => {
      setProduct((prev) => {
        if (!prev) return prev;
        const prevCount =
          (typeof prev.numReviews === "number" ? prev.numReviews : prev.reviews?.length) || 0;
        const prevAvg = typeof prev.rating === "number" ? prev.rating : 0;
        const newCount = prevCount + 1;
        const newAvg = ((prevAvg * prevCount) + newRating) / newCount;
        return { ...prev, numReviews: newCount, rating: newAvg };
      });
    };

    if (!product) return <div className="container"><div className="skeleton-card" /></div>;

    const avg = product.rating || 0;
    const count = product.numReviews || product.reviews?.length || 0;

    return (
      <div className="main">
      <div className="container product-details">
        <div className="pd-card fade-in-up">
          <div className="pd-media">
            <img
              src={product.image || "https://via.placeholder.com/500x400?text=No+Image"}
              alt={product.name}
              className="pd-image"
            />
          </div>

          <div className="pd-info">
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-desc">{product.description}</p>

            <div className="pd-rating-row">
              <StarsInline value={avg} />
              <span className="pd-rating-count">({count} reviews)</span>
            </div>

            <div className="pd-price">₹{product.price}</div>
          </div>
        </div>

        <ProductReviews product={product} onReviewAdded={handleReviewAdded} />
      </div>
      </div>
    );
  };

  export default ProductDetails;
