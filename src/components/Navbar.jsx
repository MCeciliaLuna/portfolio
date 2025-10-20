import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import data from '../db/data.json';
import './Navbar.css';

const Navbar = () => {
  const [current, setCurrent] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
    const element = document.getElementById(e.key);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const items = data.navigation.map(item => ({
    key: item.href.replace('#', ''),
    label: item.label,
  }));

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-text">Cecilia</span>
        </div>
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