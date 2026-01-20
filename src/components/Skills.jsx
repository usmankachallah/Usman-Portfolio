import "../styles/Skills.css";

function Skills() {
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React", "React Native"],
    backend: ["Python", "MySQL", "RESTful APIs", "Database Design"],
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <div className="category-header">
              <span className="category-icon">🎨</span>
              <h3>Frontend</h3>
              <p className="category-subtitle">Client-side Development</p>
            </div>
            <div className="skills-list">
              {skills.frontend.map((skill, index) => (
                <span key={index} className="skill-tag frontend-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <div className="category-header">
              <span className="category-icon">⚙️</span>
              <h3>Backend</h3>
              <p className="category-subtitle">Server-side Development</p>
            </div>
            <div className="skills-list">
              {skills.backend.map((skill, index) => (
                <span key={index} className="skill-tag backend-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="proficiency-section">
          <h3>Proficiency Levels</h3>
          <div className="proficiency-bars">
            <div className="proficiency-item">
              <label>React & Frontend Development</label>
              <div className="progress-bar">
                <div className="progress" style={{ width: "95%" }}></div>
              </div>
            </div>
            <div className="proficiency-item">
              <label>JavaScript & ES6+</label>
              <div className="progress-bar">
                <div className="progress" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div className="proficiency-item">
              <label>Python & Backend</label>
              <div className="progress-bar">
                <div className="progress" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div className="proficiency-item">
              <label>MySQL & Databases</label>
              <div className="progress-bar">
                <div className="progress" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div className="proficiency-item">
              <label>React Native & Mobile</label>
              <div className="progress-bar">
                <div className="progress" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
