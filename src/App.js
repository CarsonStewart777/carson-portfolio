import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Code, Briefcase, GraduationCap, Send, Home, FolderOpen, Settings, MessageCircle } from 'lucide-react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.firstName}! Your message has been received. We'll get back to you soon.`);
    setFormData({
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      message: ''
    });
    setCurrentPage('home');
  };

  // Custom Logo Component
  const Logo = () => (
    <div className="logo">
      <div className="logo-circle">
        <span className="logo-text">CS</span>
      </div>
      <span className="logo-name">Carson Stewart</span>
    </div>
  );

  // Navigation Component
  const Navigation = () => (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          <Logo />
          <div className="nav-links">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'about', label: 'About', icon: User },
              { id: 'projects', label: 'Projects', icon: FolderOpen },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'services', label: 'Services', icon: Settings },
              { id: 'contact', label: 'Contact', icon: MessageCircle }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`nav-button ${currentPage === id ? 'nav-button-active' : ''}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  // Home Page Component
  const HomePage = () => (
    <div className="page">
      <div className="container">
        <div className="home-content">
          <div className="home-header">
            <h1 className="home-title">Hello, I'm Carson</h1>

          </div>
          
          <div className="mission-card">
            <h2 className="mission-title">My Mission</h2>
                        <p className="mission-text">
                          To push the boundaries of computation through low-level optimization, parallel processing, and advanced algorithmic design. I'm driven to build high-performance systems, innovate in system architecture, and contribute to the foundational technologies that power the future of computing.
                        </p>          </div>

          <div className="home-buttons">
            <button
              onClick={() => setCurrentPage('about')}
              className="btn btn-primary"
            >
              <User size={22} />
              <span>Learn About Me</span>
            </button>
            <button
              onClick={() => setCurrentPage('projects')}
              className="btn btn-secondary"
            >
              <FolderOpen size={22} />
              <span>View My Work</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // About Me Page Component
  const AboutPage = () => (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">About Me</h1>
          <div className="page-divider"></div>
        </div>
        
        <div className="about-content">
          <div className="about-image">
            <div className="profile-placeholder">
              <User size={140} className="profile-icon" />
            </div>
          </div>
          
          <div className="about-text">
            <div className="about-info">
              <h2 className="about-name">Carson Stewart</h2>
                            <p className="about-description">
                              I am a Computer Science student currently focused on expanding my expertise in C++ for systems and performance, GPU programming with CUDA, and low-level optimization and memory models. My goal is to build a strong foundation in these areas to tackle complex computational challenges.
                            </p>
                            <p className="about-description">
                              My interests span compilers and runtime systems, parallel computation, and algorithmic optimization with mathematical methods. I am also fascinated by market dynamics and the philosophy of computation, seeking to understand and apply these concepts in innovative ways.
                            </p>            </div>
            
            <button
              onClick={() => alert("Resume download would be implemented here with actual PDF file")}
              className="btn btn-primary"
            >
              <svg className="download-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"/>
              </svg>
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Projects Page Component
  const ProjectsPage = () => {
    const projects = [
      {
        title: "Financial Data Visualization & Backtesting Tool",
        description: "Developed end-to-end Python application integrating Pandas, scikit-learn, TensorFlow, and Matplotlib for financial API data retrieval with automated error handling.",
        role: "Developer",
        outcome: "Improved logistic regression forecasting accuracy by 8% with advanced feature engineering"
      },
      {
        title: "Automated Business Lead Generator",
        description: "Architected scalable Python pipeline using BeautifulSoup and Selenium for web scraping and processing of 1,000+ daily records with integrated messaging APIs.",
        role: "Full-Stack Developer",
        outcome: "Reduced manual effort by 80% with optimized automated outreach strategies"
      },
      {
        title: "Goldilocks Field Implementation",
        description: "A minimal Rust implementation of arithmetic over the Goldilocks prime field (p = 2⁶⁴ − 2³² + 1), crucial for modern zero-knowledge proof systems and high-performance cryptographic protocols. This crate provides modular arithmetic, a safe `FieldElement` type, and basic field operations like addition, subtraction, multiplication, negation, inversion, and exponentiation by squaring. The implementation prioritizes correctness and clarity, making it suitable for educational use, prototyping, or as a reference.",
        role: "Developer",
        outcome: "Provided a foundational cryptographic primitive for advanced ZKP systems, emphasizing clarity and correctness."
      }
    ];

    return (
      <div className="page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">My Projects</h1>
            <div className="page-divider"></div>
          </div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-content">
                  <div className="project-icon">
                    <div className="icon-circle">
                      <Code size={60} className="code-icon" />
                    </div>
                  </div>
                  
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-details">
                      <div className="project-detail">
                        <span className="detail-label">Role:</span>
                        <span className="detail-value">{project.role}</span>
                      </div>
                      <div className="project-detail">
                        <span className="detail-label">Outcome:</span>
                        <span className="detail-value">{project.outcome}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Education Page Component
  const EducationPage = () => {
    const education = [
      {
        degree: "Diploma in Software Engineering Technology",
        institution: "Centennial College",
        year: "Expected Graduation: August 2026",
        description: "Currently pursuing comprehensive studies in software development with focus on full-stack technologies, data structures, algorithms, and emerging AI/ML applications."
      },
      {
        degree: "Relevant Coursework Highlights",
        institution: "Centennial College",
        year: "2024 - 2026",
        description: "Linear Algebra, Statistics, Data Warehousing, Data Structures & Algorithms - Building strong foundation for advanced software engineering concepts."
      },
      {
        degree: "Leadership & Professional Development",
        institution: "AI Club Vice President",
        year: "September 2024 - Present",
        description: "Leading technical workshops on neural networks and computer vision, coordinating collaborative projects using agile methodologies with focus on peer learning."
      }
    ];

    return (
      <div className="page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Education & Qualifications</h1>
            <div className="page-divider"></div>
          </div>
          
          <div className="education-grid">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-content">
                  <div className="education-icon">
                    <GraduationCap size={32} />
                  </div>
                  <div className="education-info">
                    <h3 className="education-degree">{edu.degree}</h3>
                    <p className="education-institution">{edu.institution}</p>
                    <div className="education-year">
                      <Calendar size={18} />
                      <span>{edu.year}</span>
                    </div>
                    <p className="education-description">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Services Page Component
  const ServicesPage = () => {
    const services = [
      {
        title: "Full-Stack Web Development",
        description: "Custom responsive web applications using React, Node.js, and RESTful APIs with modern JavaScript frameworks and database integration",
        icon: Code
      },
      {
        title: "High-Performance AI/ML Development",
        description: "High-performance computing solutions for AI/ML, leveraging C++, CUDA, and low-level optimizations for neural networks and parallel processing in data-intensive applications.",
        icon: Settings
      },
      {
        title: "Algorithmic Optimization & Data Analysis",
        description: "Applying advanced algorithmic optimization and mathematical methods for data analysis, including high-performance data processing and visualization for complex systems.",
        icon: Briefcase
      },
      {
        title: "Cloud Solutions",
        description: "Scalable cloud-native development on AWS, GCP, and Azure with containerization using Kubernetes and automated deployment pipelines",
        icon: Settings
      },
      {
        title: "Systems Programming & Cryptography",
        description: "Developing robust systems with C++ for performance-critical applications, including GPU programming with CUDA, low-level optimization, and building robust and secure system components for secure and efficient computation.",
        icon: Code
      },
      {
        title: "Web Scraping & Automation",
        description: "Automated data collection and processing systems using BeautifulSoup, Selenium, and Python for business intelligence and lead generation",
        icon: Code
      },
      {
        title: "Technical Consulting & Mentoring",
        description: "Code reviews, debugging sessions, and technical workshops focusing on AI/ML concepts, agile development, and best practices",
        icon: User
      }
    ];

    return (
      <div className="page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Services I Offer</h1>
            <div className="page-divider"></div>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="service-card">
                  <div className="service-icon">
                    <IconComponent size={36} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Contact Page Component
  const ContactPage = () => (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Get In Touch</h1>
          <div className="page-divider"></div>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info-card">
            <h2 className="contact-info-title">Contact Information</h2>
            
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-details">
                  <p className="contact-label">Email</p>
                  <p className="contact-value">carsonstewart161803@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-details">
                  <p className="contact-label">Phone</p>
                  <p className="contact-value">(905) 809-0092</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div className="contact-details">
                  <p className="contact-label">Location</p>
                  <p className="contact-value">Courtice, Ontario, Canada</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-card">
            <h2 className="contact-form-title">Send Me a Message</h2>
            
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="form-textarea"
                ></textarea>
              </div>
              
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-submit"
              >
                <Send size={22} />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'education':
        return <EducationPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Navigation />
      {renderPage()}
    </div>
  );
}

export default App;