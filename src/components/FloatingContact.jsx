import React, { useState } from "react";
import { FloatButton, Modal } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import ContactForm from "./ContactForm";
import "./FloatingContact.css";

const FloatingContact = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
          backgroundColor: "var(--accent-pink)",
          borderColor: "var(--accent-pink)",
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
        centered
      >
        <div className="floating-modal-content">
          <ContactForm onSuccess={handleFormSuccess} buttonText="Enviar mensaje →" />
        </div>
      </Modal>
    </>
  );
};

export default FloatingContact;
