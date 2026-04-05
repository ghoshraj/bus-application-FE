import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import ProfilePanel from "../components/ProfilePanel";
import "./SearchDashboard.css";

const cities = [
  "Bangalore",
  "Chennai",
  "Delhi",
  "Hyderabad",
  "Kolkata",
  "Madurai",
  "Mumbai",
  "Pune",
];

function SearchDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showProfile = searchParams.get("profile") === "1";

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState({
    from: "Bangalore",
    to: "Madurai",
    date: today,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const closeProfile = () => {
    navigate("/search", { replace: true });
  };

  const swap = () =>
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`dashboard${showProfile ? " dashboard--split" : ""}`}
    >
      <Header />

      <div className="dashboard__split-body">
        <div className="dashboard__split-main">
          <div className="dashboard__layout">
            <aside className="dashboard__sidebar">
              <Link to="/apply/company" className="dashboard__side-btn">
                Apply for company
              </Link>
              <Link to="/apply/driver" className="dashboard__side-btn">
                Apply for driver
              </Link>
            </aside>

            <main className="dashboard__main">
              <h1 className="dashboard__title">
                India&apos;s No.1 online bus ticket booking site
              </h1>

              <div className="dashboard__search-row">
                <form className="dashboard__search" onSubmit={onSubmit}>
                  <div className="dashboard__field">
                    <span className="dashboard__label">From</span>
                    <select
                      value={form.from}
                      onChange={(e) =>
                        setForm({ ...form, from: e.target.value })
                      }
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    className="dashboard__swap"
                    onClick={swap}
                    aria-label="Swap From and To"
                  >
                    ⇄
                  </button>

                  <div className="dashboard__field">
                    <span className="dashboard__label">To</span>
                    <select
                      value={form.to}
                      onChange={(e) =>
                        setForm({ ...form, to: e.target.value })
                      }
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="dashboard__field">
                    <span className="dashboard__label">Date of Journey</span>
                    <input
                      type="date"
                      value={form.date}
                      min={today}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="dashboard__search-btn">
                    Search buses
                  </button>
                </form>

                <div className="dashboard__extras">
                  <div className="dashboard__extra-card">
                    <div className="dashboard__extra-title">
                      Booking for women
                    </div>
                    <button type="button" className="dashboard__extra-link">
                      Know more
                    </button>
                  </div>
                  <div className="dashboard__extra-card">
                    <div className="dashboard__extra-title">
                      Booking for child
                    </div>
                    <button type="button" className="dashboard__extra-link">
                      Know more
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {showProfile && (
          <aside className="dashboard__profile-aside" aria-label="Profile">
            <ProfilePanel onClose={closeProfile} />
          </aside>
        )}
      </div>
    </div>
  );
}

export default SearchDashboard;
