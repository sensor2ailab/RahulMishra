"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleResetPassword =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await fetch(
            "http://localhost:5000/api/auth/reset-password",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
                otp,
                newPassword,
              }),
            }
          );

        const data =
          await response.json();

        setLoading(false);

        if (data.success) {
          alert(
            "Password Reset Successfully"
          );

          router.push("/admin");
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
            "linear-gradient(135deg,#0f172a,#1e293b)",
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
              "blur(15px)",
            border:
              "1px solid rgba(255,255,255,0.15)",
            borderRadius: "25px",
            padding: "40px",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.4)",
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
                fontSize: "60px",
              }}
            >
              
            </div>

            <h1
              style={{
                color: "#fff",
                marginTop: "10px",
              }}
            >
              Reset Password
            </h1>

            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              Enter Email, OTP and
              New Password
            </p>
          </div>

          <form
            onSubmit={
              handleResetPassword
            }
          >
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  color: "#fff",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Registered Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  color: "#fff",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                OTP
              </label>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  outline: "none",
                }}
              />
            </div>

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
                }}
              >
                New Password
              </label>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  outline: "none",
                }}
              />

              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    showPassword
                  }
                  onChange={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                />

                <span
                  style={{
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                >
                  Show Password
                </span>
              </div>
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
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}