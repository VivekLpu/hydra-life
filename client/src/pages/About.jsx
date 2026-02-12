import React, { useEffect } from "react";
import CEO from "../images/About/CEO.jpg";
import CoFounder from "../images/About/CoFounder.jpg";
import logo from "../images/homepage/logo.png";
import "../styles/About.css"; // new styles

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll(".fade-on-scroll")
      .forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="about-bg">
      <div className="container py-5 about-page">
        {/* Logo centered at the very top */}
        <div className="text-center mb-5 fade-in-up">
          <img src={logo} alt="Hydra Life Logo" className="about-logo" />
          <h2 className="about-heading mt-3 fw-bold ">About HydraLife</h2>
          <p
            className="text-dark fs-5 fade-in-left"
            style={{ animationDelay: "0.2s" }}
          >
            "The Purity You Deserve"
          </p>
        </div>

        {/* Main content row */}
        <div className="row align-items-start">
          {/* Left column - about text */}
          <div className="col-lg-7 fade-in-left">
            <h3 className="mt-4 fw-semibold about-section-title">The Problem</h3>
            <p
              className="text-muted fs-6 fade-in-left"
              style={{ animationDelay: "0.2s" }}
            >
              Unsafe drinking water is still common, health-conscious consumers lack trust in water quality,
              and premium brands are unaffordable for many.
            </p>

            <hr />

            <h3 className="mt-4 fw-semibold about-section-title">Our Mission</h3>
            <p
              className="text-muted fs-6 fade-in-left"
              style={{ animationDelay: "0.4s" }}
            >
              To deliver safe, affordable, and sustainably packaged drinking water to every household
              and business while reducing plastic waste and promoting hydration as a lifestyle.
            </p>

            <hr />

            <h3 className="mt-4 fw-semibold about-section-title">Our Solutions</h3>
            <ul
              className="text-muted fs-6 fade-in-left"
              style={{ animationDelay: "0.6s" }}
            >
              <li>Affordable & Accessible Bottled Water</li>
              <li>Competitive pricing to reach all income groups</li>
              <li>Multiple bottle sizes for different needs (500ml, 1L, 5L)</li>
              <li>Multi-stage purification process (RO + UV + Ozonation)</li>
              <li>BIS & FSSAI certified production</li>
              <li>Recyclable PET bottles & refill-return options for bulk buyers</li>
            </ul>

            <hr />

            <h3 className="mt-4 fw-semibold about-section-title">Target Audience</h3>
            <ul
              className="text-muted fs-6 fade-in-left"
              style={{ animationDelay: "0.8s" }}
            >
              <li>Urban Consumers – offices, homes, schools, events</li>
              <li>Rural & Semi-Urban Markets – poor tap water quality</li>
              <li>Retailers & Distributors</li>
              <li>Health-Conscious Individuals</li>
            </ul>

            <hr />

            <h3 className="mt-4 fw-semibold about-section-title">Brand Values</h3>
            <ul
              className="text-muted fs-6 fade-in-left"
              style={{ animationDelay: "1s" }}
            >
              <li>Purity – strict quality checks</li>
              <li>Health – encouraging hydration habits</li>
              <li>Affordability – for every pocket</li>
              <li>Sustainability – recyclable packaging and refill models</li>
              <li>Trust – consistent quality and delivery</li>
            </ul>
          </div>

          {/* Right column - leadership */}
          <div className="col-lg-5 text-center fade-in-right">
            {/* Founder */}
            <img src={CEO} alt="Founder" className="about-img" />
            <div className="fs-5 text-secondary mb-3">
              <strong className="name">Mr. Sudhanshu Kumar</strong>
              <br />
              Founder & CEO
            </div>
            <blockquote className="about-quote word-fade">
              {"HydraLife is more than just a packaged drinking water brand. it’s my dream to bring pure, safe, and refreshing hydration to every household in India.I believe water is not just a product; it’s a promise of health, trust, and care. Every bottle we produce reflects our commitment to quality, sustainability, and customer well-being.For me, HydraLife is not only a business, it’s a responsibility — to serve people, protect nature, and create a brand that stands for purity in every drop.— Sudhanshu Kumar"
                .split(" ")
                .map((word, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                    {word}&nbsp;
                  </span>
                ))}
            </blockquote>

            <hr className="my-4" />

            {/* Co-Founder */}
            <img src={CoFounder} alt="Co-Founder" className="about-img" />
            <div className="fs-5 text-secondary">
              <strong className="name">Mr. Kishan Chauhan</strong>
              <br />
              Co-Founder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
