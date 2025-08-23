import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const AdminProductList = () => {
    const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container py-5">
      <h3>All Products</h3>
      <Link to="/admin/add-product" className="btn btn-primary mb-3">Add New Product</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
  <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/admin/product/${p._id}/edit`)}>Edit</button>
  <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p._id)}>Delete</button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
