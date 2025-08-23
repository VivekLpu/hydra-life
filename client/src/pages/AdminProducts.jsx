// client/src/pages/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchProducts = async () => {
    const res = await API.get("/admin/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    await API.post("/admin/products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setName("");
    setPrice("");
    setImage(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="container py-5">
      <h2>Manage Products</h2>

      <form onSubmit={handleAddProduct} className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button className="btn btn-primary" type="submit">
          Add Product
        </button>
      </form>

      <ul className="list-group">
        {products.map((p) => (
          <li
            key={p._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {p.name} - ₹{p.price}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(p._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
