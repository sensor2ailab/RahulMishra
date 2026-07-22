"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Link from "next/link";

export default function ResponsibilitiesPage() {
  const [responsibilities, setResponsibilities] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);



  const fetchResponsibilities = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/responsibilities",
      );

      const data = await response.json();

      setResponsibilities(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResponsibilities();

    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  

  const deleteResponsibility = async (id) => {
  try {
    await fetch(
      `http://localhost:5000/api/responsibilities/${id}`,
      {
        method: "DELETE",

        headers: {
          token:
            localStorage.getItem(
              "token"
            ),
        },
      }
    );

    fetchResponsibilities();
  } catch (error) {
    console.log(error);
  }
};

  

  const administrativeData = responsibilities.filter(
    (item) => item.section === "administrative",
  );

  const socialData = responsibilities.filter(
    (item) => item.section === "social",
  );

  const coordinatorData = responsibilities.filter(
    (item) => item.section === "coordinator",
  );

  return (
    <>
      <Navbar />

      {/* HERO */}

      <section className="responsibility-hero">
        <div className="responsibility-overlay">
          <div className="responsibility-hero-content">
            <h1>RESPONSIBILITIES</h1>

            <div className="responsibility-line"></div>

            <p>Leadership, Coordination & Social Contributions</p>
          </div>
        </div>
      </section>

      <section className="responsibility-container">
        {/* DASHBOARD BUTTON */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "25px",
          }}
        >
          {isAdmin && (
            <Link
              href="/dashboard"
              style={{
                textDecoration: "none",
                background: "#111",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: "700",
              }}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* ADMINISTRATIVE */}

        <div className="responsibility-card">
          <div className="responsibility-heading">
            {/* <div className="responsibility-icon">🏛️</div> */}

            <h2>Administrative Responsibilities</h2>
          </div>

          <div className="responsibility-list">
            {administrativeData.map((item, index) => (
              <div key={item._id} className="responsibility-item">
                <span>{index + 1}.</span>

                {item.title}

                {isAdmin && (
                  <button
                    onClick={() => deleteResponsibility(item._id)}
                    style={{
                      marginLeft: "auto",
                      background: "#e53935",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SOCIAL */}

        <div className="social-card">
          <div className="responsibility-heading">
            {/* <div className="responsibility-icon">🌍</div> */}

            <h2>Social Responsibility</h2>
          </div>

          <div className="social-content">
            {socialData.map((item) => (
              <div key={item._id}>
                <p>{item.content}</p>

                {isAdmin && (
                  <button
                    onClick={() => deleteResponsibility(item._id)}
                    style={{
                      background: "#e53935",
                      color: "#fff",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COORDINATOR */}

        <div className="responsibility-card">
          <div className="responsibility-heading">
            {/* <div className="responsibility-icon">🎯</div> */}

            <h2>Coordinator Activities</h2>
          </div>

          <div className="coordinator-grid">
            {coordinatorData.map((item) => (
              <div key={item._id} className="coordinator-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="coordinator-image"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  onError={(e) => {
                    console.log("Image failed:", item.image);
                  }}
                />

                <div className="coordinator-content">
                  <h3>{item.title}</h3>

                  <p>{item.content}</p>

                  {isAdmin && (
                    <button
                      onClick={() => deleteResponsibility(item._id)}
                      style={{
                        background: "#e53935",
                        color: "#fff",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        marginTop: "10px",
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HIGHLIGHT */}

        <div className="responsibility-highlight">
          <h2>
            Dedicated towards Academic Leadership, Student Mentorship and
            Community Development
          </h2>

          <p>
            Combining research excellence with social innovation, technical
            training and institutional responsibilities.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
