import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Cecilia Luna | Desarrolladora Web Frontend,Diseño UX/UI & Docente", 
  description = "Portfolio de Cecilia Luna, desarrolladora web frontend y UX/UI Designer de Tucumán, Argentina. Especializada en React, Next.js y creación de experiencias digitales (Remoto/Local).",
  keywords = "desarrolladora frontend argentina, frontend developer tucuman, react, next.js, ux ui designer tucuman, portfolio cecilia luna, desarrollo web remoto, javascript, css, node.js",
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
