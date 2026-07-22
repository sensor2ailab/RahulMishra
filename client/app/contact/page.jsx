"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [contactData, setContactData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/contact/info")
      .then((res) => res.json())
      .then((data) => {
        console.log("CONTACT DATA =", data);
        setContactData(data);
      })
      .catch((err) => console.log(err));

    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  const addresses = contactData.filter(
    (item) => item.section && item.section.toLowerCase() === "address",
  );

  const emails = contactData.filter(
    (item) => item.section && item.section.toLowerCase() === "email",
  );
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteContactInfo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/contact/info/${id}`, {
        method: "DELETE",

        headers: {
          token: localStorage.getItem("token"),
        },
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        });

        const data = await response.json();

        alert(data.message);

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } catch (error) {
        console.log(error);

        alert("Failed to send message");
      }
    };

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      alert(data.message);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  };

  return (
    <>
      <Navbar />

      <section className="contact-hero">
        <div className="contact-overlay">
          <div className="contact-hero-content">
            <h1>CONTACT</h1>

            <div className="contact-line"></div>

            <p>Get In Touch For Research, Collaboration & Academic Queries</p>
          </div>
        </div>
      </section>

      <section className="contact-container">
        {/* LEFT SIDE */}

        {isAdmin && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "25px",
            }}
          >
            <a
              href="/dashboard"
              style={{
                textDecoration: "none",
                background: "#111",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "10px",
                fontWeight: "700",
              }}
            >
              Dashboard
            </a>
          </div>
        )}

        <div className="contact-left">
          {/* ADDRESS */}

          <div className="contact-card">
            <h2>ADDRESS</h2>

            <div className="contact-box">
              {addresses.length > 0 ? (
                addresses.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      lineHeight: "1.8",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      {item.name}
                    </p>

                    <p>{item.department}</p>

                    <p>{item.institute}</p>

                    <p>{item.location}</p>

                    {isAdmin && (
                      <button
                        onClick={() => deleteContactInfo(item._id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "10px 18px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <p>Rahul Mishra</p>

                  <p>Department of Computer Science & Engineering</p>

                  <p>IIT Patna, Bihar</p>

                  <p>India</p>
                </>
              )}
            </div>
          </div>

          {/* EMAIL */}

          <div className="contact-card">
            <h2>EMAIL ID</h2>

            <div className="contact-box">
              {emails.length > 0 ? (
                emails.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      lineHeight: "1.8",
                    }}
                  >
                    <p>
                      <a href={`mailto:${item.primaryEmail}`}>
                        {item.primaryEmail}
                      </a>
                    </p>

                    {item.secondaryEmail && (
                      <p>
                        <a href={`mailto:${item.secondaryEmail}`}>
                          {item.secondaryEmail}
                        </a>
                      </p>
                    )}

                    {item.skype && <p>Skype: {item.skype}</p>}
                    {isAdmin && (
                      <button
                        onClick={() => deleteContactInfo(item._id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "10px 18px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                         Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <p>
                    <a href="mailto:rahul_mishra@iitp.ac.in">
                      rahul_mishra@iitp.ac.in
                    </a>
                  </p>

                  <p>
                    <a href="mailto:errahulmishra.cse@gmail.com">
                      errahulmishra.cse@gmail.com
                    </a>
                  </p>

                  <p>Skype: live:errahulmishra.cse</p>
                </>
              )}
            </div>
          </div>

          {/* MAP */}

          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?q=Indian%20Institute%20of%20Technology%20Patna&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              style={{
                border: 0,
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="contact-right">
          <div className="form-card">
            <h2>Send me a message</h2>

            <p>Fill the form below and I will respond soon.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Message *</label>

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="button-group">
                <button type="submit" className="submit-btn">
                  Submit
                </button>

                <button
                  type="reset"
                  className="clear-btn"
                  onClick={() =>
                    setFormData({
                      name: "",
                      email: "",
                      message: "",
                    })
                  }
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
