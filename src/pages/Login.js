import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AUTH } from "../config/api";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      const response = await fetch(AUTH.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Check if response has JSON content before parsing
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text || "Login failed" };
      }

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage({ type: "success", text: "Login successful." });
      } else {
        // Better error message extraction
        const errorMsg =
          data.message ||
          data.error ||
          (typeof data === "string" ? data : "Login failed");
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
        <h2>Sign in</h2>
        <p className="auth-subtitle">Sign in to book buses and manage your trips</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
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
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>

        <Link to="/" className="auth-back">
          ← Back to BusBook
        </Link>
      </div>
    </div>
  );
}

export default Login;
