// server/scripts/backfillOrderIds.js
const mongoose = require("mongoose");
require("dotenv").config();
const Order = require("../models/orderModel");

async function backfill() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const docs = await Order.find({ orderId: { $exists: false } });
  console.log("Found", docs.length, "orders without orderId");

  for (const doc of docs) {
    // Use the ObjectId so it's guaranteed unique
    doc.orderId = "ORD" + doc._id.toString();
    await doc.save();
    console.log("Updated:", doc._id.toString(), "->", doc.orderId);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

backfill().catch(err => {
  console.error(err);
  process.exit(1);  
});
