import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import data from "../db/data.js";
import "./Navbar.css";

const Navbar = () => {
  const [current, setCurrent] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set current page based on location
  useEffect(() => {
    if (location.pathname === '/blog') {
      setCurrent('blog');
    } else {
      setCurrent('hero');
    }
  }, [location.pathname]);

  const handleMenuClick = useCallback((e) => {
    const clickedItem = data.navigation.find(item => 
      item.href.replace("#", "").replace("/", "") === e.key
    );
    
    setCurrent(e.key);
    
    if (clickedItem && clickedItem.isRoute) {
      // Navigate to different route
      navigate(clickedItem.href);
    } else if (location.pathname === '/') {
      // Scroll to section on home page
      const element = document.getElementById(e.key);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home and then scroll to section
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(e.key);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.pathname, navigate]);

  const items = useMemo(() => 
    data.navigation.map((item) => ({
      key: item.isRoute ? item.href.replace("/", "") : item.href.replace("#", ""),
      label: item.label,
    })), []
  );

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <Menu
          onClick={handleMenuClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className="navbar-menu"
        />
      </div>
    </nav>
  );
};

export default Navbar;
