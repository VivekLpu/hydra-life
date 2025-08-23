

import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../utils/api";
import "../styles/Contact.css";

// ...existing imports...

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [activeForm, setActiveForm] = useState("general");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = activeForm === "distributor"
      ? {
          type: "distributor",
          businessName: e.target.businessName.value,
          contactPerson: e.target.contactPerson.value,
          email: e.target.email.value,
          phone: e.target.phone.value,
          message: e.target.message.value,
        }
      : {
          type: "general",
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        };

    try {
      await API.post("/contact", formData);
      setSuccess(true);
      e.target.reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Contact form submit error:", err);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="contact-section">
      <div className="container py-5">
        <h2 className="text-center text-white fw-bold mb-5" data-aos="fade-up">
          Contact Us
        </h2>
        <p className="text-center mb-5 text-light">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hi, drop us a message.
        </p>

        {/* {success && <div className="success-toast" data-aos="fade-down">✅ Message sent successfully!</div>} */}

        <div className="row g-4">
          <div className="col-md-6" data-aos="fade-right">
            <div className="contact-card p-4 rounded shadow">
              <div className="form-tabs mb-4">
                <button 
                  className={`tab-btn ${activeForm === "general" ? "active" : ""}`}
                  onClick={() => setActiveForm("general")}
                >
                  General Inquiry
                </button>
                <button 
                  className={`tab-btn ${activeForm === "distributor" ? "active" : ""}`}
                  onClick={() => setActiveForm("distributor")}
                >
                  Distributor / Wholesaler
                </button>
              </div>

              {/* General Inquiry Form */}
              {activeForm === "general" && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-white">Name</label>
                    <input name="name" type="text" className="form-control glow-input" placeholder="Enter your name" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Email</label>
                    <input name="email" type="email" className="form-control glow-input" placeholder="Enter your email" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Message</label>
                    <textarea name="message" rows="4" className="form-control glow-input" placeholder="Type your message" required></textarea>
                  </div>
                  <button type="submit" className="btn-submit ripple-btn w-100">Send Message</button>
                  
                      {success && <div className="success-toast" data-aos="fade-down">✅ Message sent successfully!</div>}
                  <p className="small text-white mt-2">Our team will connect with you shortly.</p>

                </form>
              )}

              {/* Distributor/Wholesaler Form */}
              {activeForm === "distributor" && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-white">Business Name</label>
                    <input name="businessName" type="text" className="form-control glow-input" placeholder="Enter business name" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Contact Person</label>
                    <input name="contactPerson" type="text" className="form-control glow-input" placeholder="Enter contact person name" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Email</label>
                    <input name="email" type="email" className="form-control glow-input" placeholder="Enter your email" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Phone</label>
                    <input name="phone" type="tel" className="form-control glow-input" placeholder="Enter your phone number" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Message</label>
                    <textarea name="message" rows="4" className="form-control glow-input" placeholder="Tell us about your requirements" required></textarea>
                  </div>
                  <button type="submit" className="btn-submit ripple-btn w-100">Submit Inquiry</button>
                  
                      {success && <div className="success-toast" data-aos="fade-down">✅ Message sent successfully!</div>}
                  <p className="small text-white mt-2">Our team will connect with you shortly.</p>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-6 text-white" data-aos="fade-left">
            <div className="contact-info p-4 rounded shadow">
              <h4 className="fw-bold mb-3">Get in Touch</h4>
              <p><FaEnvelope className="me-2" /> hydralifebeveragespvtltd@gmail.com</p>
              <p><FaPhone className="me-2" /> +91 96933 06678</p>
              <p><FaMapMarkerAlt className="me-2" /> Hydra Life Pvt Ltd Near Surya Mandir <br/>
              Garkha, Saran, Bihar - 841311</p>
              <div className="social-icons mt-3">
                <a href="https://wa.me/+919693306678" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
                <a href="https://www.instagram.com/hydralife_beverages_pvt.ltd" target="_blank" rel="noreferrer"><FaInstagram /></a>
                <a href="https://www.facebook.com/profile.php?id=61579201598361" target="_blank" rel="noreferrer"><FaFacebookF /></a>
                <a href="https://x.com/HydraLifewater" target="_blank" rel="noreferrer"><FaTwitter /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;