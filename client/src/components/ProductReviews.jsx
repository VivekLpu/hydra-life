// client/src/components/ProductReviews.jsx
import React, { useState } from "react";
import API from "../utils/api";
import "../styles/ProductReviews.css";

const ratingLabels = {
  1: "Poor",
  2: "Average",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

const ProductReviews = ({ product, onReviewAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(product.reviews || []);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setRating(0);
    setHover(0);
    setComment("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;

    try {
      setSubmitting(true);
      const res = await API.post(`/products/${product._id}/reviews`, {
        name,
        rating,
        comment,
      });

      // add new review instantly
      setReviews((prev) => [...prev, res.data.review]);

      // let parent update avg + count immediately
      if (typeof onReviewAdded === "function") {
        onReviewAdded(rating);
      }

      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="reviews-wrapper fade-in-up">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        {!showForm && (
          <button
            className="btn btn-primary review-btn"
            onClick={() => setShowForm(true)}
          >
            Review this Product
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form className="review-form slide-down" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Your Name</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-field">
            <label>Rating</label>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  className={`star-btn ${
                    (hover || rating) >= value ? "active" : ""
                  }`}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(value)}
                  aria-label={`${value} star`}
                >
                  ★
                </button>
              ))}
              {(hover || rating) > 0 && (
                <span className="rating-label">
                  {ratingLabels[hover || rating]}
                </span>
              )}
            </div>
          </div>

          <div className="form-field">
            <label>Comment</label>
            <textarea
              className="textarea"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            >
              Cancel
            </button>
            <button className="btn btn-success" disabled={submitting || !rating}>
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="muted">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((rev, i) => (
            <article className="review-card pop-in" key={`${rev._id || i}`}>
              <div className="review-card-header">
                <div className="reviewer">
                  <div className="avatar">{(rev.name || "A").charAt(0)}</div>
                  <div className="reviewer-meta">
                    <strong className="name">{rev.name || "Anonymous"}</strong>
                    <div className="stars-static" aria-label={`${rev.rating} out of 5`}>
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <span
                          key={idx}
                          className={`star ${idx < rev.rating ? "filled" : ""}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="pill">{ratingLabels[rev.rating] || ""}</span>
              </div>
              <p className="review-text">{rev.comment}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
