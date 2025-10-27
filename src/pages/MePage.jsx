import React from "react";
import { Button } from "antd";
import { motion } from "motion/react";
import "./MePage.css";
import data from "../db/data.json";
import meData from "../db/me.json";
import ProfileAvatar from "../components/ProfileAvatar";
import DynamicIcon from "../components/DynamicIcon";

const MePage = () => {
  const { profile } = data;
  const { socialMedia, websites } = meData;

  return (
    <div className="me-page">
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ProfileAvatar
          src={profile.profileImage}
          name={profile.name}
          size={200}
        />
      </motion.section>

      <motion.section
        className="me-name-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="me-page-name">{profile.name}</h1>
      </motion.section>

      <motion.section
        className="me-buttons-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="me-social-buttons">
          {socialMedia.map((social, index) => (
            <motion.div
              key={social.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Button
                icon={<DynamicIcon iconName={social.icon} />}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
              ></Button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="me-links-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="website-buttons">
          {websites.map((website, index) => (
            <motion.div
              key={website.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <Button
                type="default"
                size="large"
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="website-button"
                block
              >
                {website.title}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="me-span-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span>
          ¿Sabías que todo esto está hecho por <strong>mí</strong>?
        </span>
      </motion.section>
    </div>
  );
};

export default MePage;
