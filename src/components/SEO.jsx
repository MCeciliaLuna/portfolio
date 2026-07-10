import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Cecilia Luna | Desarrolladora Web Frontend, Diseñadora UX/UI & Teaching", 
  description = "Portfolio de Cecilia Luna, desarrolladora web frontend especializada en React, Next.js y diseño UX/UI. Proyectos, certificaciones y experiencia profesional.",
  keywords = "desarrolladora frontend, react, next.js, ux ui designer, portfolio, cecilia luna, desarrolladora web, developer, react, html, css, javascript, node.js, desarrollo, programacion",
  url = "/",
  image = "/images/profile.webp",
  type = "website"
}) => {
  const siteUrl = "https://mcecilialuna-dev.netlify.app";
  const fullUrl = `${siteUrl}${url === '/' ? '' : url}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
