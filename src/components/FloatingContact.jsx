import React, { useState } from "react";
import { FloatButton, Modal } from "antd";
import {
  MessageOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import ContactForm from "./ContactForm";
import data from "../db/data.js";
import "./FloatingContact.css";

const FloatingContact = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { profile } = data;

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleFormSuccess = () => {
    setModalVisible(false);
  };

  return (
    <>
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        style={{
          right: 34,
          bottom: 34,
          backgroundColor: "#6f2dbd",
          borderColor: "#6f2dbd",
        }}
        tooltip={{
          title: "¡Trabajemos Juntos!",
          placement: "left",
        }}
        onClick={handleOpenModal}
        className="floating-contact-button"
      />

      <Modal
        title="¡Quiero hacer realidad tus ideas!"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
        className="floating-contact-modal"
        closable={false}
        centered
      >
        <div className="floating-modal-content">
          <ContactForm className="contact-form" onSuccess={handleFormSuccess} />
        </div>
      </Modal>
    </>
  );
};

export default FloatingContact;
