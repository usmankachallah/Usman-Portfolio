import { useState, useEffect } from "react";
import "../../styles/AdminDashboard.css";
import AdminNav from "./AdminNav";
import ContactMessages from "./ContactMessages";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";
import AdminProfile from "./AdminProfile";

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("contacts");
  const [stats, setStats] = useState({
    messages: 0,
    projects: 0,
    skills: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [contactsRes, projectsRes, skillsRes] = await Promise.all([
        fetch("http://localhost:5000/api/contact/messages"),
        fetch("http://localhost:5000/api/projects"),
        fetch("http://localhost:5000/api/skills"),
      ]);

      if (contactsRes.ok) {
        const data = await contactsRes.json();
        setStats((prev) => ({ ...prev, messages: data.count || 0 }));
      }
      if (projectsRes.ok) {
        const data = await projectsRes.json();
        setStats((prev) => ({ ...prev, projects: data.count || 0 }));
      }
      if (skillsRes.ok) {
        const data = await skillsRes.json();
        const skillCount = Object.values(data.data).flat().length;
        setStats((prev) => ({ ...prev, skills: skillCount }));
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNav
        onLogout={onLogout}
        onNavigateToProfile={() => setActiveTab("profile")}
      />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>📊 Admin Dashboard</h1>
          <p>Manage your portfolio content</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-icon">📧</span>
            <div className="stat-info">
              <h3>{stats.messages}</h3>
              <p>Messages</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🎯</span>
            <div className="stat-info">
              <h3>{stats.projects}</h3>
              <p>Projects</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💻</span>
            <div className="stat-info">
              <h3>{stats.skills}</h3>
              <p>Skills</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "contacts" ? "active" : ""}`}
              onClick={() => setActiveTab("contacts")}
            >
              📧 Messages
            </button>
            <button
              className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              🎯 Projects
            </button>
            <button
              className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              💻 Skills
            </button>
            <button
              className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              👤 Profile Settings
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "contacts" && <ContactMessages />}
            {activeTab === "projects" && (
              <ProjectsManager onUpdate={fetchStats} />
            )}
            {activeTab === "skills" && <SkillsManager onUpdate={fetchStats} />}
            {activeTab === "profile" && <AdminProfile />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
