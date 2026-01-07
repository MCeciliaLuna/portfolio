# Portfolio de Cecilia Luna

Portfolio profesional de desarrolladora web frontend especializada en React, Next.js y diseño UX/UI.

## 🚀 Tecnologías

- **Frontend**: React 18.3
- **Build Tool**: Vite 5.3
- **UI Framework**: Ant Design 5.20
- **Routing**: React Router DOM 6.30
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
│   ├── db/               # Archivos JSON con datos
│   │   ├── data.json
│   │   └── me.json
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

- ✅ **SEO Optimizado**: Meta tags, Open Graph, Twitter Cards
- ✅ **Accesibilidad (a11y)**: ARIA labels, navegación por teclado, skip navigation
- ✅ **Responsive Design**: Adaptado a todos los dispositivos
- ✅ **Code Splitting**: Optimización de carga con chunks separados
- ✅ **Testing**: Tests unitarios y de integración
- ✅ **Error Handling**: ErrorBoundary y página 404 personalizada
- ✅ **Formulario de Contacto**: Con validación y envío via FormSubmit
- ✅ **Carrusel de Imágenes**: Implementado con Embla Carousel
- ✅ **Headers de Seguridad**: Configurados en Netlify

## 📝 Cómo Agregar Contenido

### Agregar un Proyecto

Edita `src/db/data.json` y agrega un objeto al array `projects`:

```json
{
  "id": 8,
  "title": "Nombre del Proyecto",
  "description": "Descripción breve del proyecto",
  "imageUrl": "/images/projects/proyecto.webp",
  "liveUrl": "https://proyecto.com",
  "repoUrl": "https://github.com/usuario/repo",
  "youtubeUrl": "https://youtube.com/..." // Opcional
}
```

### Agregar una Certificación

Edita `src/db/data.json` y agrega un objeto al array `certifications`:

```json
{
  "id": 5,
  "title": "Nombre del Curso",
  "institution": "Instituto",
  "year": "2026",
  "imageUrl": "/images/certificates/certificado.webp"
}
```

### Agregar una Skill

Edita `src/db/data.json` y agrega un objeto al array `skills`:

```json
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

Antes de desplegar, actualiza los siguientes archivos:

1. **index.html**: Actualiza las URLs canónicas con tu dominio
2. **sitemap.xml**: Reemplaza `https://tudominio.com` con tu dominio real
3. **robots.txt**: Actualiza la URL del sitemap

## 🧪 Tests

El proyecto utiliza Vitest y React Testing Library. Los tests están organizados en:

- `src/components/__tests__/`: Tests de componentes
- Coverage configurado para excluir archivos de configuración

## 📧 Contacto

El formulario de contacto usa [FormSubmit](https://formsubmit.co/). El email de destino se configura en `src/db/data.json`:

```json
{
  "profile": {
    "email": "tu@email.com"
  }
}
```

## 📄 Licencia

Este proyecto es personal y privado.

## 🙏 Créditos

Desarrollado con ❤️ por Cecilia Luna
