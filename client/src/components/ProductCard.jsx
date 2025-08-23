import { Link } from "react-router-dom";

// Example
<Link to={`/product/${product._id}`}>
  <div className="card">
    <img src={product.image} alt={product.name} />
    <h5>{product.name}</h5>
    <p>₹{product.price}</p>
  </div>
</Link>
