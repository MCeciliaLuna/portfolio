import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

// Mock de fetch
global.fetch = vi.fn();

describe("ContactForm", () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    vi.clearAllMocks();
  });

  it("renderiza el formulario correctamente", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("muestra errores de validación cuando se envía vacío", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ingresa tu nombre/i)).toBeInTheDocument();
      expect(screen.getByText(/ingresa tu email/i)).toBeInTheDocument();
      expect(screen.getByText(/ingresa tu mensaje/i)).toBeInTheDocument();
    });
  });

  it("envía el formulario correctamente con datos válidos", async () => {
    const user = userEvent.setup();
    const mockOnSuccess = vi.fn();

    // Mock de respuesta exitosa
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm onSuccess={mockOnSuccess} />);

    // Llenar el formulario
    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/email/i), "juan@example.com");
    await user.type(
      screen.getByLabelText(/mensaje/i),
      "Este es un mensaje de prueba"
    );

    // Enviar
    const submitButton = screen.getByRole("button", { name: /enviar/i });
    await user.click(submitButton);

    // Verificar que se llamó a fetch
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Verificar mensaje de éxito
    await waitFor(
      () => {
        expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("muestra error cuando falla el envío", async () => {
    const user = userEvent.setup();

    // Mock de respuesta con error
    global.fetch.mockRejectedValueOnce(new Error("Error de red"));

    render(<ContactForm />);

    // Llenar el formulario
    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/email/i), "juan@example.com");
    await user.type(screen.getByLabelText(/mensaje/i), "Test mensaje");

    // Enviar
    const submitButton = screen.getByRole("button", { name: /enviar/i });
    await user.click(submitButton);

    // Verificar mensaje de error
    await waitFor(
      () => {
        expect(screen.getByText(/ocurrió un error/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("permite copiar el email cuando hay error", async () => {
    const user = userEvent.setup();

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    // Mock de respuesta con error
    global.fetch.mockRejectedValueOnce(new Error("Error"));

    render(<ContactForm />);

    // Llenar y enviar formulario
    await user.type(screen.getByLabelText(/nombre/i), "Test");
    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/mensaje/i), "Test");
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    // Esperar a que aparezca el botón de copiar
    const copyButton = await screen.findByRole("button", {
      name: /copiar email/i,
    });
    await user.click(copyButton);

    // Verificar que se intentó copiar
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("deshabilita el botón cuando está cargando", async () => {
    const user = userEvent.setup();

    // Mock que tarda en resolver
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ success: true }),
              }),
            100
          )
        )
    );

    render(<ContactForm />);

    // Llenar formulario
    await user.type(screen.getByLabelText(/nombre/i), "Test");
    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/mensaje/i), "Test");

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    await user.click(submitButton);

    // El botón debería estar deshabilitado mientras carga
    expect(submitButton).toBeDisabled();
  });

  it("limpia el formulario después del envío exitoso", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/mensaje/i);

    // Llenar formulario
    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");
    await user.type(messageInput, "Test message");

    // Verificar que los campos tienen valores
    expect(nameInput).toHaveValue("Test User");

    // Enviar
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    // Verificar que los campos se limpiaron
    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(messageInput).toHaveValue("");
    });
  });
});
