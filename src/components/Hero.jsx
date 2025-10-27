import React from "react";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
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
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Hola! Soy <span className="hero-name">{profile.name}</span>
            </motion.h1>
            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {profile.tagline}
            </motion.p>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <ProfileAvatar
              src={profile.profileImage}
              name={profile.name}
              size={300}
              className="hero-profile-image"
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <Button
            type="text"
            icon={<DownOutlined />}
            className="scroll-down-btn"
            onClick={scrollToNext}
            size="large"
          >
            Conocé más
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
