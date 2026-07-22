"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function AcademicsPage() {
  const [academics, setAcademics] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchAcademics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/academics");

      const data = await response.json();

      setAcademics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAcademics();

    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

const deleteAcademic = async (id) => {
  try {
    await fetch(
      `http://localhost:5000/api/academics/${id}`,
      {
        method: "DELETE",

        headers: {
          token: localStorage.getItem(
            "token"
          ),
        },
      }
    );

    fetchAcademics();
  } catch (error) {
    console.log(error);
  }
};

  const experience = academics.filter((item) => item.section === "experience");

  const education = academics.filter((item) => item.section === "education");

  const teaching = academics.filter((item) => item.section === "teaching");

  const achievements = academics.filter(
    (item) => item.section === "achievement",
  );

  return (
    <>
      <Navbar />

      <section className="academic-hero">
        <div className="academic-overlay">
          <div className="academic-hero-content">
            <h1>ACADEMICS</h1>

            <div className="academic-line"></div>

            <p>Academic Journey, Experience & Achievements</p>
          </div>
        </div>
      </section>

      <section className="academic-container">
        {/* Dashboard Button */}

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
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "10px",
                fontWeight: "700",
              }}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Experience */}

        <div className="academic-card">
          <div className="academic-title">

            <h2>Experience</h2>
          </div>

          <div className="timeline">
            {experience.map((item) => (
              <div key={item._id} className="timeline-item">
                <div className="timeline-dot"></div>

                <div className="timeline-content">
                  <h3>
                    {item.designation}

                    <span>({item.duration})</span>
                  </h3>

                  <p>{item.department}</p>

                  <p>{item.institute}</p>

                  {isAdmin && (
                    <button
                      onClick={() => deleteAcademic(item._id)}
                      style={{
                        background: "linear-gradient(135deg,#ef4444,#dc2626)",
                        color: "#fff",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "12px",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: "pointer",
                        marginTop: "15px",
                        boxShadow: "0 8px 20px rgba(220,38,38,0.35)",
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

        {/* Education */}

        <div className="academic-card">
          <div className="academic-title">

            <h2>Education</h2>
          </div>

          <div className="education-grid">
            {education.map((item) => (
              <div key={item._id} className="education-box">
                <h3>{item.degree}</h3>

                <span>{item.year}</span>

                <p>{item.department}</p>

                <p>{item.institute}</p>
                {isAdmin && (
                  <button
                    onClick={() => deleteAcademic(item._id)}
                    style={{
                      background: "linear-gradient(135deg,#ef4444,#dc2626)",
                      color: "#fff",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                      marginTop: "15px",
                      boxShadow: "0 8px 20px rgba(220,38,38,0.35)",
                    }}
                  >
                     Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Teaching */}

        <div className="academic-card">
          <div className="academic-title">

            <h2>Teaching Experience</h2>
          </div>

          <div className="teaching-grid">
            {teaching.map((item) => (
              <div key={item._id} className="teaching-box">
                {item.title}

                <br />

                {isAdmin && (
                  <button
                    onClick={() => deleteAcademic(item._id)}
                    style={{
                      background: "linear-gradient(135deg,#ef4444,#dc2626)",
                      color: "#fff",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                      marginTop: "15px",
                      boxShadow: "0 8px 20px rgba(220,38,38,0.35)",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}

        <div className="academic-card">
          <div className="academic-title">
      

            <h2>Achievements</h2>
          </div>

          <div className="achievement-list">
            {achievements.map((item) => (
              <div key={item._id} className="achievement-item">
                {item.achievement}

                <br />

                {isAdmin && (
                  <button
                    onClick={() => deleteAcademic(item._id)}
                    style={{
                      background: "linear-gradient(135deg,#ef4444,#dc2626)",
                      color: "#fff",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                      marginTop: "15px",
                      boxShadow: "0 8px 20px rgba(220,38,38,0.35)",
                    }}
                  >
                     Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Research Focus */}

        <div className="profile-highlight">
          <div className="highlight-image">
            <Image
              src="/academics.png"
              width={350}
              height={400}
              alt="Research Focus"
            />
          </div>

          <div className="highlight-content">
            <h2>Research Focus</h2>

            <p>
              Machine Learning, Deep Learning, Federated Learning, Edge
              Computing, Sensor Data Analytics and AI Deployment.
            </p>

            <a
              href="https://drive.google.com/file/d/10Bnm7pJNX-l6Ryi6Wqw5RqdVDPic4GzZ/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="cv-btn">Download CV</button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
