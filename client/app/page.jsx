"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function HomePage() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/papers")
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

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
              fontSize: "40px",

              fontWeight: "800",

              color: "#111",

              marginBottom: "12px",
            }}
          >
            RAHUL MISHRA
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
            Assistant Professor, Department of Computer Science & Engineering,
            IIT Patna
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        style={{
          background: "#FFFDF6",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
           gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              src="/rahul.png"
              width={350}
              height={450}
              alt="Rahul Mishra"
              style={{
                borderRadius: "20px",
                width: "100%",
                maxWidth: "350px",
                height: "auto",
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
              }}
            />

            <h2
              style={{
                marginTop: "20px",
                fontSize: "2rem",
                color: "#0f172a",
              }}
            >
              Rahul Mishra
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
              }}
            >
              Assistant Professor, IIT Patna
            </p>
          </div>

          <div>
            <h1
              style={{
                fontSize: "2.8rem",
                color: "#0f172a",
                marginBottom: "25px",
              }}
            >
              About Me
            </h1>

            <p
              style={{
                lineHeight: "1.9",
                color: "#334155",
                marginBottom: "20px",
                fontSize: "1.05rem",
              }}
            >
              Rahul Mishra currently holds a faculty position in the Department
              of Computer Science and Engineering at IIT Patna. Before this
              role, he was an assistant professor at DA-IICT, Gandhinagar. His
              professional journey also includes a tenure as a Research
              Associate at the Department of Computation and Data Science,
              Indian Institute of Science, Bangalore, India. His research
              focuses on machine learning and deep learning, particularly in
              system deployment. Notably, he has delved into real-world
              deployment challenges with a specific emphasis on federated
              learning perspectives. Additionally, he has actively pursued
              applications in the practical domain, with a keen interest in
              areas involving drones and edge computation.
            </p>

            <p
              style={{
                lineHeight: "1.9",
                color: "#334155",
                fontSize: "1.05rem",
              }}
            >
              Rahul Mishra's academic background includes being a research
              scholar at the Department of Computer Science and Engineering, IIT
              (BHU) Varanasi, where he completed his Ph.D. His doctoral research
              spanned the broad domain of sensor data analytics and applied
              artificial intelligence, integrating deep learning and federated
              learning methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* RESEARCH STATS */}
      <section
        style={{
          background: "#ffffff",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "#FFFDF6",
              padding: "35px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#D4AF37",
                fontSize: "2.5rem",
                marginBottom: "10px",
              }}
            >
              {papers.length}
            </h2>

            <p>Research Publications</p>
          </div>

          <div
            style={{
              background: "#FFFDF6",
              padding: "35px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#D4AF37",
                fontSize: "2.5rem",
                marginBottom: "10px",
              }}
            >
              10+
            </h2>

            <p>Research Projects</p>
          </div>

          <div
            style={{
              background: "#FFFDF6",
              padding: "35px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#D4AF37",
                fontSize: "2.5rem",
                marginBottom: "10px",
              }}
            >
              5+
            </h2>

            <p>Research Areas</p>
          </div>

          <div
            style={{
              background: "#FFFDF6",
              padding: "35px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#D4AF37",
                fontSize: "2.5rem",
                marginBottom: "10px",
              }}
            >
              10+
            </h2>

            <p>Years of Experience</p>
          </div>
        </div>
      </section>

      {/* RESEARCH INTERESTS */}
      <section
        style={{
          background: "#FFFDF6",
          padding: "70px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "2.8rem",
              color: "#0f172a",
              marginBottom: "40px",
            }}
          >
            Research Interests
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            {[
              "Machine Learning",
              "Deep Learning",
              "Federated Learning",
              "Edge Computing",
              "Drone Analytics",
              "Artificial Intelligence",
              "Sensor Data Analytics",
              "Internet of Drones",
            ].map((item) => (
              <span
                key={item}
                style={{
                 background: "#FFFDF6",
                  color: "#D4AF37",
                  padding: "12px 22px",
                  borderRadius: "30px",
                  fontWeight: "600",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + QUICK LINKS */}
      <section
        style={{
          padding: "70px 20px",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
            gap: "30px",
          }}
        >
          {/* CONTACT CARD */}
          <div
            style={{
              background: "#FFFDF6",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#0f172a",
                marginBottom: "20px",
              }}
            >
              Contact Information
            </h2>

            <p style={{ marginBottom: "15px" }}>
              <strong>Email:</strong>
              <br />
              <a href="mailto:rahul_mishra@iitp.ac.in">
                rahul_mishra@iitp.ac.in
              </a>
            </p>

            <p style={{ marginBottom: "15px" }}>
              <strong>Alternate Email:</strong>
              <br />
              <a href="mailto:errahulmishra.cse@gmail.com">
                errahulmishra.cse@gmail.com
              </a>
            </p>

            <p style={{ marginBottom: "15px" }}>
              <strong>Skype:</strong>
              <br />
              live.errahulmishra.cse
            </p>

            <p>
              <strong>Address:</strong>
              <br />
              Department of Computer Science and Engineering, IIT Patna, India
            </p>
          </div>

          {/* QUICK LINKS CARD */}
          <div
            style={{
              background: "#FFFDF6",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#0f172a",
                marginBottom: "25px",
              }}
            >
              Quick Links
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <a
                href="https://drive.google.com/file/d/10Bnm7pJNX-l6Ryi6Wqw5RqdVDPic4GzZ/view"
                style={{
                  background: "#D4AF37",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Curriculum Vitae
              </a>

              <a
                href="/research"
                style={{
                  background: "#D4AF37",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Publications
              </a>

              <a
                href="/projects"
                style={{
                  background: "#D4AF37",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Projects
              </a>

              <a
                href="/academics"
                style={{
                  background: "#D4AF37",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Experience
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT PUBLICATIONS */}
      <section
        style={{
          background: "#FFFDF6",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              Recent Publications
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "1.1rem",
              }}
            >
              Selected recent research contributions and journal publications
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "25px",
            }}
          >
            {papers.length > 0 ? (
              papers.slice(0, 6).map((paper, index) => (
                <div
                  key={paper._id}
                  style={{
                    background: "#ffffff",
                    padding: "30px",
                    borderRadius: "18px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    borderLeft: "6px solid #D4AF37",
                    transition: "0.3s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          background: "#F8F1DD",
                          color: "#D4AF37",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                        }}
                      >
                        Publication #{index + 1}
                      </span>

                      <p
                        style={{
                          marginTop: "15px",
                          lineHeight: "1.9",
                          color: "#334155",
                          fontSize: "1.05rem",
                        }}
                      >
                        {paper.formattedText || paper.content}
                      </p>
                    </div>

                    {paper.link && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#D4AF37",
                          color: "#fff",
                          padding: "12px 20px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                        }}
                      >
                        View Paper →
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  background: "#fff",
                  padding: "40px",
                  textAlign: "center",
                  borderRadius: "15px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                }}
              >
                No Publications Found
              </div>
            )}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            <a
              href="/research"
              style={{
                background: "#0f172a",
                color: "#fff",
                padding: "15px 30px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              View All Publications
            </a>
          </div>
        </div>
      </section>

      {/* NEWS COVERAGE */}
      <section
        style={{
          background: "#ffffff",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "3rem",
              color: "#0f172a",
              marginBottom: "50px",
            }}
          >
            News Coverage
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
              gap: "25px",
            }}
          >
            <div
              style={{
                background: "#FFFDF6",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#D4AF37",
                  marginBottom: "15px",
                }}
              >
                YogaHelp
              </h3>

              <p style={{ marginBottom: "15px" }}>
                Featured in leading Indian newspapers.
              </p>

              <a
                href="https://drive.google.com/file/d/1aDrVClj7-nF3bp1xvey8zCWMowVGSyqB/view"
                target="_blank"
                rel="noreferrer"
              >
                Times of India
              </a>

              <br />

              <a
                href="https://drive.google.com/file/d/1j6XbIB9ZhUYxhV1TRxt4lW4jkdIcEeIm/view"
                target="_blank"
                rel="noreferrer"
              >
                Hindustan Times
              </a>
            </div>

            <div
              style={{
               background: "#FFFDF6",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#D4AF37",
                  marginBottom: "15px",
                }}
              >
                Internet of Drones (BIS)
              </h3>

              <p style={{ marginBottom: "15px" }}>
                Research highlighted in national media.
              </p>

              <a
                href="https://drive.google.com/file/d/1wCi2E2Fh8mpf4DJaQ63icNR1CUEGrvFr/view"
                target="_blank"
                rel="noreferrer"
              >
                Times of India Coverage
              </a>
            </div>
          </div>
        </div>
      </section>

   
      {/* IEEE PROFILE CARD */}
<section
  style={{
    background: "#FAF6E9",
    padding: "60px 20px",
  }}
>
  <div
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      background: "#FFFDF6",
      padding: "50px 30px",
      borderRadius: "25px",
      textAlign: "center",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      border: "1px solid #F0E6C0",
    }}
  >
    <h1
      style={{
        fontSize: "3rem",
        color: "#0F172A",
        marginBottom: "20px",
      }}
    >
      IEEE Profile
    </h1>

    <div
      style={{
        width: "100px",
        height: "4px",
        background: "#D4AF37",
        margin: "0 auto 25px",
        borderRadius: "10px",
      }}
    />

    <p
      style={{
        color: "#475569",
        fontSize: "1.1rem",
        marginBottom: "30px",
        lineHeight: "1.8",
      }}
    >
      Explore research publications, conference
      contributions, and IEEE activities.
    </p>

    <a
      href="https://ieeexplore.ieee.org/author/37086265217"
      target="_blank"
      rel="noreferrer"
      style={{
        background: "#D4AF37",
        color: "#fff",
        padding: "12px 28px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "600",
      }}
    >
      Visit IEEE Profile
    </a>
  </div>
</section>

      {/* ACHIEVEMENT BANNER */}
      <section
        style={{
          background: "#FFFDF6",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#0f172a",
              lineHeight: "1.8",
            }}
          >
            Recipient of Student Conference Grant sponsored by IEEE
            Communications Society (ComSoc) for INFOCOM 2021 and INFOCOM 2022.
          </h2>
        </div>
      </section>

      {/* BOOK SECTION */}
      <section
        style={{
          background: "#ffffff",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
            gap: "40px",
            alignItems: "center",
            background: "#FFFDF6",
            borderRadius: "25px",
            padding: "40px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Image
              src="/book.png"
              width={320}
              height={420}
              alt="Book"
              style={{
                borderRadius: "15px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                marginBottom: "20px",
                color: "#0f172a",
              }}
            >
              Published Book
            </h1>

            <h2
              style={{
                marginBottom: "20px",
                color: "#D4AF37",
              }}
            >
              Design and Analysis of Algorithms
            </h2>

            <p
              style={{
                marginBottom: "15px",
                lineHeight: "1.8",
              }}
            >
              <strong>Authors:</strong>
              <br />
              Hari Prabhat Gupta and Rahul Mishra
            </p>

            <p
              style={{
                marginBottom: "25px",
                lineHeight: "1.8",
              }}
            >
              <strong>Publisher:</strong>
              <br />
              AICTE as per National Education Policy (NEP), 2024.
            </p>

            <a
              href="https://ekumbh.aicte-india.org/userugbook.php"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#D4AF37",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              View Book
            </a>
          </div>
        </div>
      </section>

      {/* Remaining Sections Here */}

      <Footer />
    </>
  );
}
