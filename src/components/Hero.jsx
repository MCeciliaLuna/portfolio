import React from 'react';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import data from '../db/data.json';
import './Hero.css';

const Hero = () => {
  const { profile } = data;

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background">
        <img 
          src={profile.backgroundImage} 
          alt="Background" 
          className="hero-bg-image"
          loading="eager"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hola! Soy <span className="hero-name">{profile.name}</span>
            </h1>
            <p className="hero-tagline">{profile.tagline}</p>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <img 
                src={profile.profileImage} 
                alt={`${profile.name} - Perfil`} 
                className="hero-profile-image"
                loading="eager"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${profile.name}&size=300&background=6f2dbd&color=ffffff&font-size=0.4`;
                }}
              />
            </div>
          </div>
        </div>
        
        <Button 
          type="text" 
          icon={<DownOutlined />} 
          className="scroll-down-btn"
          onClick={scrollToNext}
          size="large"
        >
          Conoce más
        </Button>
      </div>
    </section>
  );
};

export default Hero;