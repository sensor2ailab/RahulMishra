"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin");
      return;
    }

    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/contact/messages",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      const data = await response.json();

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/contact/messages/${id}`, {
        method: "DELETE",

        headers: {
          token: localStorage.getItem("token"),
        },
      });

      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <section
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          padding: "50px 20px",
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                fontSize: "40px",
                fontWeight: "800",
              }}
            >
              Contact Messages
            </h1>

            <button
              onClick={() => router.push("/dashboard")}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Dashboard
            </button>
          </div>

          {messages.length === 0 ? (
            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              No Messages Found
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                style={{
                  background: "#fff",
                  padding: "25px",
                  borderRadius: "18px",
                  marginBottom: "20px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
              >
                <h3
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  👤 {message.name}
                </h3>

                <p>
                  <strong>Email:</strong> {message.email}
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    lineHeight: "1.8",
                  }}
                >
                  <strong>Message:</strong>
                  <br />
                  {message.message}
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    color: "#666",
                  }}
                >
                  <strong>Date:</strong>{" "}
                  {new Date(message.createdAt).toLocaleString()}
                </p>

                <button
                  onClick={() => deleteMessage(message._id)}
                  style={{
                    marginTop: "15px",
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  🗑 Delete Message
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
