// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// const PORT = process.env.PORT || 5000;

// // Import Routes
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// const app = express();

// const allowedOrigins = [
//   "https://hydra-life-frontend.vercel.app",
//   "https://hydralife.in",
//   "https://www.hydralife.in",
//   "http://localhost:3000"
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     // allow requests with no origin (like mobile apps or Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       console.warn("Blocked by CORS:", origin);
//       return callback(null, false); // don't throw error, just block silently
//     }
//   },
//   credentials: true
// }));

// app.use(express.json());


// // Static folder for uploaded images
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // API Routes
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/admin", adminRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//     console.log("✅ MongoDB connected");
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));


// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Import Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "https://hydra-life-frontend.vercel.app",
  "https://hydralife.in",
  "https://www.hydralife.in",
  "http://localhost:3000"
];

// CORS setup
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      return callback(null, false); // silently block
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// Health check endpoint for uptime monitoring
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    console.log("✅ MongoDB connected");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

