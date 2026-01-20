import "../styles/About.css";

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a full stack developer with{" "}
              <strong>3 years of professional experience</strong> in building
              web and mobile applications. I have a passion for creating elegant
              solutions to complex problems and staying up-to-date with the
              latest technologies.
            </p>
            <p>
              My journey in tech started with a curiosity about how things work
              on the internet, and it has evolved into a career where I help
              businesses bring their ideas to life through code. I love
              collaborating with teams, learning new technologies, and taking on
              challenging projects.
            </p>
            <p>
              When I'm not coding, you can find me exploring new tech trends,
              contributing to open-source projects, or working on personal side
              projects to continuously improve my skills.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-icon">📅</span>
              <h3>3+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="stat">
              <span className="stat-icon">🎯</span>
              <h3>10+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <span className="stat-icon">💻</span>
              <h3>Full Stack</h3>
              <p>Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
