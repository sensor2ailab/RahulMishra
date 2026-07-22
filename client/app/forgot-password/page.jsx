"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSendOTP =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await fetch(
            "http://localhost:5000/api/auth/forgot-password",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
              }),
            }
          );

        const data =
          await response.json();

        setLoading(false);

        if (data.success) {
          alert(
            "OTP Sent To Your Registered Email"
          );

          router.push(
            "/reset-password"
          );
        } else {
          alert(
            data.message
          );
        }
      } catch (error) {
        console.log(error);

        setLoading(false);

        alert(
          "Something went wrong"
        );
      }
    };

  return (
    <>
      <Navbar />

      <section
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "550px",
            background:
              "rgba(255,255,255,0.08)",
            backdropFilter:
              "blur(18px)",
            border:
              "1px solid rgba(255,255,255,0.15)",
            borderRadius: "25px",
            padding: "45px",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                fontSize: "65px",
              }}
            >
              📧
            </div>

            <h1
              style={{
                color: "#fff",
                marginTop: "10px",
                fontSize: "32px",
              }}
            >
              Forgot Password
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "10px",
              }}
            >
              Enter your registered email
              address to receive OTP
            </p>
          </div>

          <form
            onSubmit={
              handleSendOTP
            }
          >
            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label
                style={{
                  color: "#fff",
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                Registered Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "none",
                  outline: "none",
                  fontSize: "15px",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg,#2563eb,#7c3aed)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <button
              onClick={() =>
                router.push(
                  "/admin"
                )
              }
              style={{
                background:
                  "transparent",
                border: "none",
                color: "#93c5fd",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              ← Back To Login
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}