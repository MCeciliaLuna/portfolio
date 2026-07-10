import { v4 as uuidv4 } from 'uuid';

const data = {
  "profile": {
    "name": "Cecilia",
    "description": "Soy de las que <strong>disfrutan el proceso creativo</strong> de principio a fin. Pongo todo mi stack y mi energía a disposición del proyecto porque amo sentir que cada paso que damos tiene un <strong>sentido real</strong>. Además, me apasiona <strong>compartir</strong> lo que sé y seguir <strong>sumando aprendizajes</strong> en el desarrollo. Una gran convicción es que <strong>los mejores productos nacen cuando hay propósito claro</strong>, un buen equipo, y un par de <strong>risas</strong> en el medio.",
    "linkedin": "https://www.linkedin.com/in/mcecilialuna1/",
    "github": "https://github.com/MCeciliaLuna",
    "email": "lunama.cecilia@gmail.com"
  },
  "projects": [
    {
      id: uuidv4(),
      "title": "Sigmma.net Website",
      "description": "Web institucional desarrollada con Nexjs",
      "imageUrl": "/images/projects/sigmma-website_optimized.webp",
      "liveUrl": "https://web.sigmma.net/"
    },
    {
      id: uuidv4(),
      "title": "Fundación Valores Para Mi Ciudad",
      "description": "Web institucional desarrollada con ReactJs, backend y DB propia",
      "imageUrl": "/images/projects/fundacion-valores_optimized.webp",
      "liveUrl": "https://valoresparamiciudadtuc.org/"
    },
    {
      id: uuidv4(),
      "title": "Bless Inmobiliaria Web",
      "description": "Web empresarial desarrollada con ReactJs, backend y DB propia",
      "imageUrl": "/images/projects/blessinmobiliaria_optimized.webp",
      "liveUrl": "https://www.blessinmobiliaria.com"
    },
    {
      id: uuidv4(),
      "title": "Panel de Administración",
      "description": "Panel de administracion de Bless Inmobiliaria + backend propio",
      "imageUrl": "/images/projects/blessinmobiliaria-panel.webp"
    },
    {
      id: uuidv4(),
      "title": "Plan Go APP",
      "description": "Diseño de aplicación para agenda de eventos desarrollada en Figma",
      "imageUrl": "/images/projects/PlanGO-app.webp",
      "figmaUrl": "https://www.figma.com/proto/PIE5e4ga4ndZ4NrSnD9VOz/Pantallas-Finales?page-id=0%3A1&node-id=9-1100&p=f&viewport=261%2C173%2C0.28&t=VLgMJdHNW4zjYtsD-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=9%3A1115"
    },
    {
      id: uuidv4(),
      "title": "Iglesia de Cristo Tucumán Web",
      "description": "Landing page institucional desarrollada con ReactJs",
      "imageUrl": "/images/projects/idc_optimized.webp",
      "liveUrl": "https://iglesiadecristotuc.org/",
    },
    {
      id: uuidv4(),
      "title": "Procrastinant APP",
      "description": "WebApp checklist de gestión de tareas para cursado de Prompt Engineering",
      "imageUrl": "/images/projects/procrastinant-app_optimized.webp",
      "liveUrl": "https://procrastinant-app.vercel.app/",
      "repoUrl": "https://github.com/MCeciliaLuna/procrastinant-app"
    },
        {
      id: uuidv4(),
      "title": "Phrases API",
      "description": "API de frases de autor temáticas desarrollada con Express",
      "imageUrl": "/images/projects/phrases-api.webp",
      "repoUrl": "https://github.com/MCeciliaLuna/phrases-API"
    },
    {
      id: uuidv4(),
      "title": "To Do List",
      "description": "WebApp checklist para gestionar tareas desarrollada con ReactJs",
      "imageUrl": "/images/projects/todolist-web.webp",
      "liveUrl": "https://todo-list-app-gl.netlify.app/",
      "repoUrl": "https://github.com/MCeciliaLuna/to-do-list-GL",
      "youtubeUrl": "https://youtu.be/CraOi6X3zLM?si=7KlX0O6uivIIo7oO"
    },
    {
      id: uuidv4(),
      "title": "La Quiaqueña Drugstore E-Commerce",
      "description": "Plataforma de comercio electrónico completa con React y DB propia",
      "imageUrl": "/images/projects/laquiaquena-web.webp",
      "liveUrl": "https://laquiaquenadrugstores.netlify.app/",
      "repoUrl": "https://github.com/MCeciliaLuna/laquiaquena-drugstores",
      "youtubeUrl": "https://youtu.be/eZHqys0oeVI?si=-E7wKCQLom-QgO5O"
    },
    {
      id: uuidv4(),
      "title": "La Quiaqueña Herboristería E-Commerce",
      "description": "Plataforma de comercio electrónico completa con React y DB propia",
      "imageUrl": "/images/projects/laquiaquena-ii-web.webp",
      "liveUrl": "https://laquiaquenaherboristeria.netlify.app/",
      "repoUrl": "https://github.com/MCeciliaLuna/laquiaquena-herboristeria",
      "youtubeUrl": "https://youtu.be/J1vSzS8Q2f0?si=smmlQNSsjfu64ybU"
    },
  ],
  "skills": [
    {
      "name": "React",
      "icon": "FaReact",
      "tooltip": "Creación de interfaces dinámicas mediante componentes reutilizables"
    },
    {
      "name": "Next.js",
      "icon": "SiNextdotjs",
      "tooltip": "Aplicaciones de alto rendimiento con renderizado optimizado (SSR/SSG)"
    },
    {
      "name": "Express.js",
      "icon": "SiExpress",
      "tooltip": "Desarrollo de APIs robustas y escalables del lado del servidor"
    },
    {
      "name": "Git",
      "icon": "FaGithub",
      "tooltip": "Gestión eficiente de versiones y colaboración técnica en equipo"
    },
    {
      "name": "Diseño UX/UI",
      "icon": "MdDesignServices",
      "tooltip": "Arquitectura de información y diseño de interfaces centradas en el usuario"
    },
    {
      "name": "Metodologías Ágiles",
      "icon": "MdSpeed",
      "tooltip": "Gestión de proyectos con entregas iterativas y mejora continua"
    },
    {
      "name": "Docencia",
      "icon": "FaChalkboardTeacher",
      "tooltip": "Facilitación de aprendizaje y comunicación efectiva de conceptos técnicos"
    }
  ],
  "certifications": [
    {
      id: uuidv4(),
      "title": "Curso de Prompt Engineering",
      "institution": "Centro de E-Learning UTN-BA",
      "year": "2026",
      "imageUrl": "/images/certificates/prompt-engineering.webp"
    },
    {
      id: uuidv4(),
      "title": "Diplomatura en Diseño UX-UI",
      "institution": "Centro de E-Learning UTN-BA",
      "year": "2025",
      "imageUrl": "/images/certificates/ux-ui-certificado.webp"
    },
    {
      id: uuidv4(),
      "title": "Diplomatura en Agile Managment",
      "institution": "Agencia I",
      "year": "2024",
      "imageUrl": "/images/certificates/agile-managment-certificado.webp"
    },
    {
      id: uuidv4(),
      "title": "JS y React Avanzado",
      "institution": "Global Learning",
      "year": "2023",
      "imageUrl": "/images/certificates/global-learning-certificado.webp"
    },
    {
      id: uuidv4(),
      "title": "Full Stack Web Developer",
      "institution": "Rolling Code School",
      "year": "2022",
      "imageUrl": "/images/certificates/Certificado.webp"
    }
  ],
  "companies": [
    {
      id: uuidv4(),
      "name": "Sigmma.Net",
      "logo": "/images/companies/sigmma.webp",
      "url": "https://sigmma.net/"
    },
    {
      id: uuidv4(),
      "name": "Instituto NOA",
      "logo": "/images/companies/instituto-noa.webp",
      "url": "https://institutonoa.com.ar/"
    },
    {
      id: uuidv4(),
      "name": "Iglesia de Cristo Tucumán",
      "logo": "/images/companies/idc.webp",
      "url": "https://iglesiadecristotuc.org/"
    },
    {
      id: uuidv4(),
      "name": "Bless Inmobiliaria",
      "logo": "/images/companies/bless.webp",
      "url": "https://blessinmobiliaria.com/"
    },
    {
      id: uuidv4(),
      "name": "Fundacion Valores Para Mi Ciudad",
      "logo": "/images/companies/valores.webp",
      "url": "https://valoresparamiciudadtuc.org/"
    },
    {
      id: uuidv4(),
      "name": "Conti Latam",
      "logo": "/images/companies/conti.webp",
      "url": "https://contilatam.com/"
    },
  ]
};

export default data;
