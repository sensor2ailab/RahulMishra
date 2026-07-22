"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

export default function InvitedSpeakerPage() {
  const [speakers, setSpeakers] = useState([]);

const [isAdmin, setIsAdmin] =
  useState(false);

 

  const fetchSpeakers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/speakers");

      const data = await response.json();

      setSpeakers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

  fetchSpeakers();

  const admin =
    localStorage.getItem(
      "isAdmin"
    );

  if (admin === "true") {

    setIsAdmin(true);

  }

}, []);


  const deleteSpeaker = async (id) => {
  try {
    await fetch(
      `http://localhost:5000/api/speakers/${id}`,
      {
        method: "DELETE",

        headers: {
          token: localStorage.getItem(
            "token"
          ),
        },
      }
    );

    fetchSpeakers();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar />

      <div
        style={{
          width: "100%",

          minHeight: "100vh",

          background: "linear-gradient(to bottom, #f9f6ef, #f3f3f3)",

          paddingBottom: "70px",
        }}
      >
        {/* HERO */}

        <section
          style={{
            width: "100%",

            height: "220px",

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

              animation: "fadeIn 1s ease",
            }}
          >
            <h1
              style={{
                fontSize: "46px",

                fontWeight: "800",

                color: "#111",

                marginBottom: "8px",

                letterSpacing: "1px",
              }}
            >
              INVITED SPEAKER
            </h1>

            <div
              style={{
                width: "70px",

                height: "4px",

                background: "linear-gradient(to right, #d4a017, #f0d27a)",

                margin: "10px auto",

                borderRadius: "20px",
              }}
            ></div>

            <p
              style={{
                fontSize: "16px",

                color: "#444",
              }}
            >
              Talks, Lectures & Guest Sessions
            </p>
          </div>
        </section>

        {/* MAIN */}

        <div
          style={{
            width: "100%",

            maxWidth: "1000px",

            margin: "35px auto",

            padding: "0 18px",
          }}
        >
          {/* TOP */}

          <div
            style={{
              display: "flex",

              justifyContent: "flex-end",

              marginBottom: "20px",
            }}
          >
            {
  isAdmin && (

    <Link
      href="/dashboard"
      style={{
        textDecoration: "none",
        background:
          "linear-gradient(to right, #111, #333)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "7px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      Dashboard
    </Link>

  )
}
          </div>

          {/* MAIN CARD */}

          <div
            style={{
              background: "rgba(255,255,255,0.82)",

              backdropFilter: "blur(12px)",

              padding: "26px",

              borderRadius: "18px",

              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            {/* HEADER */}

            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "16px",

                marginBottom: "30px",

                flexWrap: "wrap",
              }}
            >
              <img
                src="/speaker.png"
                alt="speaker"
                style={{
                  width: "60px",
                }}
              />

              <h2
                style={{
                  fontSize: "28px",

                  color: "#111",

                  margin: 0,
                }}
              >
                INVITED TALKS
              </h2>
            </div>

            {/* TALKS */}

            {speakers.length === 0 ? (
              <p
                style={{
                  fontSize: "15px",

                  color: "#777",
                }}
              >
                No Talks Available
              </p>
            ) : (
              speakers.map((item, index) => (
                <div
                  key={item._id}
                  style={{
                    marginBottom: "20px",

                    padding: "20px",

                    background: "rgba(255,255,255,0.7)",

                    backdropFilter: "blur(10px)",

                    borderRadius: "14px",

                    border: "1px solid rgba(255,255,255,0.5)",

                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",

                    transition: "all 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";

                    e.currentTarget.style.boxShadow =
                      "0 12px 25px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";

                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.05)";
                  }}
                >
                  {/* TOPIC */}

                  <h3
                    style={{
                      fontSize: "22px",

                      marginBottom: "14px",

                      color: "#111",

                      lineHeight: "1.5",
                    }}
                  >
                    <span
                      style={{
                        color: "#c89b3c",
                      }}
                    >
                      {index + 1}.
                    </span>{" "}
                    {item.topic}
                  </h3>

                  {/* CONTENT */}

                  <p
                    style={{
                      fontSize: "15px",

                      lineHeight: "1.9",

                      color: "#333",

                      marginBottom: "14px",
                    }}
                  >
                    {item.content}
                  </p>

                  {/* VENUE */}

                  <p
                    style={{
                      fontSize: "14px",

                      marginBottom: "10px",

                      color: "#444",
                    }}
                  >
                    <strong>Venue:</strong> {item.venue}
                  </p>

                  {/* DATE */}

                  <p
                    style={{
                      fontSize: "14px",

                      marginBottom: "12px",

                      color: "#444",
                    }}
                  >
                    <strong>Date:</strong> {item.date}
                  </p>

                  {/* LINK */}

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      style={{
                        display: "inline-block",

                        marginBottom: "12px",

                        color: "#b71c1c",

                        fontWeight: "600",

                        textDecoration: "none",

                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.letterSpacing = "0.5px";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.letterSpacing = "0px";
                      }}
                    >
                      View
                    </a>
                  )}

                  {/* DELETE */}

                  <div>
                 {
  isAdmin && (

    <div>
      <button
        onClick={() =>
          deleteSpeaker(item._id)
        }
        style={{
          marginTop: "10px",
          background:
            "linear-gradient(to right, #d32f2f, #ff5252)",
          color: "white",
          border: "none",
          padding: "9px 18px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "600",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform =
            "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform =
            "scale(1)";
        }}
      >
        🗑 Delete
      </button>
    </div>

  )
}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
