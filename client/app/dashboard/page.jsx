"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const isAdmin = localStorage.getItem("isAdmin");

    if (!token || !isAdmin) {
      router.push("/admin");
    }
  }, [router]);

  
  const [page, setPage] = useState("research");


  const [category, setCategory] = useState("journal");

  const [inputType, setInputType] = useState("bibtex");

  const [content, setContent] = useState("");

  const [link, setLink] = useState("");

  const [projectTitle, setProjectTitle] = useState("");

  

  const [image, setImage] = useState("");

  const [imageType, setImageType] = useState("url");


  const [topic, setTopic] = useState("");

  const [venue, setVenue] = useState("");

  const [date, setDate] = useState("");

  const [speakerLink, setSpeakerLink] = useState("");



  const [teachingTitle, setTeachingTitle] = useState("");

  const [duration, setDuration] = useState("");

  const [institute, setInstitute] = useState("");

  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  

  const [projectType, setProjectType] = useState("industrial");

  const [projectName, setProjectName] = useState("");

  const [mentor, setMentor] = useState("");

  const [projectDuration, setProjectDuration] = useState("");

  const [fundingAgency, setFundingAgency] = useState("");

  const [projectImage, setProjectImage] = useState("");

 

  const [responsibilityType, setResponsibilityType] =
    useState("administrative");

  const [responsibilityTitle, setResponsibilityTitle] = useState("");

  const [responsibilityContent, setResponsibilityContent] = useState("");

  const [responsibilityImage, setResponsibilityImage] = useState("");

  

  const [academicSection, setAcademicSection] = useState("experience");

  const [designation, setDesignation] = useState("");

  const [academicDuration, setAcademicDuration] = useState("");

  const [academicDepartment, setAcademicDepartment] = useState("");

  const [academicInstitute, setAcademicInstitute] = useState("");

  const [degree, setDegree] = useState("");

  const [year, setYear] = useState("");

  const [teachingSubject, setTeachingSubject] = useState("");

  const [achievement, setAchievement] = useState("");

  
  const [contactSection, setContactSection] = useState("address");

  const [contactName, setContactName] = useState("");

  const [contactDepartment, setContactDepartment] = useState("");

  const [contactInstitute, setContactInstitute] = useState("");

  const [contactLocation, setContactLocation] = useState("");

  const [primaryEmail, setPrimaryEmail] = useState("");

  const [secondaryEmail, setSecondaryEmail] = useState("");

  const [skype, setSkype] = useState("");

  

  const handleResearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/papers/add", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },

        body: JSON.stringify({
          category,

          inputType,

          content,

          link,

          image,

          projectTitle,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Research Added Successfully");

        router.push("/research");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleSpeaker = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/speakers/add",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },

          body: JSON.stringify({
            topic,

            venue,

            date,

            link: speakerLink,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Speaker Added Successfully");

        router.push("/invited-speaker");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleTeaching = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/teaching/add",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },

          body: JSON.stringify({
            title: teachingTitle,

            duration,

            institute,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Teaching Added Successfully");

        router.push("/teaching");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleProject = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/projects/add",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },

          body: JSON.stringify({
            projectType,

            title: projectName,

            mentor,

            duration: projectDuration,

            fundingAgency,

            image: projectImage,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Project Added Successfully");

        router.push("/projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // responsibilites

  const handleResponsibility = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/responsibilities/add",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },

          body: JSON.stringify({
            section: responsibilityType,

            title: responsibilityTitle,

            content: responsibilityContent,

            image: responsibilityImage,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Responsibility Added Successfully");

        router.push("/responsibilities");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // academics

  const handleAcademic = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/academics", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },

        body: JSON.stringify({
          section: academicSection,

          designation,

          duration: academicDuration,

          department: academicDepartment,

          institute: academicInstitute,

          degree,

          year,

          title: teachingSubject,

          achievement,
        }),
      });

      if (response.ok) {
        alert("Academic Added Successfully");

        router.push("/academics");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // contact
  const handleContact = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact/info",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },

          body: JSON.stringify({
            section: contactSection,

            name: contactName,

            department: contactDepartment,

            institute: contactInstitute,

            location: contactLocation,

            primaryEmail,

            secondaryEmail,

            skype,
          }),
        },
      );

      if (response.ok) {
        alert("Contact Information Added Successfully");

        router.push("/contact");
      }
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

          background: "linear-gradient(135deg, #fdf6e3, #f3f4f6)",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          padding: "120px 18px",
        }}
      >
        {/* MAIN CARD */}

        <div
          style={{
            width: "100%",

            maxWidth: "950px",

            background: "rgba(255,255,255,0.84)",

            backdropFilter: "blur(14px)",

            borderRadius: "24px",

            padding: "42px",

            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* TOP */}

          <div
            style={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              marginBottom: "35px",

              flexWrap: "wrap",

              gap: "15px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "42px",

                  color: "#111",

                  marginBottom: "8px",
                }}
              >
                Dashboard
              </h1>

              <p
                style={{
                  color: "#555",

                  fontSize: "15px",
                }}
              >
                Manage Research, Teaching, Speaker Pages & Project Pages
              </p>
            </div>

            <Link
              href="/"
              style={{
                textDecoration: "none",

                background: "linear-gradient(to right, #111, #333)",

                color: "white",

                padding: "12px 22px",

                borderRadius: "10px",

                fontWeight: "600",
              }}
            >
              Home
            </Link>
            <Link
              href="/dashboard/messages"
              style={{
                textDecoration: "none",
                background: "#2563eb",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "10px",
                fontWeight: "700",
              }}
            >
              Messages
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");

                localStorage.removeItem("isAdmin");

                localStorage.removeItem("adminName");

                router.push("/admin");
              }}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                marginLeft: "10px",
              }}
            >
              Logout
            </button>
          </div>

          {/* PAGE SELECT */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <label
              style={{
                display: "block",

                marginBottom: "10px",

                fontWeight: "700",
              }}
            >
              Select Page
            </label>

            <select
              value={page}
              onChange={(e) => setPage(e.target.value)}
              style={{
                width: "100%",

                padding: "15px",

                borderRadius: "12px",

                border: "1px solid #ddd",
              }}
            >
              <option value="research">Research Page</option>

              <option value="speaker">Invited Speaker Page</option>

              <option value="teaching">Teaching Page</option>

              <option value="project">Project Page</option>

              <option value="responsibility">Responsibilities Page</option>

              <option value="academics">Academics Page</option>

              <option value="contact">Contact Page</option>
            </select>
          </div>


          {page === "research" && (
            <form onSubmit={handleResearch}>
              {/* CATEGORY */}

              <div
                style={{
                  marginBottom: "24px",
                }}
              >
                <label
                  style={{
                    display: "block",

                    marginBottom: "10px",

                    fontWeight: "700",
                  }}
                >
                  Select Section
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",

                    padding: "15px",

                    borderRadius: "12px",

                    border: "1px solid #ddd",
                  }}
                >
                  <option value="journal">Journal Papers</option>

                  <option value="conference">Conference Papers</option>

                  <option value="dataset">Open Datasets</option>

                  <option value="patent">Patent</option>

                  {/* <option value="project">Projects</option> */}
                </select>
              </div>

              {/* INPUT TYPE */}

              {category !== "project" && (
                <div
                  style={{
                    marginBottom: "24px",
                  }}
                >
                  <label
                    style={{
                      display: "block",

                      marginBottom: "10px",

                      fontWeight: "700",
                    }}
                  >
                    Input Type
                  </label>

                  <select
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    style={{
                      width: "100%",

                      padding: "15px",

                      borderRadius: "12px",

                      border: "1px solid #ddd",
                    }}
                  >
                    {category === "journal" ? (
                      <>
                        <option value="bibtex">BibTex</option>

                        <option value="text">Normal Text</option>
                      </>
                    ) : (
                      <option value="text">Normal Text</option>
                    )}
                  </select>
                </div>
              )}

              {/* DATASET LINK */}

              {category === "dataset" && (
                <div
                  style={{
                    marginBottom: "24px",
                  }}
                >
                  <label
                    style={{
                      display: "block",

                      marginBottom: "10px",

                      fontWeight: "700",
                    }}
                  >
                    Dataset Link
                  </label>

                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              )}

              {/* PROJECT SECTION */}

              {category === "project" && (
                <>
                  {/* PROJECT TITLE */}

                  <div
                    style={{
                      marginBottom: "24px",
                    }}
                  >
                    <label
                      style={{
                        display: "block",

                        marginBottom: "10px",

                        fontWeight: "700",
                      }}
                    >
                      Project Title
                    </label>

                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* IMAGE TYPE */}

                  <div
                    style={{
                      marginBottom: "24px",
                    }}
                  >
                    <label
                      style={{
                        display: "block",

                        marginBottom: "10px",

                        fontWeight: "700",
                      }}
                    >
                      Image Type
                    </label>

                    <select
                      value={imageType}
                      onChange={(e) => setImageType(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="url">Online Image URL</option>

                      <option value="upload">Upload From Computer</option>
                    </select>
                  </div>

                  {/* ONLINE URL */}

                  {imageType === "url" && (
                    <div
                      style={{
                        marginBottom: "24px",
                      }}
                    >
                      <label
                        style={{
                          display: "block",

                          marginBottom: "10px",

                          fontWeight: "700",
                        }}
                      >
                        Project Image URL
                      </label>

                      <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  )}

                  {/* IMAGE UPLOAD */}

                  {imageType === "upload" && (
                    <div
                      style={{
                        marginBottom: "24px",
                      }}
                    >
                      <label
                        style={{
                          display: "block",

                          marginBottom: "10px",

                          fontWeight: "700",
                        }}
                      >
                        Upload Project Image
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}

                  {/* PREVIEW */}

                  {image && (
                    <img
                      src={image}
                      alt="preview"
                      style={{
                        width: "220px",

                        height: "160px",

                        objectFit: "cover",

                        borderRadius: "14px",

                        marginBottom: "24px",

                        boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
                      }}
                    />
                  )}
                </>
              )}

              {/* CONTENT */}

              <div
                style={{
                  marginBottom: "30px",
                }}
              >
                <label
                  style={{
                    display: "block",

                    marginBottom: "10px",

                    fontWeight: "700",
                  }}
                >
                  Enter Content
                </label>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  required
                  style={{
                    width: "100%",

                    padding: "18px",

                    borderRadius: "12px",

                    border: "1px solid #ddd",

                    resize: "none",

                    lineHeight: "1.8",
                  }}
                />
              </div>

              {/* BUTTON */}

              <button type="submit" style={buttonStyle}>
                Add Research Item
              </button>
            </form>
          )}

  

          {page === "speaker" && (
            <form onSubmit={handleSpeaker}>
              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Link (Optional)"
                value={speakerLink}
                onChange={(e) => setSpeakerLink(e.target.value)}
                style={inputStyle}
              />

              <button type="submit" style={buttonStyle}>
                Add Speaker
              </button>
            </form>
          )}

          

          {page === "teaching" && (
            <form onSubmit={handleTeaching}>
              <input
                type="text"
                placeholder="Course Title"
                value={teachingTitle}
                onChange={(e) => setTeachingTitle(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Institute"
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
                required
                style={inputStyle}
              />

              <button type="submit" style={buttonStyle}>
                Add Teaching Course
              </button>
            </form>
          )}

          

          {page === "project" && (
            <form onSubmit={handleProject}>
              <div
                style={{
                  marginBottom: "22px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "700",
                  }}
                >
                  Project Type
                </label>

                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  style={inputStyle}
                >
                  <option value="industrial">Industrial Project</option>

                  <option value="startup">Startup Project</option>

                  <option value="seedgrant">Seed Grant</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Project Title"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Mentor / PI"
                value={mentor}
                onChange={(e) => setMentor(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Duration"
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Funding Agency"
                value={fundingAgency}
                onChange={(e) => setFundingAgency(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Project Image URL"
                value={projectImage}
                onChange={(e) => setProjectImage(e.target.value)}
                required
                style={inputStyle}
              />

              {projectImage && (
                <img
                  src={projectImage}
                  alt="project"
                  style={{
                    width: "250px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    objectFit: "cover",
                  }}
                />
              )}

              <button type="submit" style={buttonStyle}>
                Add Project
              </button>
            </form>
          )}

          {/* responsibilites */}

          {page === "responsibility" && (
            <form onSubmit={handleResponsibility}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                Select Section
              </label>

              <select
                value={responsibilityType}
                onChange={(e) => setResponsibilityType(e.target.value)}
                style={inputStyle}
              >
                <option value="administrative">
                  Administrative Responsibilities
                </option>

                <option value="social">Social Responsibility</option>

                <option value="coordinator">Coordinator Activities</option>
              </select>

              {/* Administrative */}

              {responsibilityType === "administrative" && (
                <textarea
                  placeholder="Enter Administrative Responsibility"
                  value={responsibilityTitle}
                  onChange={(e) => setResponsibilityTitle(e.target.value)}
                  rows={5}
                  required
                  style={inputStyle}
                />
              )}

              {/* Social */}

              {responsibilityType === "social" && (
                <textarea
                  placeholder="Enter Social Responsibility Content"
                  value={responsibilityContent}
                  onChange={(e) => setResponsibilityContent(e.target.value)}
                  rows={8}
                  required
                  style={inputStyle}
                />
              )}

              {/* Coordinator */}

              {responsibilityType === "coordinator" && (
                <>
                  <input
                    type="text"
                    placeholder="Coordinator Title"
                    value={responsibilityTitle}
                    onChange={(e) => setResponsibilityTitle(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <textarea
                    placeholder="About Activity"
                    value={responsibilityContent}
                    onChange={(e) => setResponsibilityContent(e.target.value)}
                    rows={6}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Image Link"
                    value={responsibilityImage}
                    onChange={(e) => setResponsibilityImage(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  {responsibilityImage && (
                    <img
                      src={responsibilityImage}
                      alt="preview"
                      style={{
                        width: "250px",
                        borderRadius: "12px",
                        marginBottom: "20px",
                      }}
                    />
                  )}
                </>
              )}

              <button type="submit" style={buttonStyle}>
                Add Responsibility
              </button>
            </form>
          )}

          
          {page === "academics" && (
            <form onSubmit={handleAcademic}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                Select Academic Section
              </label>

              <select
                value={academicSection}
                onChange={(e) => setAcademicSection(e.target.value)}
                style={inputStyle}
              >
                <option value="experience">Experience</option>

                <option value="education">Education</option>

                <option value="teaching">Teaching Experience</option>

                <option value="achievement">Achievements</option>
              </select>

              {/* EXPERIENCE */}

              {academicSection === "experience" && (
                <>
                  <input
                    type="text"
                    placeholder="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Duration"
                    value={academicDuration}
                    onChange={(e) => setAcademicDuration(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Department"
                    value={academicDepartment}
                    onChange={(e) => setAcademicDepartment(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Institute"
                    value={academicInstitute}
                    onChange={(e) => setAcademicInstitute(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </>
              )}

              {/* EDUCATION */}

              {academicSection === "education" && (
                <>
                  <input
                    type="text"
                    placeholder="Degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Department"
                    value={academicDepartment}
                    onChange={(e) => setAcademicDepartment(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Institute"
                    value={academicInstitute}
                    onChange={(e) => setAcademicInstitute(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </>
              )}

              {/* TEACHING EXPERIENCE */}

              {academicSection === "teaching" && (
                <input
                  type="text"
                  placeholder="Teaching Subject"
                  value={teachingSubject}
                  onChange={(e) => setTeachingSubject(e.target.value)}
                  required
                  style={inputStyle}
                />
              )}

              {/* ACHIEVEMENT */}

              {academicSection === "achievement" && (
                <textarea
                  placeholder="Achievement"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  rows={8}
                  required
                  style={inputStyle}
                />
              )}

              <button type="submit" style={buttonStyle}>
                Add Academic Data
              </button>
            </form>
          )}

          {/* contact page */}

          {page === "contact" && (
            <form onSubmit={handleContact}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                Select Contact Section
              </label>

              <select
                value={contactSection}
                onChange={(e) => setContactSection(e.target.value)}
                style={inputStyle}
              >
                <option value="address">Address</option>

                <option value="email">Email ID</option>
              </select>

              {/* ADDRESS */}

              {contactSection === "address" && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Department"
                    value={contactDepartment}
                    onChange={(e) => setContactDepartment(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Institute"
                    value={contactInstitute}
                    onChange={(e) => setContactInstitute(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Location"
                    value={contactLocation}
                    onChange={(e) => setContactLocation(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </>
              )}

              {/* EMAIL */}

              {contactSection === "email" && (
                <>
                  <input
                    type="email"
                    placeholder="Primary Email"
                    value={primaryEmail}
                    onChange={(e) => setPrimaryEmail(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <input
                    type="email"
                    placeholder="Secondary Email"
                    value={secondaryEmail}
                    onChange={(e) => setSecondaryEmail(e.target.value)}
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Skype ID"
                    value={skype}
                    onChange={(e) => setSkype(e.target.value)}
                    style={inputStyle}
                  />
                </>
              )}

              <button type="submit" style={buttonStyle}>
                Add Contact Data
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FOOTER */}

      <Footer />
    </>
  );
}



const inputStyle = {
  width: "100%",

  padding: "15px",

  borderRadius: "12px",

  border: "1px solid #ddd",

  marginBottom: "22px",
};

const buttonStyle = {
  background: "linear-gradient(to right, #111, #444)",

  color: "white",

  border: "none",

  padding: "14px 32px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "15px",
};
