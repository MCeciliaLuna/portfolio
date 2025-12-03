import React from "react";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import data from "../db/data.json";
import ProfileAvatar from "./ProfileAvatar";
import "./Hero.css";

const Hero = () => {
  const { profile } = data;

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay"></div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hola! Soy <span className="hero-name">{profile.name}</span>
            </h1>
            <p className="hero-tagline">{profile.tagline}</p>
          </div>

          <div className="hero-image-container">
            <ProfileAvatar
              src={profile.profileImage}
              name={profile.name}
              size={300}
              className="hero-profile-image"
            />
          </div>
        </div>

        <div>
          <Button
            type="text"
            icon={<DownOutlined />}
            className="scroll-down-btn"
            onClick={scrollToNext}
            size="large"
          >
            Conocé más
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
