



const Order = require("../models/orderModel");
const nodemailer = require("nodemailer");

// Nodemailer setup
const transporter = nodemailer.createTransport({  
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================== CUSTOMER FUNCTIONS ==================

// Place Order
exports.placeOrder = async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return res.status(400).json({ error: "Missing customer details" });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items in order" });
    }

    const orderId = "ORD" + Date.now();
    const order = new Order({ orderId, customer, items, total });
    await order.save();

    // Build order summary HTML table
    let orderRows = "";
    items.forEach((item, i) => {
      orderRows += `
        <tr>
          <td style="padding:8px; border:1px solid #ddd;">${item.name}</td>
          <td style="padding:8px; border:1px solid #ddd;">${item.quantity}</td>
          <td style="padding:8px; border:1px solid #ddd;">₹${item.price}</td>
          <td style="padding:8px; border:1px solid #ddd;">₹${item.price * item.quantity}</td>
        </tr>
      `;
    });

    const htmlContent = `
      <div style="font-family:Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; padding:20px;">
        <h2 style="color:#2c3e50; text-align:center;">Hydra Life Beverages Pvt Ltd</h2>
        <h3 style="color:#27ae60;">Order Confirmation - ${orderId}</h3>
        <p>Hello <b>${customer.name}</b>,</p>
        <p>Thank you for your purchase! Your order has been placed successfully. Below are your order details:</p>
        
        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
          <thead style="background:#f4f4f4;">
            <tr>
              <th style="padding:8px; border:1px solid #ddd;">Product</th>
              <th style="padding:8px; border:1px solid #ddd;">Qty</th>
              <th style="padding:8px; border:1px solid #ddd;">Price</th>
              <th style="padding:8px; border:1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderRows}
          </tbody>
        </table>

        <h3 style="color:#e67e22; margin-top:20px;">Grand Total: ₹${total}</h3>

        <p><b>Delivery Address:</b><br>${customer.address}</p>

        <p style="margin-top:20px;">We’ll notify you once your order is shipped.<br><br>Best regards,<br><b>Team Hydra Life</b></p>
      </div>
    `;

    if (customer.email) {
      await transporter.sendMail({
        from: `"Hydra Life Beverages Pvt Ltd" <${process.env.EMAIL_USER}>`,
        to: customer.email,
        subject: "Order Confirmation - " + orderId,
        html: htmlContent, // ✅ send HTML instead of plain text
      });
      console.log("Confirmation email sent to:", customer.email);
    }

    res.json({ success: true, orderId });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Order failed. Please try again." });
  }
};


// Track Order
exports.trackOrder = async (req, res) => {
  try {
    const { orderId, phone } = req.body;
    const order = await Order.findOne({ orderId, "customer.phone": phone });

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({
      order: {
        orderId: order.orderId,
        status: order.status,
        placedAt: order.createdAt,
        total: order.total,
        customer: order.customer,
      },
    });
  } catch (err) {
    console.error("Track order error:", err);
    res.status(500).json({ error: "Tracking failed" });
  }
};

// ================== ADMIN FUNCTIONS ==================

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Update order status + send notification
// Update order status + send notification
// Update order status + send notification
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status || order.status;
    await order.save();

    // Build order summary HTML table
    let orderRows = "";
    order.items.forEach((item, i) => {
      orderRows += `
        <tr>
          <td style="padding:8px; border:1px solid #ddd;">${item.name}</td>
          <td style="padding:8px; border:1px solid #ddd;">${item.quantity}</td>
          <td style="padding:8px; border:1px solid #ddd;">₹${item.price}</td>
          <td style="padding:8px; border:1px solid #ddd;">₹${item.price * item.quantity}</td>
        </tr>
      `;
    });

    const htmlContent = `
      <div style="font-family:Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; padding:20px;">
        <h2 style="color:#2c3e50; text-align:center;">Hydra Life Beverages Pvt Ltd</h2>
        <h3 style="color:#2980b9;">Order Update - ${order.orderId}</h3>
        <p>Hello <b>${order.customer.name}</b>,</p>
        <p>Your order status has been <b style="color:#27ae60;">${order.status}</b></p>
        
        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
          <thead style="background:#f4f4f4;">
            <tr>
              <th style="padding:8px; border:1px solid #ddd;">Product</th>
              <th style="padding:8px; border:1px solid #ddd;">Qty</th>
              <th style="padding:8px; border:1px solid #ddd;">Price</th>
              <th style="padding:8px; border:1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderRows}
          </tbody>
        </table>

        <h3 style="color:#e67e22; margin-top:20px;">Grand Total: ₹${order.total}</h3>

        <p><b>Delivery Address:</b><br>${order.customer.address}</p>

        <p style="margin-top:20px;">Thank you for shopping with us!<br><br><b>Team Hydra Life</b></p>
      </div>
    `;

    // Send status update email
    if (order.customer?.email) {
      await transporter.sendMail({
        from: `"Hydra Life Beverages Pvt Ltd" <${process.env.EMAIL_USER}>`,
        to: order.customer.email,
        subject: `Order Status Update - ${order.orderId}`,
        html: htmlContent,
      });
      console.log("Status update email sent to:", order.customer.email);  
    }

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Update order error:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
};


// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

