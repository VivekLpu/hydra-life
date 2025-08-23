// server/models/orderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      name: String,
      phone: String,
      address: String,
      email: String,
    },
    items: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Accepted", "Delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
