import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import data from '../db/data.json';

const { TextArea } = Input;

const ContactForm = ({ onSuccess, className = "contact-form", buttonText = "Enviar idea" }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { profile } = data;

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
        if (onSuccess) onSuccess();
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
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className={className}
      requiredMark={false}
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
          {
            type: "email",
            message: "Por favor ingresa un email válido",
          },
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
          rows={6}
          placeholder="Escribe tu idea aquí..."
          maxLength={1000}
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
          className="submit-button"
          block
        >
          {loading ? "Enviando..." : buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;