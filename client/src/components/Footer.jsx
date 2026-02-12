import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wave text-white mt-5">
      <div className="wave"></div>
      <div className="container py-5">
        <div className="row justify-content-between">
          {/* Brand Info */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold">Hydra Life</h4>
            <p className="small fst-italic">"The Purity You Deserve"</p>
            <div className="social-icons mt-3">
              <a
                href="https://wa.me/+919693306678 "
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.instagram.com/hydralife_beverages_pvt.ltd?igsh=MTh4dTR6MnU0cjJjMg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579201598361"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/HydraLifewater?t=ubkTGRdF6Krw6qJYiug6EA&s=09"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p className="small mb-0">hydralifebeveragespvtltd@gmail.com</p>
            <p className="small mb-0">+91 9693306678 </p>
            <p className="small mb-0">
               SUDHARI BEVERAGES PVT. LTD. <br />
              102, Hariharpur, Saran, Bihar 841222  
            </p>
            <a
              href="https://viveklpu.github.io/Portfolio-Website/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
            >
              Click here to Meet Developer
            </a>
          </div>
        </div>
        {/* Meet the Developer */}
        <div className="col-md-12 text-center mt-4 developer-section">
          <p className="small mb-2">Crafted with ❤️ by Vivek </p>
        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-4 footer-bottom">
          <small>
            &copy; {new Date().getFullYear()} Hydra Life. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
