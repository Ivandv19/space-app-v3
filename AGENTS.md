# Space App V3 — Rules

Eres un experto en React 19 + Vite. Cuando trabajes en este proyecto, sigue estas reglas.

## Core Principles

1. **JSX + SWC**: Componentes en `src/` con extensión `.jsx`, compilados con `@vitejs/plugin-react-swc`
2. **Styled Components**: Toda la UI con `styled-components` v6, sin CSS modules ni Tailwind
3. **Framer Motion**: Animaciones con `motion` components (no CSS animations)
4. **React Router v7**: `BrowserRouter` + `Routes` en `routes.jsx` (Outlet anidado en App)
5. **Context + useReducer**: Estado global via `GlobalContext.jsx`, no Redux/Zustand
6. **Linter/Formatter**: Biome con tabs y double quotes (`bun run lint`, `bun run format`)
7. **Runtime**: Bun (usar `bun` para todo: install, dev, build, lint, format)

## Code Validation

| Comando | Descripción |
|---------|-------------|
| `bun run dev` | Dev server (Vite) |
| `bun run build` | Build producción |
| `bun run preview` | Preview del build |
| `bun run lint` | Biome lint |
| `bun run format` | Biome format |
| `bun run check` | Biome check completo (lint + format + organize imports) |

## Project Structure

```
src/
├── components/
│   ├── Footer/Footer.jsx
│   ├── Globalstyleds/Globalstyleds.jsx
│   ├── Header/Header.jsx, Navbar.jsx, Sidebar.jsx
│   └── ScrollToTop/ScrolltoTop.jsx
├── context/GlobalContext.jsx
├── data/noticias.js, sistemaSolar.js
├── hooks/useCarousel.jsx, useOrderByLikes.jsx, useRandomLikes.jsx
├── Pages/
│   ├── Galeria/Galería.jsx, Titulo.jsx
│   ├── Inicio/Inicio.jsx, HeroSection.jsx, FeaturesSection.jsx, FeatureCard.jsx, Carousel.jsx
│   ├── Noticias/Noticias.jsx, Noticia.jsx
│   └── SistemaSolar/SistemaSolar.jsx, Carousel.jsx, Navbar.jsx
├── App.jsx, App.css
├── index.css, main.jsx
└── routes.jsx
```

## API Endpoints

| Endpoint | Uso |
|----------|-----|
| `https://api.nasa.gov/planetary/apod?api_key=...` | Imagen astronómica del día |
| `https://api.nasa.gov/planetary/apod?api_key=...&count=15` | Galería de imágenes |

## Env Variables

| Variable | Descripción |
|----------|-------------|
| `VITE_NASA_API_KEY` | API Key de NASA API (get en https://api.nasa.gov/) |

## Routing

| Ruta | Página |
|------|--------|
| `/` | Inicio (Hero + Carousel + Features) |
| `/galería-espacial` | Galería de imágenes NASA |
| `/noticias` | Lista de noticias |
| `/noticias/:slug` | Detalle de noticia |
| `/sistema-solar` | Sistema Solar con carrusel por categoría |

## Coding Conventions

### Page Component Pattern
```jsx
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  /* styles */
`;

function MiPagina() {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* content */}
    </Container>
  );
}

export default MiPagina;
```

### Styled Components + Framer Motion
- Componentes animados: `styled(motion.div)`, `styled(motion.section)`, etc.
- Variants de Framer Motion definidas fuera del componente (const)
- `AnimatePresence` para animaciones de entrada/salida

### Context Pattern
- Provider en `main.jsx` envolviendo `BrowserRouter`
- `useGlobalContext()` hook personalizado
- `useReducer` para estados con lógica compleja (likes, saves)
- `useState` para data fetching simple

### Data Fetching
- Fetch nativo (no axios, no react-query)
- `useEffect` con función async interna
- `try/catch` con `console.log` en error
- URLs con `import.meta.env.VITE_*` para variables de entorno

## Data Sources

| Fuente | Tipo | Archivo |
|--------|------|---------|
| NASA APOD API | Externa (fetch) | GlobalContext.jsx |
| Noticias | Local | `src/data/noticias.js` |
| Sistema Solar | Local | `src/data/sistemaSolar.js` |

## Hooks

| Hook | Propósito |
|------|-----------|
| `useCarousel` | Navegación de carrusel (prev/next, dots) |
| `useOrderByLikes` | Ordenar imágenes por likes |
| `useRandomLikes` | Asignar likes aleatorios iniciales |

## Design System

| Rol | Color | Uso |
|-----|-------|-----|
| Fondo principal | `#0d0d1a` | Header, Hero, Stats, Features, CTA, Footer |
| Fondo secundario | `#1a1a2e` | FeaturedContent, cards |
| Superficie | `rgba(255,255,255,0.05)` | Cards, contenedores |
| **Acento** | **`#7c6af7`** | CTAs, números, hover, links activos |
| Acento hover | `#8b7bf9` | Hover de botones |
| Texto primario | `#ffffff` | Títulos, nav |
| Texto secundario | `#a0a0b8` | Subtítulos, descripciones |

### Typography

| Rol | Font | Weight |
|-----|------|--------|
| Títulos (h1-h4) | Outfit | Bold (700) |
| Body, nav, botones | Outfit | Regular (400) |

Tokens centralizados en `src/styles/tokens.js`

## Known Conventions

- `console.log()` para debugging (no console.error/console.warn)
- Likes y saves en estado global (Context), no persistidos
- Sin tests aún (pendiente implementar)
- Deploy a Cloudflare Pages via wrangler
- `bunfig.toml` con `[install] scripts = false`
