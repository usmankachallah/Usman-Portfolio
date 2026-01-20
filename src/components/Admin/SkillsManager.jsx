import { useState, useEffect } from "react";
import "../../styles/SkillsManager.css";

function SkillsManager({ onUpdate }) {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "Frontend",
    name: "",
    proficiency: 80,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/skills");
      const data = await response.json();
      setSkills(data.data || {});
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "proficiency" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Please enter a skill name");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Skill added successfully!");
        setFormData({
          category: "Frontend",
          name: "",
          proficiency: 80,
        });
        setShowForm(false);
        fetchSkills();
        onUpdate();
      } else {
        alert("❌ Failed to add skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Error adding skill");
    }
  };

  if (loading) {
    return <div className="loading">Loading skills...</div>;
  }

  const categories = Object.keys(skills);

  return (
    <div className="skills-manager">
      <div className="manager-header">
        <h2>Skills Manager</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "❌ Cancel" : "➕ Add Skill"}
        </button>
      </div>

      {showForm && (
        <form className="skill-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
                <option value="Database">Database</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div className="form-group">
              <label>Skill Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="E.g., React"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Proficiency ({formData.proficiency}%)</label>
            <input
              type="range"
              name="proficiency"
              value={formData.proficiency}
              onChange={handleInputChange}
              min="0"
              max="100"
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Skill
          </button>
        </form>
      )}

      <div className="skills-grid">
        {categories.length === 0 ? (
          <div className="empty-state">
            <p>📭 No skills yet</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category} className="skill-category-card">
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {skills[category].map((skill) => (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <div className="proficiency-bar">
                        <div
                          className="proficiency-fill"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      <span className="proficiency-text">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SkillsManager;
