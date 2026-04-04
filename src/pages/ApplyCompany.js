import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./SimplePage.css";

function ApplyCompany() {
  return (
    <div className="simple-page">
      <Header />
      <main className="simple-page__main">
        <h1>Apply for company</h1>
        <p>Company registration will go here.</p>
        <Link to="/search" className="simple-page__back">
          ← Back to search
        </Link>
      </main>
    </div>
  );
}

export default ApplyCompany;
