import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./SimplePage.css";

function Profile() {
  return (
    <div className="simple-page">
      <Header />
      <main className="simple-page__main">
        <h1>Your profile</h1>
        <p>Profile details will load here when connected to your user API.</p>
        <Link to="/search" className="simple-page__back">
          ← Back to search
        </Link>
      </main>
    </div>
  );
}

export default Profile;
