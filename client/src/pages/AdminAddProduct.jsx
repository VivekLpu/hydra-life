
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // get the uploaded image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      if (image) {
        data.append("image", image);
      }

      await API.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="container py-5">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
