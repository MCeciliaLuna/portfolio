import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { MailOutlined, LinkedinOutlined, GithubOutlined, SendOutlined } from '@ant-design/icons';
import data from '../db/data.json';
import './Contact.css';

const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { profile } = data;

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('message', values.message);

      const response = await fetch('https://formsubmit.co/ajax/' + profile.email, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        message.success('¡Mensaje enviado exitosamente!');
        form.resetFields();
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      message.error('Error al enviar el mensaje. Por favor intenta nuevamente.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={12}>
            <div className="contact-form-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="contact-form"
              >
                <Form.Item
                  name="name"
                  label="Nombre"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu nombre' },
                    { min: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                  ]}
                >
                  <Input size="large" placeholder="Tu nombre completo" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu email' },
                    { type: 'email', message: 'Por favor ingresa un email válido' }
                  ]}
                >
                  <Input size="large" placeholder="tu.email@ejemplo.com" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Mensaje"
                  rules={[
                    { required: true, message: 'Por favor escribe tu mensaje' },
                    { min: 10, message: 'El mensaje debe tener al menos 10 caracteres' }
                  ]}
                >
                  <TextArea 
                    rows={6} 
                    placeholder="Escribe tu mensaje aquí..."
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
                    {loading ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className="contact-info">
              <h3>¡Trabajemos juntos!</h3>
              <p className="contact-description">
                ¿Tenés un proyecto en mente?
                Contame. Me encantaría hacer realidad tu idea :)
              </p>
              
              <div className="social-links">
                <a 
                  href={`mailto:${profile.email}`}
                  className="social-link email-link"
                  aria-label="Enviar email"
                >
                  <MailOutlined className="social-icon" />
                  <span>Email</span>
                </a>
                
                <a 
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin-link"
                  aria-label="LinkedIn"
                >
                  <LinkedinOutlined className="social-icon" />
                  <span>LinkedIn</span>
                </a>
                
                <a 
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github-link"
                  aria-label="GitHub"
                >
                  <GithubOutlined className="social-icon" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Contact;