import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <Header />
      <main className="landing__main">
        <div className="landing__hero">
          <div className="landing__hero-badge">Bus ticket booking</div>
          <h1 className="landing__title">
            Your journey,
            <br />
            <span className="landing__title-accent">one click away</span>
          </h1>
          <p className="landing__subtitle">
            Search routes, compare fares, and book bus tickets in minutes.
            Sign in or create an account to get started.
          </p>
          <div className="landing__actions">
            <Link to="/login" className="landing__btn landing__btn--primary">
              Sign in
            </Link>
            <Link to="/register" className="landing__btn landing__btn--secondary">
              Create account
            </Link>
          </div>
        </div>
        <div className="landing__visual">
          <div className="landing__bus" aria-hidden>
            <span className="landing__bus-icon">🚌</span>
            <div className="landing__road" />
          </div>
        </div>
      </main>
      <footer className="landing__footer">
        <span>Safe</span>
        <span className="landing__dot">•</span>
        <span>Easy booking</span>
        <span className="landing__dot">•</span>
        <span>Reliable travel</span>
      </footer>
    </div>
  );
}

export default Landing;
