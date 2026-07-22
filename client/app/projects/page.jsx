"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import Link from "next/link";

import Image from "next/image";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);


  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();

    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

 
  const deleteProject = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",

        headers: {
          token: localStorage.getItem("token"),
        },
      });

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO */}

      <section className="project-hero">
        <div className="project-overlay">
          <div className="project-hero-content">
            <h1>PROJECTS</h1>

            <div className="project-line"></div>

            <p>Research Projects, Startups & Innovation</p>
          </div>
        </div>
      </section>

      {/* MAIN */}

      <section className="project-container">
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
                padding: "12px 22px",
                borderRadius: "10px",
                fontWeight: "700",
              }}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* PROJECTS */}

        {projects.map((project, index) => (
          <div key={project._id} className="project-card">
            {/* LEFT */}

            <div className="project-left">
              <div className="project-badge">{project.category}</div>

              <h2>{project.title}</h2>

              <div className="project-details">
                <p>
                  <span>PI / Mentors:</span>

                  {project.mentor}
                </p>

                <p>
                  <span>Duration:</span>

                  {project.duration}
                </p>

                <p>
                  <span>Funding Agency:</span>

                  {project.funding}
                </p>
              </div>

              {/* DELETE */}
              {isAdmin && (
                <button
                  onClick={() => deleteProject(project._id)}
                  style={{
                    background: "linear-gradient(135deg,#e53935,#c62828)",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontWeight: "700",
                    fontSize: "15px",
                    cursor: "pointer",
                    marginTop: "20px",
                    boxShadow: "0 8px 18px rgba(229,57,53,0.35)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                  }}
                >
                  🗑 Delete Project
                </button>
              )}
            </div>

            {/* RIGHT */}

            <div className="project-right">
              <Image
                src={project.image}
                width={550}
                height={350}
                alt={project.title}
                className="project-image"
              />
            </div>
          </div>
        ))}

        {/* BADMINTON BUTTON */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",

            marginTop: "40px",
          }}
        >
          <button
            style={{
              background: "linear-gradient(to right, #df9c9c, #333)",

              color: "white",

              border: "none",

              padding: "18px 34px",

              borderRadius: "14px",

              fontSize: "18px",

              fontWeight: "700",

              cursor: "pointer",

              transition: "0.3s",
            }}
          >
            <a
              href="https://drive.google.com/file/d/1n8KGbyKjHvkl02WEqTEcE0yOS5H2paZt/view"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(to right, #df9c9c, #333)",
                color: "white",
                padding: "18px 34px",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Badminton Activity Monitoring
            </a>
          </button>
        </div>

        {/* HIGHLIGHT */}

        <div className="project-highlight">
          <h2>
            Research & Innovation Driven by AI, IoT, Edge Computing and Smart
            Systems
          </h2>

          <p>
            Building intelligent solutions for industrial automation,
            healthcare, agriculture and sustainable technologies.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
