import { useEffect, useState } from "react";
import { getAuthHeaders, userProfileUrl } from "../config/api";
import { getUserIdFromToken } from "../utils/jwt";
import "./ProfilePanel.css";

function formatMemberSince(isoDate) {
  if (!isoDate) return "";
  const d = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(String(isoDate).trim())
      ? `${isoDate}T12:00:00`
      : isoDate
  );
  if (Number.isNaN(d.getTime())) return "";
  const monthYear = d.toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });
  return `Member since ${monthYear}`;
}

function formatMoney(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "₹0.00";
  return `₹${num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatKm(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0 km";
  return `${num.toLocaleString("en-IN")} km`;
}

function ProfilePanel({ onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const resolveUserId = () => {
      const stored = localStorage.getItem("userId");
      if (stored) return stored;
      const token = localStorage.getItem("token");
      return token ? getUserIdFromToken(token) : null;
    };

    (async () => {
      setLoading(true);
      setError("");
      const userId = resolveUserId();
      if (!userId) {
        setError("Could not determine your user id. Please sign in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(userProfileUrl(userId), {
          method: "GET",
          headers: getAuthHeaders(),
        });

        const rawText = await res.text();
        let data;
        try {
          data = rawText ? JSON.parse(rawText) : {};
        } catch {
          data = { message: rawText };
        }

        if (cancelled) return;

        if (!res.ok) {
          setError(
            data.message ||
              data.error ||
              rawText ||
              "Could not load profile."
          );
          setProfile(null);
          return;
        }

        setProfile(data);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Network error.");
          setProfile(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="profile-panel">
      <div className="profile-panel__head">
        <h2 className="profile-panel__title">Profile</h2>
        <button
          type="button"
          className="profile-panel__close"
          onClick={onClose}
          aria-label="Close profile"
        >
          ×
        </button>
      </div>

      <div className="profile-panel__body">
        {loading && <p className="profile-panel__muted">Loading…</p>}
        {!loading && error && (
          <p className="profile-panel__error" role="alert">
            {error}
          </p>
        )}
        {!loading && !error && profile && (
          <>
            <div className="profile-panel__hero">
              <p className="profile-panel__name">
                {profile.userName || "User"}
              </p>
              <p className="profile-panel__phone">
                {profile.phoneNumber || "—"}
              </p>
              {formatMemberSince(profile.joiningDate) && (
                <p className="profile-panel__since">
                  {formatMemberSince(profile.joiningDate)}
                </p>
              )}
            </div>

            <ul className="profile-panel__stats">
              <li>
                <span className="profile-panel__stat-value">
                  {profile.totalTrip ?? 0}
                </span>
                <span className="profile-panel__stat-label">Total trips</span>
              </li>
              <li>
                <span className="profile-panel__stat-value">
                  {formatKm(profile.totalTravel)}
                </span>
                <span className="profile-panel__stat-label">Travelled</span>
              </li>
              <li>
                <span className="profile-panel__stat-value">
                  {formatMoney(profile.walletBalance)}
                </span>
                <span className="profile-panel__stat-label">Wallet</span>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePanel;
