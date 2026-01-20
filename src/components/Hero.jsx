import "../styles/Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-greeting">👋</div>
        <h1 className="hero-title">Hi, I'm Usman</h1>
        <p className="hero-profession">Full Stack Developer & Web Enthusiast</p>
        <p className="hero-subtitle">Building Digital Solutions</p>
        <p className="hero-description">
          Passionate about creating scalable web and mobile applications with
          modern technologies. 3+ years of experience in Full Stack Development.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">
            Get In Touch
          </a>
          <a href="#projects" className="btn btn-secondary">
            View My Work
          </a>
        </div>
      </div>
      <div className="hero-animation">
        <div className="code-block">
          <span className="bracket">&lt;</span>
          <span className="code">Developer</span>
          <span className="bracket">/&gt;</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
