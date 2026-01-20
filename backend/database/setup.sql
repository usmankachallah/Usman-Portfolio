-- Create Database
CREATE DATABASE IF NOT EXISTS usman_portfolio;
USE usman_portfolio;

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  technologies VARCHAR(500) NOT NULL,
  link VARCHAR(255),
  icon VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  proficiency INT DEFAULT 80,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_skill (category, name),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  title VARCHAR(100),
  bio TEXT,
  phone VARCHAR(20),
  location VARCHAR(100),
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Projects
INSERT INTO projects (title, description, technologies, icon, link) VALUES
('E-Commerce Platform', 'A full-stack e-commerce solution with React frontend, Node.js backend, and MySQL database. Features include product catalog, shopping cart, payment integration, and admin dashboard.', 'React, Node.js, MySQL, REST APIs', '🛒', '#'),
('Mobile Task Manager', 'A React Native mobile application for managing daily tasks and projects. Includes real-time notifications, cloud sync, and offline functionality.', 'React Native, Firebase, JavaScript', '📱', '#'),
('Social Media Dashboard', 'A responsive React application for managing multiple social media accounts. Displays analytics, scheduling posts, and monitoring engagement metrics.', 'React, JavaScript, CSS, REST APIs', '📊', '#'),
('Data Analytics Platform', 'A comprehensive analytics platform built with Node.js backend and React frontend. Processes large datasets and visualizes insights with interactive charts.', 'Node.js, React, MySQL, Data Visualization', '📈', '#'),
('Personal Finance App', 'A full-stack web application for tracking expenses and managing finances. Features budget planning, spending analysis, and financial reports.', 'React, Node.js, MySQL, JavaScript', '💰', '#'),
('Real-time Chat Application', 'A real-time messaging platform with user authentication, chat rooms, and file sharing capabilities built with modern web technologies.', 'React, Node.js, MySQL, WebSockets', '💬', '#');

-- Insert Sample Skills
INSERT INTO skills (category, name, proficiency) VALUES
('Frontend', 'HTML', 95),
('Frontend', 'CSS', 90),
('Frontend', 'JavaScript', 90),
('Frontend', 'React', 95),
('Frontend', 'React Native', 80),
('Backend', 'Python', 85),
('Backend', 'MySQL', 80),
('Backend', 'RESTful APIs', 85),
('Backend', 'Database Design', 80),
('Backend', 'Node.js', 85),
('Backend', 'Express', 85);

-- Insert Default Admin User (password: admin123)
-- Note: You can change this password after first login
INSERT INTO admin_users (name, email, password, title, bio, phone, location) VALUES
('Usman', 'admin@usman.com', '$2a$10$W9RqnNfZ8Z7kQzZ0I5Z0eOzrqGqZ0Z7kQzZ0I5Z0eOzrqGqZ0Z7kQ', 'Full Stack Developer', 'Passionate about building amazing web applications', '+234 7046633631', 'NNigeria');

-- Sample Contact Data Structure (empty initially)
-- Contacts are created when users submit the form
