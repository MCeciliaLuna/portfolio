import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Suspense, lazy } from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { resetReferencesCache } from "../../services/referencesApi";

// IntersectionObserver controlable: guarda qué elementos observa cada instancia
// para poder simular que una sección entra en la franja de lectura.
let observadores = [];

class IntersectionObserverFalso {
  constructor(callback) {
    this.callback = callback;
    this.elementos = new Set();
    observadores.push(this);
  }
  observe(el) {
    this.elementos.add(el);
  }
  unobserve(el) {
    this.elementos.delete(el);
  }
  disconnect() {
    this.elementos.clear();
  }
  takeRecords() {
    return [];
  }
}

const intersectar = (id) => {
  const el = document.getElementById(id);
  const observador = observadores.find((o) => o.elementos.has(el));
  if (!observador) {
    throw new Error(`La sección #${id} no está observada`);
  }
  act(() => {
    observador.callback([{ target: el, isIntersecting: true }]);
  });
};

// Imita el patrón de PortfolioPage: secciones con React.lazy que se montan
// después del Navbar. Se crea un lazy nuevo por test porque React cachea el
// módulo resuelto y, si se reutiliza, las secciones montarían de forma síncrona.
const crearSeccionesLazy = () =>
  lazy(() =>
    Promise.resolve({
      default: () => (
        <>
          <section id="certificaciones">Certificaciones</section>
          <section id="skills">Skills</section>
          <section id="proyectos">Proyectos</section>
          <section id="entrevista">Entrevista</section>
        </>
      ),
    })
  );

const renderPagina = () => {
  const SeccionesLazy = crearSeccionesLazy();
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Navbar />
      <main>
        <section id="inicio">Inicio</section>
        <section id="sobre">Sobre mí</section>
        <Suspense fallback={null}>
          <SeccionesLazy />
        </Suspense>
      </main>
    </MemoryRouter>
  );
};

describe("Navbar: link de la sección activa", () => {
  beforeEach(() => {
    observadores = [];
    resetReferencesCache();
    // Sin URL de la API: no hay fetch y el link Referencias no se muestra
    vi.stubEnv("VITE_REFERENCES_API_URL", "");
    vi.stubGlobal("IntersectionObserver", IntersectionObserverFalso);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("resalta las secciones eager al hacer scroll", async () => {
    renderPagina();
    await screen.findByText("Proyectos", { selector: "section" });

    intersectar("sobre");

    expect(screen.getByRole("link", { name: "Sobre mí" })).toHaveClass("active");
    expect(screen.getByRole("link", { name: "Inicio" })).not.toHaveClass("active");
  });

  it("resalta las secciones lazy que se montan después del Navbar", async () => {
    renderPagina();
    await screen.findByText("Proyectos", { selector: "section" });

    for (const [id, nombre] of [
      ["certificaciones", "Certificaciones"],
      ["skills", "Skills"],
      ["proyectos", "Proyectos"],
      ["entrevista", "Entrevista"],
    ]) {
      intersectar(id);
      expect(screen.getByRole("link", { name: nombre })).toHaveClass("active");
      expect(screen.getByRole("link", { name: "Sobre mí" })).not.toHaveClass("active");
    }
  });
});
