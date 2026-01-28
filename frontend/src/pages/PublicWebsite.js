import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../public-site.css';

function PublicWebsite() {
  useEffect(() => {
    // Initialize scroll animations and navbar behavior
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Navbar scroll effect
    const handleScroll = () => {
      if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    // Hamburger menu toggle
    const handleHamburgerClick = () => {
      hamburger?.classList.toggle('active');
      navMenu?.classList.toggle('active');
    };

    // Fade-in on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach(el => observer.observe(el));

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    hamburger?.addEventListener('click', handleHamburgerClick);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      hamburger?.removeEventListener('click', handleHamburgerClick);
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="public-website">
      {/* Navigation Header */}
      <header className="navbar" id="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <img src="/images.jpg" alt="Mubito School Logo" />
              <span className="logo-text">Mubito School</span>
            </div>
            <nav className="nav-menu" id="navMenu">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#programs" className="nav-link">Programs</a>
              <a href="#admissions" className="nav-link">Admissions</a>
              <a href="#contact" className="nav-link">Contact</a>
              <Link to="/student-login" className="btn-login">Student Login</Link>
            </nav>
            <button className="hamburger" id="hamburger" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">Welcome to Mubito School</h1>
          <p className="hero-subtitle animate-fade-in-delay">Empowering Students to Become Tomorrow's Leaders</p>
          <div className="hero-buttons animate-fade-in-delay-2">
            <a href="#admissions" className="btn btn-primary">Schedule a Visit</a>
            <a href="#about" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* Recognition Banner */}
      <section className="recognition">
        <div className="container">
          <div className="recognition-content">
            <div className="badge">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="recognition-text">
              <h3>Recognized for Excellence</h3>
              <p>Mubito School is proud to be among Nigeria's leading educational institutions, committed to fostering academic excellence and character development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/campus-1.jpg" alt="Mubito School Campus" className="fade-in-on-scroll" />
            </div>
            <div className="about-content">
              <h2 className="section-title">Discover Mubito Excellence</h2>
              <p className="section-description">
                Mubito School is dedicated to providing a world-class education that prepares students for success in college and beyond. Our curriculum is designed to challenge and inspire, fostering critical thinking, creativity, and a love of learning.
              </p>
              <p className="section-description">
                With a focus on academic rigor, character development, and leadership skills, we empower our students to become thoughtful, engaged citizens who make positive contributions to their communities and the world.
              </p>
              <div className="core-values">
                <div className="value-item">
                  <div className="value-icon">🎓</div>
                  <h4>Academic Excellence</h4>
                </div>
                <div className="value-item">
                  <div className="value-icon">💡</div>
                  <h4>Innovation</h4>
                </div>
                <div className="value-item">
                  <div className="value-icon">🤝</div>
                  <h4>Integrity</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Showcase */}
      <section className="stats">
        <div className="container">
          <h2 className="section-title centered">Mubito at a Glance</h2>
          <div className="stats-grid">
            <div className="stat-card fade-in-on-scroll">
              <div className="stat-number">500+</div>
              <div className="stat-label">Students</div>
              <div className="stat-description">From across Nigeria</div>
            </div>
            <div className="stat-card fade-in-on-scroll">
              <div className="stat-number">98%</div>
              <div className="stat-label">College Admission</div>
              <div className="stat-description">Rate of Success</div>
            </div>
            <div className="stat-card fade-in-on-scroll">
              <div className="stat-number">15:1</div>
              <div className="stat-label">Student-Teacher</div>
              <div className="stat-description">Ratio for Quality Learning</div>
            </div>
            <div className="stat-card fade-in-on-scroll">
              <div className="stat-number">25+</div>
              <div className="stat-label">Years</div>
              <div className="stat-description">Of Educational Excellence</div>
            </div>
            <div className="stat-card fade-in-on-scroll">
              <div className="stat-number">20+</div>
              <div className="stat-label">Programs</div>
              <div className="stat-description">Academic & Extracurricular</div>
            </div>
            <div className="stat-card fade-in-on-scroll">
              <div className="stat-number">50</div>
              <div className="stat-label">Dedicated Teachers</div>
              <div className="stat-description">Committed to Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="programs" id="programs">
        <div className="container">
          <h2 className="section-title centered">Explore Our Programs</h2>
          <p className="section-intro">Mubito School offers a comprehensive education that develops the whole student</p>
          <div className="programs-grid">
            <div className="program-card fade-in-on-scroll">
              <div className="program-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" strokeWidth="2"/>
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Academics</h3>
              <p>Rigorous curriculum designed to challenge and inspire students across all subject areas, preparing them for university success.</p>
              <a href="#" className="program-link">Learn More →</a>
            </div>
            <div className="program-card fade-in-on-scroll">
              <div className="program-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="13" r="10" strokeWidth="2"/>
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Athletics</h3>
              <p>Comprehensive sports programs that build teamwork, discipline, and physical fitness while fostering school spirit.</p>
              <a href="#" className="program-link">Learn More →</a>
            </div>
            <div className="program-card fade-in-on-scroll">
              <div className="program-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Student Life</h3>
              <p>Vibrant community with clubs, activities, and events that encourage personal growth and lasting friendships.</p>
              <a href="#" className="program-link">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section className="admissions" id="admissions">
        <div className="container">
          <div className="admissions-content">
            <h2 className="section-title white">Join the Mubito Family</h2>
            <p className="admissions-description">
              We welcome students who are eager to learn, grow, and make a difference. Our admissions process is designed to identify students who will thrive in our dynamic learning environment.
            </p>
            <div className="admissions-buttons">
              <a href="#contact" className="btn btn-white">Schedule a Tour</a>
              <a href="#contact" className="btn btn-outline-white">Apply Online</a>
              <a href="#contact" className="btn btn-outline-white">Contact Admissions</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title centered">Get in Touch</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>Mubito School Campus<br/>Lagos, Nigeria</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+234 XXX XXX XXXX</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>admissions@mubitoschool.edu.ng</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form id="contactForm">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="text" placeholder="Subject" required />
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Mubito School</h4>
              <p>Empowering students to become tomorrow's leaders through excellence in education.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#programs">Programs</a></li>
                <li><a href="#admissions">Admissions</a></li>
                <li><Link to="/student-login">Student Login</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li>Lagos, Nigeria</li>
                <li>+234 XXX XXX XXXX</li>
                <li>info@mubitoschool.edu.ng</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="LinkedIn">💼</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Mubito School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicWebsite;
