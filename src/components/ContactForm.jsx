import React, { useState } from "react";
import data from "../db/data.js";
import "./ContactForm.css";

const ContactForm = ({ onSuccess, buttonText = "Enviar mensaje →" }) => {
  const { profile } = data;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = "Ingresa tu nombre";
    if (!email.trim()) {
      tempErrors.email = "Ingresa tu email";
    } else if (!/.+@.+\..+/.test(email)) {
      tempErrors.email = "Ingresa un email válido";
    }
    if (!message.trim()) tempErrors.message = "Ingresa tu mensaje";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("_subject", `Nuevo mensaje de ${name} desde Portfolio`);
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
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        if (onSuccess) {
          onSuccess();
        }
        setTimeout(() => setStatus(null), 4500);
      } else {
        throw new Error(result.message || "Error submitting form");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
  };

  return (
    <div className="contact-form-container-custom">
      <form onSubmit={handleSubmit} className="custom-contact-form">
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: false });
            }}
            placeholder="Tu nombre completo"
            className={`form-input ${errors.name ? "error" : ""}`}
            disabled={loading || status === "success"}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: false });
            }}
            placeholder="tu@email.com"
            className={`form-input ${errors.email ? "error" : ""}`}
            disabled={loading || status === "success"}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="mensaje" className="form-label">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors({ ...errors, message: false });
            }}
            maxLength={500}
            rows={4}
            placeholder="Contame sobre tu proyecto…"
            className={`form-textarea ${errors.message ? "error" : ""}`}
            disabled={loading || status === "success"}
          ></textarea>
          {errors.message && <span className="field-error">{errors.message}</span>}
          <span className="char-counter">{message.length} / 500</span>
        </div>

        <button
          type="submit"
          className="form-submit-btn"
          disabled={loading || status === "success"}
        >
          {loading ? "Enviando..." : status === "success" ? "¡Enviado!" : buttonText}
        </button>
      </form>

      {status === "success" && (
        <div className="form-success-overlay">
          <span className="success-heading">¡Mensaje Enviado!</span>
          <span className="success-desc">¡Gracias! Tu mensaje fue enviado — te respondo pronto ✦</span>
        </div>
      )}

      {status === "error" && (
        <div className="form-error-overlay">
          <span className="error-desc">
            Ups, ocurrió un error. Podés escribirme a: <strong>{profile.email}</strong>
          </span>
          <button
            type="button"
            className="error-copy-btn"
            onClick={handleCopyEmail}
          >
            Copiar email
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
