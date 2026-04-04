import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AUTH } from "../config/api";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      const response = await fetch(AUTH.forgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const rawText = await response.text();
      let data;
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = { message: rawText };
      }

      if (response.ok) {
        setMessage({
          type: "success",
          text:
            "If an account exists for this email, you will receive a link to reset your password.",
        });
      } else {
        const errorMsg =
          data.message ||
          data.error ||
          (typeof data === "string" ? data : "Something went wrong.");
        setMessage({ type: "error", text: errorMsg });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Could not reach the server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Header />
      <div className="auth-card">
        <h2>Forgot password</h2>
        <p className="auth-subtitle">
          Enter your email and we&apos;ll send you a reset link if an account
          exists.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage({ type: "", text: "" });
              }}
              required
            />
          </label>

          {message.text && (
            <p
              className={
                message.type === "error" ? "auth-error" : "auth-success"
              }
            >
              {message.text}
            </p>
          )}

          <div className="auth-actions">
            <button
              type="submit"
              className="auth-btn-primary"
              disabled={loading}
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </div>
        </form>

        <Link to="/login" className="auth-back">
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
