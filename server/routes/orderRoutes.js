

// // server/routes/orderRoutes.js
// const express = require("express");
// const Order = require("../models/orderModel");
// const nodemailer = require("nodemailer");
// const { trackOrder } = require("../controllers/orderController");

// // const twilio = require("twilio"); // SMS disabled for now

// const router = express.Router();



// // POST /api/orders/track -> track order by orderId + phone
// router.post("/track", trackOrder);


// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // POST /api/orders -> place order
// router.post("/", async (req, res) => {
//   try {
//     const { customer, items, total } = req.body;

//     if (!customer?.name || !customer?.phone || !customer?.address) {
//       return res.status(400).json({ error: "Missing customer details" });
//     }

//     if (!items || items.length === 0) {
//       return res.status(400).json({ error: "No items in order" });
//     }

//     // Generate unique orderId
//     const orderId = "ORD" + Date.now();

//     // Save to DB
//     const order = new Order({
//       orderId,
//       customer,
//       items,
//       total
//     });
//     await order.save();

//     // --- SMS sending is disabled for now ---
//     // Uncomment below when SMS feature is ready
//     /*
//     const twilioClient = twilio(
//       process.env.TWILIO_ACCOUNT_SID,
//       process.env.TWILIO_AUTH_TOKEN
//     );

//     try {
//       await twilioClient.messages.create({
//         body: `Thank you ${customer.name}! Your order (${orderId}) has been placed successfully.`,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: customer.phone.startsWith("+")
//           ? customer.phone
//           : `+91${customer.phone}`
//       });
//     } catch (smsErr) {
//       console.error("SMS send error:", smsErr.message);
//     }
//     */

//     // Send Email
//     if (customer.email) {
//       try {
//         await transporter.sendMail({
//           from: `"Shop" <${process.env.EMAIL_USER}>`,
//           to: customer.email,
//           subject: "Order Confirmation",
//           text: `Hello ${customer.name},\n\nYour order (${orderId}) has been placed successfully!\n\nTotal: ₹${total}\n\nThank you for shopping with us!`
//         });
//       } catch (emailErr) {
//         console.error("Email send error:", emailErr.message);
//       }
//     }

//     res.json({ success: true, orderId });
//   } catch (err) {
//     console.error("Order error:", err);
//     res.status(500).json({ error: "Order failed. Please try again." });
//   }
// });

// // GET /api/orders -> list all (admin)
// router.get("/", async (req, res) => {
//   const orders = await Order.find();
//   res.json(orders);
// });

// // PUT /api/orders/:id -> update order (admin)
// router.put("/:id", async (req, res) => {
//   const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// // DELETE /api/orders/:id
// router.delete("/:id", async (req, res) => {
//   await Order.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

// module.exports = router;
// server/routes/orderRoutes.js
const express = require("express");
const { placeOrder, trackOrder } = require("../controllers/orderController");

const router = express.Router();

// ================== CUSTOMER ROUTES ==================

// Place a new order
router.post("/", placeOrder);

// Track an existing order
router.post("/track", trackOrder);

module.exports = router;
