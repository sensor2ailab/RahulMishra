"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-btn" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>

          <Link href="/" className="logo-wrapper">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="navbar-logo"
            />

            <h2>RAHUL MISHRA</h2>
          </Link>
        </div>

        <ul className="desktop-menu">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/academics">Academics</Link>
          </li>

          <li>
            <Link href="/responsibilities">Responsibilities</Link>
          </li>

          <li>
            <Link href="/research">Research</Link>
          </li>

          {isAdmin && (
            <li>
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link href="/teaching">Teaching</Link>
          </li>

          <li>
            <Link href="/projects">Projects</Link>
          </li>

          <li>
            <Link href="/invited-speaker">Invited Speaker</Link>
          </li>

          <li>
            <Link href="/contact">Contact</Link>
          </li>

        </ul>
      </nav>

      <div className={isOpen ? "mobile-sidebar active" : "mobile-sidebar"}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>

        <ul className="mobile-menu">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/academics" onClick={() => setIsOpen(false)}>
              Academics
            </Link>
          </li>

          <li>
            <Link href="/responsibilities" onClick={() => setIsOpen(false)}>
              Responsibilities
            </Link>
          </li>

          <li>
            <Link href="/research" onClick={() => setIsOpen(false)}>
              Research
            </Link>
          </li>

          <li>
            <Link href="/teaching" onClick={() => setIsOpen(false)}>
              Teaching
            </Link>
          </li>

          <li>
            <Link href="/projects" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
          </li>

          <li>
            <Link href="/invited-speaker" onClick={() => setIsOpen(false)}>
              Invited Speaker
            </Link>
          </li>

          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
}
