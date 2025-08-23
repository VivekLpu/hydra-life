const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getProfile,
} = require("../controllers/adminController");

const {
  addProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");

const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ================== AUTH ==================
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protect, getProfile);

// ================== PRODUCT MANAGEMENT ==================
router.post("/products", protect, upload.single("image"), addProduct);
router.get("/products", protect, getProducts);
router.delete("/products/:id", protect, deleteProduct);

// ================== ORDER MANAGEMENT ==================
router.get("/orders", protect, getAllOrders);                // Admin - list all
router.put("/orders/:id/status", protect, updateOrderStatus); // Admin - update status
router.delete("/orders/:id", protect, deleteOrder);           // Admin - delete

module.exports = router;
