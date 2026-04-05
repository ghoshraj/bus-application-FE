import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SearchDashboard from "./pages/SearchDashboard";
import ApplyCompany from "./pages/ApplyCompany";
import ApplyDriver from "./pages/ApplyDriver";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/search" element={<SearchDashboard />} />
        <Route path="/apply/company" element={<ApplyCompany />} />
        <Route path="/apply/driver" element={<ApplyDriver />} />
        <Route
          path="/profile"
          element={<Navigate to="/search?profile=1" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
