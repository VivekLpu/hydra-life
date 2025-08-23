import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const getData = async () => {
      const res = await API.get(`/products/${id}`);
      setFormData(res.data);
    };
    getData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/products/${id}`, formData);
    alert("Product Updated");
    navigate("/admin/products");
  };

  return (
    <div className="container py-5">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate} style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <input className="form-control" name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name"/>
        </div>
        <div className="mb-3">
          <input className="form-control" name="price" value={formData.price || ""} onChange={handleChange} placeholder="Price"/>
        </div>
        <div className="mb-3">
          <textarea className="form-control" name="description" value={formData.description || ""} onChange={handleChange} placeholder="Description"/>
        </div>
        <div className="mb-3">
          <input className="form-control" name="image" value={formData.image || ""} onChange={handleChange} placeholder="Image URL"/>
        </div>
        <button className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
