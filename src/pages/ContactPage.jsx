import React from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main className="contact-page-layout">
        <Contact />
      </main>
    </>
  );
};

export default ContactPage;
