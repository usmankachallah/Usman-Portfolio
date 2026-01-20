import "../styles/Projects.css";

function Projects() {
  const projects = [
    {
      id: 1,
      icon: "🛒",
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React frontend, Python backend, and MySQL database. Features include product catalog, shopping cart, payment integration, and admin dashboard.",
      technologies: ["React", "Python", "MySQL", "REST APIs"],
      link: "#",
    },
    {
      id: 2,
      icon: "📱",
      title: "Mobile Task Manager",
      description:
        "A React Native mobile application for managing daily tasks and projects. Includes real-time notifications, cloud sync, and offline functionality.",
      technologies: ["React Native", "Firebase", "JavaScript"],
      link: "#",
    },
    {
      id: 3,
      icon: "📊",
      title: "Social Media Dashboard",
      description:
        "A responsive React application for managing multiple social media accounts. Displays analytics, scheduling posts, and monitoring engagement metrics.",
      technologies: ["React", "JavaScript", "CSS", "REST APIs"],
      link: "#",
    },
    {
      id: 4,
      icon: "📈",
      title: "Data Analytics Platform",
      description:
        "A comprehensive analytics platform built with Python backend and React frontend. Processes large datasets and visualizes insights with interactive charts.",
      technologies: ["Python", "React", "MySQL", "Data Visualization"],
      link: "#",
    },
    {
      id: 5,
      icon: "💰",
      title: "Personal Finance App",
      description:
        "A full-stack web application for tracking expenses and managing finances. Features budget planning, spending analysis, and financial reports.",
      technologies: ["React", "Python", "MySQL", "JavaScript"],
      link: "#",
    },
    {
      id: 6,
      icon: "💬",
      title: "Real-time Chat Application",
      description:
        "A real-time messaging platform with user authentication, chat rooms, and file sharing capabilities built with modern web technologies.",
      technologies: ["React", "Python", "MySQL", "WebSockets"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Here are some of the projects I've worked on recently
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <h3>{project.title}</h3>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.link} className="project-link">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
