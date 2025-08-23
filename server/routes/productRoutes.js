// // routes/productRoutes.js
// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");

// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");

// // Public Routes
// router.get("/", getProducts);          // Get all products
// router.get("/:id", getProductById);    // Get single product by ID

// // Admin Routes (Protected)
// router.post("/", protect, upload.single("image"), addProduct); // Add product with image
// router.put("/:id", protect, upload.single("image"), updateProduct); // Update product
// router.delete("/:id", protect, deleteProduct); // Delete product

// module.exports = router;


// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");

// Public Routes
router.get("/", getProducts);                 // Get all products
router.get("/:id", getProductById);           // Get single product by ID
router.post("/:id/reviews", createProductReview); // Add review to product

// Admin Routes (Protected)
router.post("/", protect, upload.single("image"), addProduct); 
router.put("/:id", protect, upload.single("image"), updateProduct); 
router.delete("/:id", protect, deleteProduct); 

module.exports = router;

