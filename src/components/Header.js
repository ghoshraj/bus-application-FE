import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <span className="header__logo-icon" aria-hidden>🚌</span>
        <span className="header__logo-text">BusBook</span>
      </Link>
      <nav className="header__nav">
        <Link to="/login" className="header__link">
          Sign in
        </Link>
        <Link to="/register" className="header__btn">
          Create account
        </Link>
      </nav>
    </header>
  );
}

export default Header;
