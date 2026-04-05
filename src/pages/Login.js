import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { AUTH } from "../config/api";
import { getUserIdFromToken } from "../utils/jwt";
import "./Auth.css";

function pickToken(body) {
  if (!body || typeof body !== "object") return null;
  const t =
    body.token ??
    body.accessToken ??
    body.access_token ??
    body.jwt;
  return typeof t === "string" && t.trim() ? t.trim() : null;
}

function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("reset") === "1") {
      setMessage({
        type: "success",
        text: "Password reset successful. Please sign in.",
      });
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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

      const rawText = await response.text();
      let data;
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = { message: rawText };
      }

      const token = pickToken(data);

      if (response.ok && token) {
        localStorage.setItem("token", token);
        const userId = getUserIdFromToken(token);
        if (userId) localStorage.setItem("userId", userId);
        else localStorage.removeItem("userId");
        navigate("/search", { replace: true });
      } else if (response.ok && !token) {
        setMessage({
          type: "error",
          text: "Login succeeded but no token was returned.",
        });
      } else {
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
        <p className="auth-subtitle">
          Sign in to book buses and manage your trips
        </p>

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

          <div className="auth-forgot-row">
            <Link to="/forgot-password" className="auth-forgot-link">
              Forgot password?
            </Link>
          </div>

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
