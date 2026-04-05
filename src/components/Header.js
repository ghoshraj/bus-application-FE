import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(
    () => typeof window !== "undefined" && !!localStorage.getItem("token")
  );

  useEffect(() => {
    setHasToken(!!localStorage.getItem("token"));
  }, [location.pathname, location.search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setHasToken(false);
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <span className="header__logo-icon" aria-hidden>
          🚌
        </span>
        <span className="header__logo-text">BusBook</span>
      </Link>
      <nav className="header__nav">
        {hasToken ? (
          <div className="header__profile">
            <Link
              to="/search?profile=1"
              className="header__profile-btn"
              title="Your profile"
            >
              <span className="header__profile-avatar" aria-hidden>
                👤
              </span>
              <span className="header__profile-label">Profile</span>
            </Link>
            <button
              type="button"
              className="header__logout"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="header__link">
              Sign in
            </Link>
            <Link to="/register" className="header__btn">
              Create account
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
