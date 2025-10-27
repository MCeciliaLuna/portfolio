import React, { useState } from "react";
import { Form, Input, Button, message, Alert } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import data from "../db/data.json";

const { TextArea } = Input;

const ContactForm = ({
  onSuccess,
  className = "contact-form",
  buttonText = "Enviar",
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorDetails, setErrorDetails] = useState("");
  const { profile } = data;

  const handleSubmit = async (values) => {
    setLoading(true);
    setSubmitStatus(null);
    setErrorDetails("");

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);

      // Campos adicionales para FormSubmit
      formData.append(
        "_subject",
        `Nuevo mensaje de ${values.name} desde Portfolio`
      );
      formData.append("_captcha", "false");
      formData.append("_template", "table");

      const response = await fetch(
        "https://formsubmit.co/ajax/" + profile.email,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success !== false) {
        setSubmitStatus("success");
        message.success("¡Mensaje enviado exitosamente! Te responderé pronto.");
        form.resetFields();
        if (onSuccess) {
          setTimeout(() => onSuccess(), 1500); // Delay para mostrar el mensaje de éxito
        }
      } else {
        throw new Error(
          result.message || `Error ${response.status}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error completo:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setSubmitStatus(null);
  };

  return (
    <div className="contact-form-wrapper">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={className}
        requiredMark={false}
        onChange={resetStatus} // Reset status cuando el usuario modifica el formulario
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: "Ingresa tu nombre" }]}
        >
          <Input size="large" placeholder="Tu nombre completo" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Ingresa tu email" }]}
        >
          <Input size="large" placeholder="tu.email@ejemplo.com" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Mensaje"
          rules={[{ required: true, message: "Ingresa tu mensaje" }]}
        >
          <TextArea
            rows={6}
            placeholder="Escribe tu idea aquí..."
            maxLength={500}
            showCount
          />
        </Form.Item>

        {/* Alert de Estado */}
        {submitStatus === "success" && (
          <Alert
            message="¡Mensaje Enviado!"
            description="Tu mensaje ha sido enviado exitosamente. Te responderé a la brevedad."
            type="success"
            icon={<CheckCircleOutlined />}
            showIcon
            closable
            onClose={resetStatus}
            style={{
              marginBottom: "1rem",
              borderRadius: "8px",
              border: "1px solid #52c41a",
            }}
          />
        )}

        {submitStatus === "error" && (
          <Alert
            description={
              <div>
                <div style={{ textAlign: "center", marginTop: "12px" }}>
                  <p style={{ marginBottom: "8px", color: "#666" }}>
                    Ups, ocurrió un error. Escribime directamente a mi email
                  </p>
                  <Button
                    type="default"
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard
                        .writeText(profile.email)
                        .then(() => {
                          message.success("¡Copiado!");
                        })
                        .catch(() => {
                          message.error(
                            "No se pudo copiar. Email: " + profile.email
                          );
                        });
                    }}
                    style={{
                      backgroundColor: "var(--primary-purple)",
                      color: "var(--white)",
                      border: "none",
                      fontSize: "1em",
                    }}
                  >
                    Copiar email
                  </Button>
                </div>
              </div>
            }
            type="error"
            closable={false}
            style={{
              marginBottom: "1rem",
              borderRadius: "10px",
              border: "none",
            }}
          />
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="submit-button"
            block
            disabled={submitStatus === "success"}
          >
            {loading
              ? ""
              : submitStatus === "success"
              ? "¡Enviado!"
              : buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
