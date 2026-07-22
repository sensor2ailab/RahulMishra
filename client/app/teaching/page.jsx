"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

export default function TeachingPage() {
  const [courses, setCourses] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);



  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/teaching");

      const data = await response.json();

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();

    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

 

  const deleteCourse = async (id) => {
  try {
    await fetch(
      `http://localhost:5000/api/teaching/${id}`,
      {
        method: "DELETE",

        headers: {
          token: localStorage.getItem(
            "token"
          ),
        },
      }
    );

    fetchCourses();
  } catch (error) {
    console.log(error);
  }
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
        {/* HERO SECTION */}

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
              TEACHING
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
              Courses, Teaching Experience & Academic Contributions
            </p>
          </div>
        </section>

        {/* MAIN */}

        <div
          style={{
            width: "100%",

            maxWidth: "1150px",

            margin: "40px auto",

            padding: "0 18px",
          }}
        >
          {/* DASHBOARD BUTTON */}

          <div
            style={{
              display: "flex",

              justifyContent: "flex-end",

              marginBottom: "24px",
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
              background: "rgba(255,255,255,0.86)",

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
              

              <h2
                style={{
                  fontSize: "34px",

                  color: "#111",

                  margin: 0,
                }}
              >
                Teaching Experience
              </h2>
            </div>

            {/* COURSES */}

            {courses.length === 0 ? (
              <p
                style={{
                  color: "#666",
                }}
              >
                No Teaching Data Available
              </p>
            ) : (
              courses.map((course, index) => (
                <div
                  key={course._id}
                  style={{
                    background: "#f9f7f1",

                    padding: "24px",

                    borderRadius: "18px",

                    marginBottom: "24px",

                    transition: "0.35s",

                    borderLeft: "5px solid #d4a017",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";

                    e.currentTarget.style.boxShadow =
                      "0 10px 22px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";

                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",

                      justifyContent: "space-between",

                      gap: "20px",

                      flexWrap: "wrap",
                    }}
                  >
                    {/* LEFT */}

                    <div
                      style={{
                        flex: 1,

                        minWidth: "260px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "24px",

                          marginBottom: "14px",

                          color: "#111",
                        }}
                      >
                        {index + 1}. {course.title}
                      </h3>

                      <p
                        style={{
                          color: "#444",

                          marginBottom: "8px",

                          lineHeight: "1.8",
                        }}
                      >
                        <strong>Duration:</strong> {course.duration}
                      </p>

                      <p
                        style={{
                          color: "#444",

                          lineHeight: "1.8",
                        }}
                      >
                        <strong>Institute:</strong> {course.institute}
                      </p>
                    </div>

                    {/* DELETE */}

                    {isAdmin && (
                      <button
                        onClick={() => deleteCourse(course._id)}
                        style={{
                          background:
                            "linear-gradient(to right, #d32f2f, #ff5252)",
                          color: "white",
                          border: "none",
                          padding: "12px 20px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "700",
                          height: "48px",
                        }}
                      >
                        🗑 Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* BOTTOM HIGHLIGHT */}

          <div
            style={{
              marginTop: "40px",

              background: "linear-gradient(to right, #111, #333)",

              color: "white",

              padding: "34px",

              borderRadius: "24px",

              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "32px",

                marginBottom: "18px",
              }}
            >
              Dedicated to Quality Education, Practical Learning and Student
              Mentorship
            </h2>

            <p
              style={{
                lineHeight: "2",

                fontSize: "16px",

                color: "#ddd",
              }}
            >
              Delivering industry-oriented courses in Algorithms, Data Science,
              IoT, Machine Learning and Drone Analytics.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <Footer />
    </>
  );
}
