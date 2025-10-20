import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Menu } from "antd";
import data from "../db/data.json";
import "./Navbar.css";

const Navbar = () => {
  const [current, setCurrent] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleMenuClick = useCallback((e) => {
    setCurrent(e.key);
    const element = document.getElementById(e.key);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const items = useMemo(() => 
    data.navigation.map((item) => ({
      key: item.href.replace("#", ""),
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
