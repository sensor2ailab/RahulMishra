"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

export default function ResearchPage() {
  const [papers, setPapers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  
  const fetchPapers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/papers");

      const data = await response.json();

      setPapers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPapers();

    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  

  const deletePaper = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/papers/${id}`, {
        method: "DELETE",

        headers: {
          token: localStorage.getItem("token"),
        },
      });

      fetchPapers();
    } catch (error) {
      console.log(error);
    }
  };

  
  const filterItems = (category) => {
    return papers.filter((item) => item.category === category);
  };

  
  const renderItems = (items, showImage = false) => {
    if (items.length === 0) {
      return (
        <p
          style={{
            fontSize: "15px",

            color: "#777",
          }}
        >
          No Data Available
        </p>
      );
    }

    return items.map((item, index) => (
      <div
        key={item._id}
        style={{
          marginBottom: "32px",

          padding: "32px",

          background: "rgba(255,255,255,0.86)",

          borderRadius: "24px",

          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",

          transition: "0.35s ease",

          border: "1px solid rgba(0,0,0,0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";

          e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0px)";

          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
        }}
      >
        

        {showImage ? (
          <div
            style={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              gap: "40px",

              flexWrap: "wrap",
            }}
          >
            {/* LEFT SIDE */}

            <div
              style={{
                flex: 1,

                minWidth: "300px",
              }}
            >
              {/* PROJECT TITLE */}

              <h2
  style={{
    fontSize: "34px",
    fontWeight: "800",
    color: "#111",
    marginBottom: "22px",
    lineHeight: "1.4",
  }}
>
  {item.title || "No Title"}
</h2>

              {/* PROJECT DETAILS */}

              <p
  style={{
    fontSize: "18px",
    lineHeight: "2.1",
    color: "#444",
    marginBottom: "24px",
    textAlign: "justify",
  }}
>
  <strong>Abstract:</strong>{" "}
  {item.description || item.content || "No Description"}
</p>
              {/* DELETE BUTTON */}

              {isAdmin && (
                <button
                  onClick={() => deletePaper(item._id)}
                  style={{
                    marginTop: "18px",
                    background: "linear-gradient(to right, #d32f2f, #ff5252)",
                    color: "white",
                    border: "none",
                    padding: "11px 22px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                   Delete
                </button>
              )}
            </div>

            {/* RIGHT SIDE IMAGE */}

            {item.image && (
              <div
                style={{
                  width: "420px",

                  maxWidth: "100%",

                  display: "flex",

                  justifyContent: "center",

                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt="project"
                  loading="lazy"
                  style={{
                    width: "100%",

                    height: "280px",

                    objectFit: "contain",

                    background: "#fff",

                    borderRadius: "18px",

                    padding: "10px",

                    boxShadow: "0 14px 28px rgba(0,0,0,0.15)",

                    transition: "0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          

          <div>
            <div
              style={{
                display: "flex",

                gap: "10px",
              }}
            >
              <span
                style={{
                  color: "#d4a017",

                  fontWeight: "700",

                  fontSize: "18px",
                }}
              >
                {index + 1}.
              </span>

              <p
                style={{
                  fontSize: "16px",

                  lineHeight: "2",

                  color: "#333",

                  margin: 0,
                }}
              >
                {item.formattedText}
              </p>
            </div>

            {/* DATASET LINK */}

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                style={{
                  display: "inline-block",

                  marginTop: "14px",

                  textDecoration: "none",

                  color: "#b71c1c",

                  fontWeight: "700",
                }}
              >
                Visit Link →
              </a>
            )}

            {/* DELETE BUTTON */}

            <div>
              {isAdmin && (
                <button
                  onClick={() => deletePaper(item._id)}
                  style={{
                    marginTop: "18px",
                    background: "linear-gradient(to right, #d32f2f, #ff5252)",
                    color: "white",
                    border: "none",
                    padding: "11px 22px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                   Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {/* NAVBAR */}

      <Navbar />

      <div
        style={{
          width: "100%",

          minHeight: "100vh",

          background: "linear-gradient(to bottom, #f8f5ef, #f3f3f3)",

          paddingBottom: "80px",
        }}
      >
        {/* HERO */}

        <section
          style={{
            width: "100%",

            height: "240px",

            background:
              "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('/hero.png')",

            backgroundSize: "cover",

            backgroundPosition: "center",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            padding: "0 20px",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "52px",

                fontWeight: "800",

                color: "#111",

                marginBottom: "12px",
              }}
            >
              RESEARCH
            </h1>

            <div
              style={{
                width: "80px",

                height: "4px",

                background: "#d4a017",

                margin: "10px auto",

                borderRadius: "20px",
              }}
            ></div>

            <p
              style={{
                fontSize: "16px",

                color: "#555",
              }}
            >
              Publications & Research Contributions
            </p>
          </div>
        </section>

        {/* MAIN */}

        <div
          style={{
            width: "100%",

            maxWidth: "1180px",

            margin: "40px auto",

            padding: "0 18px",
          }}
        >
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
                  background: "linear-gradient(to right, #111, #333)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* MAIN CARD */}

          <div
            style={{
              background: "rgba(255,255,255,0.82)",

              borderRadius: "24px",

              padding: "38px",

              boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
            }}
          >
            {/* TOP */}

            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "18px",

                marginBottom: "35px",

                flexWrap: "wrap",
              }}
            >
              <img
                src="/publication.png"
                alt="publication"
                style={{
                  width: "70px",
                }}
              />

              <h2
                style={{
                  fontSize: "34px",

                  color: "#111",

                  margin: 0,
                }}
              >
                PUBLICATIONS
              </h2>
            </div>

            {/* SECTIONS */}

            {[
              {
                title: "Journal Papers",
                key: "journal",
              },
              {
                title: "Conference Papers",
                key: "conference",
              },
              {
                title: "Open Datasets",
                key: "dataset",
              },
              {
                title: "Patents",
                key: "patent",
              },
              {
                title: "Projects",
                key: "project",
                image: true,
              },
            ].map((section) => (
              <div
                key={section.key}
                style={{
                  marginBottom: "55px",
                }}
              >
                <h3
                  style={{
                    fontSize: "30px",

                    marginBottom: "24px",

                    borderLeft: "5px solid #d4a017",

                    paddingLeft: "14px",

                    color: "#111",
                  }}
                >
                  {section.title}
                </h3>

                {renderItems(filterItems(section.key), section.image)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <Footer />
    </>
  );
}
