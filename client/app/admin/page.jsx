"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState("");

  const [showOtp, setShowOtp] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      setLoading(false);

      if (data.success) {
        alert("OTP Sent To Your Email");

        setShowOtp(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      setLoading(false);

      alert("Login Failed");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            otp,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem("isAdmin", "true");

        localStorage.setItem("adminName", data.admin.name);

        alert("Login Successful");

        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("OTP Verification Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "25px",
            padding: "45px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            <div
              style={{
                fontSize: "70px",
              }}
            ></div>

            <h1
              style={{
                color: "#fff",
                fontSize: "36px",
                marginTop: "10px",
              }}
            >
              Admin Login
            </h1>

            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              Secure Dashboard Access
            </p>
          </div>

          <form onSubmit={handleLogin}>
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
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "none",
                  outline: "none",
                }}
              />
            </div>

            {showOtp && (
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
                  onChange={(e) => setOtp(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "12px",
                    border: "none",
                    outline: "none",
                  }}
                />
              </div>
            )}

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
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "15px",
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
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
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

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "14px",
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              {loading ? "Sending OTP..." : showOtp ? "Resend OTP" : "Send OTP"}
            </button>

            {showOtp && (
              <button
                type="button"
                onClick={handleVerifyOtp}
                style={{
                  width: "100%",
                  padding: "15px",
                  marginTop: "15px",
                  border: "none",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg,#16a34a,#22c55e)",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
              >
                Verify OTP and Login
              </button>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#93c5fd",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
