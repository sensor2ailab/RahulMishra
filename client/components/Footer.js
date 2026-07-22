import Link from "next/link";

import {
  FaGoogle,
  FaSkype,
  FaLinkedin,
  FaResearchgate,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        <div className="footer-left">

          <h2>
            Rahul Mishra
          </h2>

          <p>
            Assistant Professor | Researcher | AI & IoT Enthusiast
          </p>

          <div className="footer-contact">

            <div className="footer-contact-item">
              <FaEnvelope />
              <span>
                
                <a href="mailto:rahulmishra.rs.cse17@iitbhu.ac.in">rahulmishra.rs.cse17@iitbhu.ac.in</a>
              </span>
            </div>

            <div className="footer-contact-item">
              <FaMapMarkerAlt />
              <span>
                IIT Patna, Bihar, India
              </span>
            </div>

          </div>

        </div>

        <div className="footer-links">

          <h3>
            Quick Links
          </h3>

          <ul>

            <li>
              <Link href="/">
                Home
              </Link>
            </li>

            <li>
              <Link href="/research">
                Research
              </Link>
            </li>

            <li>
              <Link href="/projects">
                Projects
              </Link>
            </li>

            <li>
              <Link href="/teaching">
                Teaching
              </Link>
            </li>

            <li>
              <Link href="/contact">
                Contact
              </Link>
            </li>

            <li>
            <Link href="/admin">Login</Link>
          </li>

          </ul>

        </div>


        <div className="footer-social">

          <h3>
            Connect With Me
          </h3>

          <div className="social-icons">

            <a
              href="https://scholar.google.com/citations?user=Iv8gjG8AAAAJ&hl=en&oi=sra"
              target="_blank"
            >
              <FaGoogle />
            </a>

            <a
              href="https://join.skype.com/"
              target="_blank"
            >
              <FaSkype />
            </a>

            <a
              href="https://www.linkedin.com/in/rahul-mishra-052205146/"
              target="_blank"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.researchgate.net/profile/Rahul_Mishra75"
              target="_blank"
            >
              <FaResearchgate />
            </a>

          </div>

        </div>

      </div>

    </footer>

  );
}