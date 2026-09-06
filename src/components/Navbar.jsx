import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Scroll event for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to highlight active link
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = ["inicio", "sobre", "certificaciones", "skills", "proyectos", "contacto"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleLinkClick = (e, href, isRoute) => {
    e.preventDefault();
    setMenuOpen(false);

    if (isRoute) {
      navigate(href);
    } else if (location.pathname === "/") {
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const isHome = location.pathname === "/";

  return (
    <nav ref={navbarRef} className={`navbar-custom ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-brand">
      </div>

      {!isHome ? (
        <button
          className="navbar-back-button"
          onClick={() => navigate("/")}
          aria-label="Volver al inicio"
        >
          <ArrowLeftOutlined /> Volver atrás
        </button>
      ) : (
        <>
          <div className={`navbar-menu-container ${menuOpen ? "open" : ""}`}>
            <a
              href="#inicio"
              className={`navbar-link ${activeSection === "inicio" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "#inicio", false)}
            >
              Inicio
            </a>
            <a
              href="#sobre"
              className={`navbar-link ${activeSection === "sobre" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "#sobre", false)}
            >
              Sobre mí
            </a>
            <a
              href="#certificaciones"
              className={`navbar-link ${activeSection === "certificaciones" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "#certificaciones", false)}
            >
              Certificaciones
            </a>
            <a
              href="#skills"
              className={`navbar-link ${activeSection === "skills" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "#skills", false)}
            >
              Skills
            </a>
            <a
              href="#proyectos"
              className={`navbar-link ${activeSection === "proyectos" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "#proyectos", false)}
            >
              Proyectos
            </a>
            <a
              href="#contacto"
              className="navbar-cta-button"
              onClick={(e) => handleLinkClick(e, "#contacto", false)}
            >
              Trabajemos
            </a>
            <a
              href="/CV-cecilia.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-cv-button"
              onClick={() => setMenuOpen(false)}
            >
              Mi CV
            </a>
          </div>

          <button
            className={`navbar-burger-button ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú de navegación"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
