import React, { useState } from "react";
import { FloatButton, Modal, Form, Input, Button, message } from "antd";
import {
  MessageOutlined,
  MailOutlined,
  LinkedinOutlined,
  GithubOutlined,
  SendOutlined,
} from "@ant-design/icons";
import data from "../db/data.json";
import "./FloatingContact.css";

const { TextArea } = Input;

const FloatingContact = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profile } = data;

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);

      const response = await fetch(
        "https://formsubmit.co/ajax/" + profile.email,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        message.success("¡Mensaje enviado exitosamente!");
        form.resetFields();
        setModalVisible(false);
      } else {
        throw new Error("Error al enviar el mensaje");
      }
    } catch (error) {
      message.error(
        "Error al enviar el mensaje. Por favor intenta nuevamente."
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
        centered
      >
        <div className="floating-modal-content">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="floating-contact-form"
          >
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                { required: true, message: "Por favor ingresa tu nombre" },
                {
                  min: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
              ]}
            >
              <Input size="large" placeholder="Tu nombre completo" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Por favor ingresa tu email" },
                { type: "email", message: "Por favor ingresa un email válido" },
              ]}
            >
              <Input size="large" placeholder="tu.email@ejemplo.com" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Mensaje"
              rules={[
                { required: true, message: "Por favor escribe tu mensaje" },
                {
                  min: 10,
                  message: "El mensaje debe tener al menos 10 caracteres",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Escribe tu mensaje aquí..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                icon={<SendOutlined />}
                className="floating-submit-button"
                block
              >
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </Form.Item>
          </Form>

          <div className="floating-social-links">
            <div className="floating-social-buttons">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-social-btn linkedin-btn"
                aria-label="LinkedIn"
              >
                <LinkedinOutlined />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-social-btn github-btn"
                aria-label="GitHub"
              >
                <GithubOutlined />
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FloatingContact;
