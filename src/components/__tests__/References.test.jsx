import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import References from "../References";
import Navbar from "../Navbar";
import { resetReferencesCache } from "../../services/referencesApi";

global.fetch = vi.fn();

// Datos ficticios con la forma de GET /api/public/references
const apiResponse = (data) => ({
  ok: true,
  json: async () => ({ success: true, count: data.length, data }),
});

const referenciaComun = {
  id: "ref-1",
  firstName: "Laura",
  lastName: "Pérez",
  role: "peer",
  linkedin: "https://www.linkedin.com/in/laura-perez-ejemplo/",
  recommendation: "Trabajar con ella fue muy ordenado.",
  isFeatured: false,
  createdAt: "2026-10-20T12:00:00.000Z",
};

const referenciaDestacada = {
  id: "ref-2",
  firstName: "Martín",
  lastName: "Gómez",
  role: "employer",
  linkedin: null,
  recommendation: "Una profesional excelente.",
  isFeatured: true,
  createdAt: "2026-09-01T12:00:00.000Z",
};

describe("References", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetReferencesCache();
    vi.stubEnv("VITE_REFERENCES_API_URL", "https://api.ejemplo.test/api");
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("renderiza las referencias publicadas con la destacada primero", async () => {
    global.fetch.mockResolvedValueOnce(apiResponse([referenciaComun, referenciaDestacada]));
    render(<References />);

    expect(await screen.findByRole("heading", { name: /referencias/i })).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.ejemplo.test/api/public/references",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );

    const citas = screen.getAllByRole("figure");
    expect(citas).toHaveLength(2);
    expect(citas[0]).toHaveTextContent("Martín Gómez");
    expect(citas[0]).toHaveClass("references-card--featured");
    expect(citas[1]).toHaveTextContent("Laura Pérez");
  });

  it("muestra la etiqueta del rol", async () => {
    global.fetch.mockResolvedValueOnce(apiResponse([referenciaComun, referenciaDestacada]));
    render(<References />);

    expect(await screen.findByText("Compañero")).toBeInTheDocument();
    expect(screen.getByText("Empleador")).toBeInTheDocument();
  });

  it("enlaza LinkedIn sólo si la URL es un perfil https de LinkedIn", async () => {
    const conUrlAjena = {
      ...referenciaDestacada,
      id: "ref-3",
      linkedin: "javascript:alert(1)",
    };
    global.fetch.mockResolvedValueOnce(apiResponse([referenciaComun, conUrlAjena]));
    render(<References />);

    const link = await screen.findByRole("link", { name: /linkedin de laura pérez/i });
    expect(link).toHaveAttribute("href", referenciaComun.linkedin);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("no renderiza nada si no hay referencias publicadas", async () => {
    global.fetch.mockResolvedValueOnce(apiResponse([]));
    const { container } = render(<References />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });

  it("no renderiza nada si la API falla", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));
    const { container } = render(<References />);

    await waitFor(() => expect(console.warn).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it("no hace fetch si falta la variable de entorno", async () => {
    vi.stubEnv("VITE_REFERENCES_API_URL", "");
    const { container } = render(<References />);

    await waitFor(() => expect(container).toBeEmptyDOMElement());
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

describe("Navbar con referencias", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetReferencesCache();
    vi.stubEnv("VITE_REFERENCES_API_URL", "https://api.ejemplo.test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const renderNavbar = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

  it("muestra el link Referencias cuando hay referencias publicadas", async () => {
    global.fetch.mockResolvedValueOnce(apiResponse([referenciaComun]));
    renderNavbar();

    expect(await screen.findByRole("link", { name: "Referencias" })).toHaveAttribute(
      "href",
      "#referencias"
    );
    // La URL sin /api se completa igual que en el portal
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.ejemplo.test/api/public/references",
      expect.anything()
    );
  });

  it("no muestra el link Referencias si no hay referencias", async () => {
    global.fetch.mockResolvedValueOnce(apiResponse([]));
    renderNavbar();

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.queryByRole("link", { name: "Referencias" })).not.toBeInTheDocument();
  });
});
