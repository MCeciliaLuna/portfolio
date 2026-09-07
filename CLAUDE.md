# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexto

Portfolio personal de Cecilia Luna (React + Vite, SPA estática desplegada en Netlify). El contenido de la interfaz está en español; mantené ese idioma en textos visibles, comentarios y mensajes de commit.

## Comandos

```bash
npm run dev              # Vite dev server en http://localhost:5173
npm run build            # Build de producción a dist/
npm run preview          # Sirve dist/ localmente

npx vitest run           # Corre todos los tests una sola vez (npm test queda en watch)
npx vitest run src/components/__tests__/ContactForm.test.jsx   # Un archivo
npx vitest run -t "muestra errores de validación"              # Un test por nombre
npm run test:coverage    # Cobertura (v8)

npm run lint             # ⚠️ actualmente falla — ver "Estado conocido"
```

## Estado conocido (verificado el 07/09/2026)

- **`npm run lint` está roto.** `eslint.config.js` usa `reactHooks.configs["recommended-latest"]`, que en `eslint-plugin-react-hooks` v7 es el preset estilo eslintrc (`plugins` como array de strings) y ESLint 9 flat config lo rechaza. El preset flat es `reactHooks.configs.flat["recommended-latest"]`. Con ese cambio el lint corre, pero afloran **54 errores preexistentes** (mayormente `curly`, `no-undef` sobre `global` en `src/test/setup.js`, `react-hooks/refs`). Si tocás esto, tratalo como tarea propia y no lo mezcles con un cambio funcional.
- El script declara `--ext js,jsx`, flag que flat config ignora.
- Los 7 tests de `ContactForm` pasan. El bloque `Error:` que aparece en la salida es un `console.error` esperado del caso de fetch rechazado.
- El build imprime un chunk `antd` de ~407 kB (~134 kB gzip): es la dependencia más pesada del bundle.

## Arquitectura

### Rutas y carga diferida (`src/App.jsx`)
Tres rutas: `/` (`PortfolioPage`, carga eager), `/me` (`MePage`, tipo linktree) y `*` (`NotFound`). `MePage` y `NotFound` van con `React.lazy`. Dentro de `PortfolioPage`, sólo `Navbar`, `Hero` y `About` son eager; el resto de las secciones (`Certifications`, `Skills`, `Companies`, `Projects`, `Interview`, `Contact`, `Footer`) son `lazy` bajo `Suspense`. **Al agregar una sección nueva, seguí ese patrón**: eager sólo lo que entra en el primer viewport.

Todo cuelga de `ErrorBoundary` → `ConfigProvider` (tema antd: `colorPrimary: #7C0B2B`, `borderRadius: 10`) → `Router`.

### Contenido dirigido por datos (`src/db/`)
- `data.js` — export default con `profile`, `projects`, `skills`, `certifications`, `companies`. Los ítems usan `uuidv4()` como `id`. `profile.email` es a la vez el destinatario del formulario de contacto.
- `me.json` — `socialMedia` y `websites` que consume `/me`.

**No hardcodees contenido en los componentes**: agregá o editá el objeto en `src/db/` y el componente lo renderiza. Algunos strings de `data.js` contienen HTML (`<strong>`) y se inyectan con `dangerouslySetInnerHTML`.

### Iconos: indirección por nombre (`src/utils/iconMap.js`)
Los datos referencian iconos por string (`"LinkedinOutlined"`), y `DynamicIcon` los resuelve contra `iconMap`. **Un icono nuevo en `data.js`/`me.json` requiere importarlo y registrarlo en `iconMap.js`**, si no `DynamicIcon` emite un `console.warn` y no renderiza nada.

### Animación de scroll: contrato `data-reveal` (`src/utils/useScrollReveal.js`)
El hook se invoca una vez por página y observa **todo el DOM** vía `IntersectionObserver` + `MutationObserver` (necesario porque las secciones `lazy` se montan después). Para animar un elemento alcanza con marcarlo:

```jsx
<div data-reveal="up|left|right|scale" data-delay="150">
```

Los estilos base viven en `index.css` (`[data-reveal]` / `.revealed`). El hook aplica el `transform` inicial por JS; varios componentes además setean un `style={{ transform: ... }}` inline para evitar el flash. No hace falta ningún hook ni wrapper por componente.

### Estilos: tokens CSS + CSS por componente
- `src/index.css` define **todos** los tokens en `:root` (paleta borgoña/coral, gradientes `--proj-grad-N`, fuentes) y reglas globales, incluido el bloque `prefers-reduced-motion`.
- Cada componente importa su propio `.css` hermano (`Hero.jsx` → `Hero.css`) con clases planas prefijadas por componente (`hero-b-*`, `me-*`, `interview-*`). No hay CSS Modules.
- **Regla del proyecto: nada de colores hardcodeados en JS ni en CSS de componente — usá las variables de `:root`.** Para opacidades existen las variantes `--*-rgb` para usar con `rgba(var(--x-rgb), .16)`.
- Tailwind v4 está instalado y compila (`postcss.config.js` + directivas `@tailwind` en `index.css`), pero **el código no usa clases utilitarias**: no introduzcas estilado Tailwind sin acordarlo, rompería la consistencia.
- antd se usa puntualmente (`Button`, `Modal`, `Tooltip`, `Result`), no como sistema de diseño.

### SEO: dos fuentes que hay que mantener sincronizadas
1. `index.html` — meta estáticos, Open Graph, Twitter Card y JSON-LD `Person` con el dominio **absoluto** hardcodeado.
2. `src/components/SEO.jsx` — meta dinámicos por ruta vía `react-helmet-async`; el dominio vive en la constante `siteUrl`.

Un cambio de dominio obliga a tocar `index.html`, `SEO.jsx`, `public/sitemap.xml` y `public/robots.txt`.

### Formulario de contacto
`ContactForm.jsx` postea a `https://formsubmit.co/ajax/{profile.email}` sin backend propio. Valida en cliente, mueve el foco al primer campo con error y bloquea el doble envío con `loading`. El test lo mockea con `global.fetch = vi.fn()`.

## Testing

`vitest.config.js`: `globals: true`, entorno `jsdom`, setup en `src/test/setup.js` (que provee `@testing-library/jest-dom`, `cleanup` automático y stubs de `matchMedia`, `IntersectionObserver` y `ResizeObserver` — sin esos stubs cualquier componente con scroll reveal explota). Tests en `src/components/__tests__/`, escritos en español con React Testing Library y consultas por rol/label.

## Deploy

Netlify (`netlify.toml`): build `npm run build` → `dist`, Node 20, redirect SPA `/* → /index.html 200`, headers de seguridad y cache inmutable para `/assets/*`. `public/` se copia tal cual (incluye `CV-cecilia.pdf`, `sitemap.xml`, `robots.txt`, `llms.txt`, `_redirects`).

## Directorios que no se editan a mano

`dist/`, `ds-bundle/`, `.ds-sync/` y `.design-sync/` son artefactos generados y están en `.gitignore` (`ds-bundle/` es el bundle del design system exportado desde este mismo código). En `.agents/skills/` viven skills de referencia (`animate`, `vercel-react-best-practices` con 57 reglas de performance en `rules/`) — son documentación consultable, no código de la app.
