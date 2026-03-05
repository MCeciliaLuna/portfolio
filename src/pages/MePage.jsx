import React from "react";
import { Button } from "antd";
import "./MePage.css";
import data from "../db/data.js";
import meData from "../db/me.json";
import ProfileAvatar from "../components/ProfileAvatar";
import DynamicIcon from "../components/DynamicIcon";

const MePage = () => {
  const { profile } = data;
  const { socialMedia, websites } = meData;

  return (
    <div className="me-page">
      <section>
        <ProfileAvatar
          src={profile.profileImage}
          name={profile.name}
          size={200}
        />
      </section>

      <section className="me-name-section">
        <h1 className="me-page-name">{profile.name} :)</h1>
      </section>

      <section className="me-buttons-section">
        <div className="me-social-buttons">
          {socialMedia.map((social, index) => (
            <div key={social.id}>
              <Button
                icon={<DynamicIcon iconName={social.icon} />}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
              ></Button>
            </div>
          ))}
        </div>
      </section>

      <section className="me-links-section">
        <div className="website-buttons">
          {websites.map((website, index) => (
            <div key={website.id}>
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
            </div>
          ))}
        </div>
      </section>

      <section className="me-span-section">
        <span>
          ¿Sabías que todo esto está hecho por <strong>mí</strong>?
        </span>
      </section>
    </div>
  );
};

export default MePage;
