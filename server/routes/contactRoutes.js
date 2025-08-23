// server/routes/contactRoutes.js
const express = require("express");
const { contactUs } = require("../controllers/contactController");

const router = express.Router();

router.post("/", contactUs);

module.exports = router;
