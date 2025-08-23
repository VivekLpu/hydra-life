// server/controllers/contactController.js
const sendEmail = require("../utils/sendEmail");

const contactUs = async (req, res) => {
  try {
    const { type, name, email, message, businessName, contactPerson, phone } = req.body;

    let subject, text;

    if (type === "distributor") {
      subject = "New Distributor/Wholesaler Inquiry";
      text = `
A new distributor/wholesaler inquiry has been submitted:

Business Name: ${businessName}
Contact Person: ${contactPerson}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `;
    } else {
      subject = "New General Inquiry";
      text = `
A new general inquiry has been submitted:

Name: ${name}
Email: ${email}

Message:
${message}
      `;
    }

    await sendEmail({
      to: process.env.EMAIL_USER, // Send to your business inbox
      subject,
      text
    });

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact form error:", err.message);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
};

module.exports = { contactUs };
