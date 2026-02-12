

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { Typewriter } from "react-simple-typewriter";
import "../styles/Home.css";

// Import your 15 images
import img1 from "../images/homepage/homepageImage.jpg";
import img2 from "../images/homepage/homepageImage2.jpg";
import img3 from "../images/homepage/homepageImage3.jpg";
import img4 from "../images/homepage/homepageImage4.jpg";
import img5 from "../images/homepage/homepageImage5.jpg";
import img6 from "../images/homepage/homepageImage6.jpg";
import img7 from "../images/homepage/homepageImage7.jpg";
import img8 from "../images/homepage/homepageImage8.jpg";
import img9 from "../images/homepage/homepageImage9.jpg";
import img10 from "../images/homepage/homepageImage10.jpg";
import img11 from "../images/homepage/homepageImage11.jpg";
import img12 from "../images/homepage/homepageImage12.jpg";
import img13 from "../images/homepage/homepageImage13.jpg";
import img14 from "../images/homepage/homepageImage14.jpg";
import img15 from "../images/homepage/homepageImage15.jpg";

const Home = () => {

  
  const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const increment = end / (duration / 16); // approx 60fps
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <h1 ref={ref} className="fw-bold" style={{ fontSize: "3rem" }}>{count}+</h1>;
};

  
  const images = [
    img1, img2, img3, img4, img5, img6, img7, img8,
    img9, img10, img11, img12, img13, img14, img15
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  // Auto slideshow with pause on hover
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, images.length]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* ===== HERO SECTION (unchanged) ===== */}
      <section
        className="hero position-relative"
        style={{
          background: "linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Water droplets */}
        <div className="droplets">
          {[...Array(12)].map((_, i) => {
            const speed = (Math.random() * 7 + 8).toFixed(1) + "s";
            return (
              <span
                key={i}
                style={{
                  "--i": i,
                  "--speed": speed,
                  width: Math.random() * 6 + 10 + "px",
                  height: Math.random() * 6 + 14 + "px",
                }}
              ></span>
            );
          })}
        </div>

        {/* Decorative blurred circles */}
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.25)",
            borderRadius: "50%",
            top: "-50px",
            left: "-50px",
            filter: "blur(50px)",
            zIndex: 0,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "50%",
            bottom: "-80px",
            right: "-80px",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        ></div>

        <div className="container">
          <div className="row align-items-center justify-content-between">
            {/* Left text area */}
            <div className="col-md-5" data-aos="zoom-in">
              <div
                style={{
                  backdropFilter: "blur(10px)",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                  padding: "30px",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <h1 className="fw-bold" style={{ fontSize: "2.8rem" }}>
                  <Typewriter
                    words={["Experience Purity with Hydra Life"]}
                    cursor
                    cursorStyle=""
                    typeSpeed={80}
                    deleteSpeed={30}
                    delaySpeed={2000}
                  />
                </h1>
                <p
                  className="lead"
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="1200"
                >
                  The Purity You Deserve
                </p>
                <Link to="/products" className="btn btn-light btn-lg mt-3">
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Slideshow */}
            <div
              className="col-md-5 text-center slideshow-container"
              data-aos="fade-left"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Slide ${index}`}
                  className={`slideshow-image ${index === currentIndex ? "active" : ""}`}
                />
              ))}

              {/* Prev/Next buttons */}
              <button className="slide-btn prev" onClick={prevSlide}>&#10094;</button>
              <button className="slide-btn next" onClick={nextSlide}>&#10095;</button>

              {/* Dot indicators */}
              <div className="dots-container">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`dot-wrapper ${index === currentIndex ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                  >
                    <svg className="dot-ring" width="18" height="18">
                      <circle
                        className="ring-bg"
                        cx="9"
                        cy="9"
                        r="7"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        className="ring-progress"
                        cx="9"
                        cy="9"
                        r="7"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* ===== About Brief Section ===== */}
<section className="about-brief py-5">
<div className="mt-5 text-center" data-aos="fade-up">
  <h2 style={{ color: "#fff", fontWeight: "bold" }}>About Us</h2>
  <p style={{ maxWidth: "600px", margin: "10px auto", color: "#e0f7fa" }}>
    Hydra Life is dedicated to delivering pure, refreshing water solutions with
    innovative technology and a commitment to quality. Our mission is to
    ensure every drop you drink is safe and healthy.
  </p>
  <Link
    to="/about"
    className="btn btn-outline-light mt-3"
    style={{ borderRadius: "30px", padding: "8px 20px" }}
  >
    Learn More →
  </Link>
</div>

</section>

{/* ===== Why Choose Us Section ===== */}
<section className="why-choose-us py-5">
  <div className="container text-center">
    <h2 className="fw-bold mb-5 text-white" data-aos="fade-up">Why Choose Us?</h2>
    <div className="row g-4">
      <div className="col-md-3" data-aos="zoom-in" data-aos-delay="100">
        <div className="feature-card p-4">
          <i className="fas fa-tint fa-3x"></i>
          <h5>Pure Water</h5>
          <p>Advanced filtration ensures crystal-clear, healthy water for your family.</p>
        </div>
      </div>
      <div className="col-md-3" data-aos="zoom-in" data-aos-delay="200">
        <div className="feature-card p-4">
          <i className="fas fa-leaf fa-3x"></i>
          <h5>Eco-Friendly</h5>
          <p>We prioritize sustainability with environmentally safe purification systems.</p>
        </div>
      </div>
      <div className="col-md-3" data-aos="zoom-in" data-aos-delay="300">
        <div className="feature-card p-4">
          <i className="fas fa-shield-alt fa-3x"></i>
          <h5>Safe & Reliable</h5>
          <p>Trusted quality with strict safety measures to protect your health.</p>
        </div>
      </div>
      <div className="col-md-3" data-aos="zoom-in" data-aos-delay="400">
        <div className="feature-card p-4">
          <i className="fas fa-smile-beam fa-3x"></i>
          <h5>Customer Support</h5>
          <p>Friendly support team ready to help you anytime, anywhere.</p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* ===== Testimonials Section ===== */}
<section className="testimonials py-5">
  <div className="container text-center">
    <h2 className="fw-bold mb-5 text-white" data-aos="fade-up">What Our Customers Say</h2>
    <div className="row g-4">
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
        <div className="testimonial-card p-4">
          <p className="fst-italic">
            "Hydra Life has completely transformed the quality of water in our home. 
            We can really taste the difference!"
          </p>
          <h6 className="mt-3 mb-0">Amit Verma</h6>
          <small>Delhi, India</small>
        </div>
      </div>
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
        <div className="testimonial-card p-4">
          <p className="fst-italic">
            "Professional service and top-notch water purification system. 
            Highly recommend Hydra Life to everyone."
          </p>
          <h6 className="mt-3 mb-0">Priya Sharma</h6>
          <small>Mumbai, India</small>
        </div>
      </div>
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
        <div className="testimonial-card p-4">
          <p className="fst-italic">
            "Excellent customer service and the water is the cleanest I've ever tasted. 
            Absolutely love it!"
          </p>
          <h6 className="mt-3 mb-0">Rahul Mehta</h6>
          <small>Bangalore, India</small>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Our Impact in Numbers Section */}
<section
  style={{
    background: "linear-gradient(135deg, #2f80ed 0%, #56ccf2 100%)",
    color: "#fff",
    padding: "60px 0",
  }}
>
  <div className="container text-center">
    <h2 className="fw-bold mb-4">Our Impact in Numbers</h2>
    <div className="row">
      <div className="col-md-3 mb-4">
        <Counter end={10} duration={2000} />
        <p className="lead">Years of Excellence</p>
      </div>
      <div className="col-md-3 mb-4">
        <Counter end={50000} duration={2000} />
        <p className="lead">Happy Customers</p>
      </div>
      <div className="col-md-3 mb-4">
        <Counter end={50} duration={2000} />
        <p className="lead">Cities Served</p>
      </div>
      <div className="col-md-3 mb-4">
        <Counter end={100} duration={2000} />
        <p className="lead">Pure Quality Guarantee</p>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Home;
