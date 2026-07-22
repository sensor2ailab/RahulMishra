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
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>RAHUL MISHRA</h1>

            <div className="line"></div>

            <p>Assistant Professor, IIT Patna, India</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-image">
          <Image
            src="/rahul.png"
            width={420}
            height={520}
            alt="Rahul Mishra"
            className="profile-image"
          />

          <h2>Rahul Mishra</h2>
        </div>

        <div className="about-content">
          <h1>ABOUT ME</h1>

          <p>
            Rahul Mishra currently holds a faculty position in the Department of
            Computer Science and Engineering at IIT Patna. Before this role, he
            was an assistant professor at DA-IICT, Gandhinagar. His professional
            journey also includes a tenure as a Research Associate at the
            Department of Computation and Data Science, Indian Institute of
            Science, Bangalore, India. His research focuses on machine learning
            and deep learning, particularly in system deployment. Notably, he
            has delved into real-world deployment challenges with a specific
            emphasis on federated learning perspectives. Additionally, he has
            actively pursued applications in the practical domain, with a keen
            interest in areas involving drones and edge computation.
          </p>

          <p>
            Rahul Mishra's academic background includes being a research scholar
            at the Department of Computer Science and Engineering, IIT (BHU)
            Varanasi, where he completed his Ph.D. His doctoral research spanned
            the broad domain of sensor data analytics and applied artificial
            intelligence, integrating deep learning and federated learning
            methodologies.
          </p>
        </div>
      </section>

      <section className="middle-section">
        <div className="left-sidebar">
          <div className="sidebar-box">
            <h3>Contact</h3>

            <div className="contact-details">
              <p>
                <strong>Address:</strong>
              </p>

              <p>
                Dept. Of Computer Science & Engg., Indian Institute of
                Technology(BHU), Varanasi, India
              </p>

              <p>
                <strong>Email:</strong>
              </p>

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

              <p>
                <strong>Skype:</strong> live.errahulmishra.cse
              </p>
            </div>
          </div>

          <div className="sidebar-box">
            <h3>Quick Links</h3>

            <ul className="quick-links">
              <li>
                <a href="https://drive.google.com/file/d/10Bnm7pJNX-l6Ryi6Wqw5RqdVDPic4GzZ/view">
                  Curriculum Vitae
                </a>
              </li>

              <li>
                <a href="/research">Publications</a>
              </li>

              <li>
                <a href="/projects">Projects</a>
              </li>

              <li>
                <a href="/academics">Experience</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-box">
            <h3>News Coverage</h3>

            <p>
              <span className="news-title">YogaHelp:</span>

              <a href="https://drive.google.com/file/d/1aDrVClj7-nF3bp1xvey8zCWMowVGSyqB/view">
                Times of India,
              </a>

              <a href="https://drive.google.com/file/d/1j6XbIB9ZhUYxhV1TRxt4lW4jkdIcEeIm/view">
                Hindustan Times
              </a>

              <span className="news-title">Internet of Drones (BIS):</span>

              <a href="https://drive.google.com/file/d/1wCi2E2Fh8mpf4DJaQ63icNR1CUEGrvFr/view">
                Times of India
              </a>

              <a href="https://epaper.indiatimes.com/">
                (Page2, Ahembdabad Edition, credit:Times of India){" "}
              </a>
            </p>
          </div>
        </div>

        <div className="right-content">
          <div className="publication-card">
            <h1>RECENT PUBLICATIONS</h1>

            <ul className="publication-list">
              {papers.length > 0 ? (
                papers.slice(0, 8).map((paper) => (
                  <li key={paper._id}>
                    {paper.formattedText || paper.content}

                    {paper.link && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          marginLeft: "10px",
                          color: "#d4a017",
                          fontWeight: "600",
                        }}
                      >
                        View Paper
                      </a>
                    )}
                  </li>
                ))
              ) : (
                <li>No Publications Found</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="highlight-section">
        <div className="ieee-box">
          <a href="https://ieeexplore.ieee.org/author/37086265217">
            Rahul@IEEE
          </a>
        </div>

        <div className="grant-box">
          <h2>
            Got student conference grant sponsored by the IEEE Communications
            Society (ComSoc), INFOCOM 2021 and 2022.
          </h2>
        </div>
      </section>

      <section className="book-section">
        <div className="book-image-wrapper">
          <Image
            src="/book.png"
            width={320}
            height={420}
            alt="Book"
            className="book-image"
          />
        </div>

        <div className="book-content">
          <h2>Book</h2>

          <h3>Title of Book: Design and Analysis of Algorithms</h3>

          <p>
            <strong>Author:</strong>
            Hari Prabhat Gupta and Rahul Mishra
          </p>

          <p>
            <strong>Publisher and Year:</strong>
            <a href="https://ekumbh.aicte-india.org/userugbook.php">
              AICTE as per National Education Policy (NEP)
            </a>
            , 2024.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
