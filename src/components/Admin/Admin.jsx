import { useState } from "react";
import "../../styles/Admin.css";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminToken") ? true : false,
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="admin-container">
      <AdminDashboard onLogout={handleLogout} />
    </div>
  );
}

export default Admin;
