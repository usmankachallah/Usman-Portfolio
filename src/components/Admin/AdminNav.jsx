import "../../styles/AdminNav.css";

function AdminNav({ onLogout, onNavigateToProfile }) {
  return (
    <nav className="admin-nav">
      <div className="admin-nav-container">
        <div className="nav-left">
          <h2 className="admin-logo">🔧 Usman Admin</h2>
        </div>
        <div className="nav-right">
          <button
            onClick={onNavigateToProfile}
            className="profile-btn"
            title="Profile Settings"
          >
            👤
          </button>
          <a href="/" className="nav-link">
            View Site
          </a>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
