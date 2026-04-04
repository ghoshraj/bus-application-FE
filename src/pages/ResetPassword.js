import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { AUTH } from "../config/api";
import "./Auth.css";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = (searchParams.get("token") || "").trim();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    if (!token) {
      setMessage({
        type: "error",
        text: "This link is invalid or expired. Request a new reset link from the sign-in page.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(AUTH.resetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const rawText = await response.text();
      let data;
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = { message: rawText };
      }

      if (response.ok) {
        window.location.replace(`${window.location.origin}/login?reset=1`);
        return;
      } else {
        const errorMsg =
          (typeof data === "string" ? data : null) ||
          data.message ||
          data.error ||
          rawText ||
          "Could not reset password.";
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
        <h2>Reset password</h2>
        <p className="auth-subtitle">
          Enter your new password below. Open this page using the link sent to
          your email.
        </p>

        {!token && (
          <p className="auth-error" role="alert">
            Missing reset link. Please use the link from your email or{" "}
            <Link to="/forgot-password">request a new one</Link>.
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            New password
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setMessage({ type: "", text: "" });
              }}
              required
              disabled={!token}
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setMessage({ type: "", text: "" });
              }}
              required
              disabled={!token}
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
              disabled={loading || !token}
            >
              {loading ? "Updating…" : "Reset password"}
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

export default ResetPassword;
