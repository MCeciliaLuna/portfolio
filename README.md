# Portfolio de Cecilia Luna

Portfolio profesional que fusiona Desarrollo Web Frontend, Diseño UX/UI y Docencia Tecnológica (Teaching). Especializado en React, optimización de performance e interacciones de usuario de alta fidelidad.

## 🚀 Tecnologías

- **Frontend**: React 18.3
- **Build Tool**: Vite 5.3
- **UI Framework**: Ant Design 5.20
- **Animaciones**: Framer Motion
- **Routing**: React Router DOM 6.30
- **SEO Dinámico**: React Helmet Async
- **Icons**: React Icons + Ant Design Icons
- **Carousel**: Embla Carousel
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Deployment**: Netlify

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm

## 🛠️ Instalación

1. Clonar el repositorio:

```bash
git clone <tu-repositorio>
cd portfolio
```

2. Instalar dependencias:

```bash
npm install
```

## 🏃 Scripts Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo en `http://localhost:5173` con Hot Module Replacement.

### Build de Producción

```bash
npm run build
```

Genera el build optimizado en la carpeta `dist/`.

### Vista Previa de Producción

```bash
npm run preview
```

Previsualiza el build de producción localmente.

### Linting

```bash
npm run lint      # Ejecutar linting
npm run lint:fix  # Corregir problemas automáticamente
```

### Testing

```bash
npm test              # Ejecutar tests en modo watch
npm run test:ui       # Abrir interfaz de tests
npm run test:coverage # Ver cobertura de tests
```

## 📁 Estructura del Proyecto

```
portfolio/
├── public/
│   ├── images/           # Imágenes estáticas
│   ├── sitemap.xml       # Sitemap para SEO
│   └── robots.txt        # Configuración de crawlers
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── About.jsx
│   │   ├── Certifications.jsx
│   │   ├── Companies.jsx
│   │   ├── Contact.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── FloatingContact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── SkipNavigation.jsx
│   │   └── __tests__/     # Tests de componentes
│   ├── db/               # Archivos de datos y configuración
│   │   ├── data.js       # Archivo de datos JavaScript (perfil, proyectos, skills)
│   │   └── me.json       # Configuración del perfil de enlaces (redes, sitios web)
│   ├── pages/            # Páginas principales
│   │   ├── MePage.jsx
│   │   ├── NotFound.jsx
│   │   └── PortfolioPage.jsx
│   ├── test/             # Configuración de tests
│   ├── utils/            # Utilidades
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── eslint.config.js      # Configuración de ESLint
├── vite.config.js        # Configuración de Vite
├── vitest.config.js      # Configuración de Vitest
└── package.json
```

## 🎨 Características

- ✅ **Perfil Híbrido (Dev, UX/UI & Teaching)**: Interfaz diseñada desde cero comunicando claramente los 3 roles a través de una sólida arquitectura de la información.
- ✅ **Performance Extrema**: Implementación de Code Splitting con `React.lazy` para diferir carga, alcanzando tiempos de TTI y LCP óptimos.
- ✅ **Animaciones y Micro-interacciones**: Físicas *spring* de 60fps con `framer-motion` y un sistema matemático de repulsión del cursor sin lag.
- ✅ **SEO Dinámico On-Page**: Uso de `react-helmet-async` para administrar meta-etiquetas exclusivas para sub-rutas de la SPA y Open Graph.
- ✅ **Accesibilidad (a11y)**: Directiva global `prefers-reduced-motion` para usuarios sensibles al movimiento, ARIA-live en formularios y Skip Navigation.
- ✅ **Seguridad y Resiliencia**: Formulario protegido contra doble-envío (Race Conditions) y límites de input fortificados (Hardening).
- ✅ **Theming con Tokens CSS**: Arquitectura de diseño escalable basada en variables CSS sin valores hardcodeados en JavaScript.

## 📝 Cómo Agregar Contenido

El portafolio consume datos dinámicos desde [data.js](file:///home/mcecilialuna/Escritorio/PERSONAL/portfolio/src/db/data.js).

### Agregar un Proyecto

Edita `src/db/data.js` y agrega un objeto al array `projects` utilizando `uuidv4()` para generar un ID único:

```javascript
{
  id: uuidv4(),
  "title": "Nombre del Proyecto",
  "description": "Descripción breve del proyecto",
  "imageUrl": "/images/projects/proyecto_optimized.webp",
  "liveUrl": "https://proyecto.com",
  "repoUrl": "https://github.com/usuario/repo",
  "youtubeUrl": "https://youtube.com/..." // Opcional
}
```

### Agregar una Certificación

Edita `src/db/data.js` y agrega un objeto al array `certifications`:

```javascript
{
  id: uuidv4(),
  "title": "Nombre del Curso",
  "institution": "Instituto",
  "year": "2026",
  "imageUrl": "/images/certificates/certificado.webp"
}
```

### Agregar una Skill

Edita `src/db/data.js` y agrega un objeto al array `skills`:

```javascript
{
  "name": "Tecnología",
  "icon": "NombreDelIcono",
  "tooltip": "Descripción de la tecnología"
}
```

> **Nota**: Los iconos deben estar disponibles en `react-icons` y agregados en `src/utils/iconMap.js`

## 🌐 Deployment

El proyecto está configurado para deployment automático en Netlify:

1. Conecta tu repositorio a Netlify
2. La configuración en `netlify.toml` ya está lista
3. Cada push a la rama principal desplegará automáticamente

### Variables de Entorno

Si necesitas agregar variables de entorno, créalas en Netlify Dashboard y accédelas con `import.meta.env.VITE_VARIABLE_NAME`.

## 🔍 SEO

El sitio maneja todo el SEO y metadatos de forma dinámica utilizando `react-helmet-async`. Antes de hacer un despliegue en un dominio nuevo, actualiza:

1. **SEO.jsx**: Abre `src/components/SEO.jsx` y modifica la constante `siteUrl` con el dominio final en producción. Las rutas internas heredarán esta URL para sus tags Canonical y Open Graph.
2. **sitemap.xml**: Reemplaza las URLs en `public/sitemap.xml` con tu dominio real.
3. **robots.txt**: Actualiza la ruta del sitemap en `public/robots.txt`.

## 🧪 Tests

El proyecto utiliza Vitest y React Testing Library. Los tests están organizados en:

- `src/components/__tests__/`: Tests de componentes
- Coverage configurado para excluir archivos de configuración

## 📧 Contacto

El formulario de contacto usa [FormSubmit](https://formsubmit.co/). El email de destino se configura en `src/db/data.js` dentro del objeto `profile`:

```javascript
  "profile": {
    "email": "tu@email.com",
    ...
  }
```

## 📄 Licencia

Este proyecto es personal y privado.

## 🙏 Créditos

Desarrollado por Cecilia Luna
