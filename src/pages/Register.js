import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AUTH } from "../config/api";
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
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
      const response = await fetch(AUTH.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: typeof data === "string" ? data : "Registration successful.",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || JSON.stringify(data) || "Registration failed.",
        });
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
        <h2>Create account</h2>
        <p className="auth-subtitle">Join BusBook to book bus tickets and travel with ease</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="Email address"
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
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone
            <input
              name="phoneNumber"
              type="tel"
              placeholder="Phone number"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
              {loading ? "Creating account…" : "Create account"}
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

export default Register;
