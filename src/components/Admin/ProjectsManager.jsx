import { useState, useEffect } from "react";
import "../../styles/ProjectsManager.css";

function ProjectsManager({ onUpdate }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "#",
    icon: "📁",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/projects");
      const data = await response.json();
      setProjects(data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.technologies) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Project added successfully!");
        setFormData({
          title: "",
          description: "",
          technologies: "",
          link: "#",
          icon: "📁",
        });
        setShowForm(false);
        fetchProjects();
        onUpdate();
      } else {
        alert("❌ Failed to add project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project");
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      // Delete would be implemented in backend
      console.log("Delete project:", id);
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="projects-manager">
      <div className="manager-header">
        <h2>Projects Manager</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "❌ Cancel" : "➕ Add Project"}
        </button>
      </div>

      {showForm && (
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Icon</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              maxLength="2"
              placeholder="📁"
            />
          </div>

          <div className="form-group">
            <label>Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="E.g., E-Commerce Platform"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your project..."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Technologies *</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              placeholder="E.g., React, Node.js, MySQL"
              required
            />
          </div>

          <div className="form-group">
            <label>Project Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Project
          </button>
        </form>
      )}

      <div className="projects-list">
        {projects.length === 0 ? (
          <div className="empty-state">
            <p>📭 No projects yet</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <h3>{project.title}</h3>
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.technologies.split(",").map((tech, idx) => (
                  <span key={idx} className="tech-tag">
                    {tech.trim()}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  🔗 View
                </a>
                <button
                  className="delete-btn"
                  onClick={() => deleteProject(project.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectsManager;
