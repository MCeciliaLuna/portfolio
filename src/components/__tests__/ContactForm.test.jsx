import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

global.fetch = vi.fn();

describe("ContactForm", () => {
  beforeEach(() => {
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

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/email/i), "juan@example.com");
    await user.type(
      screen.getByLabelText(/mensaje/i),
      "Este es un mensaje de prueba"
    );

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    await waitFor(
      () => {
        expect(screen.getByText(/¡Mensaje Enviado!/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("muestra error cuando falla el envío", async () => {
    const user = userEvent.setup();

    global.fetch.mockRejectedValueOnce(new Error("Error de red"));

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/email/i), "juan@example.com");
    await user.type(screen.getByLabelText(/mensaje/i), "Test mensaje");

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText(/ocurrió un error/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("permite copiar el email cuando hay error", async () => {
    const user = userEvent.setup();

    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      writable: true,
      configurable: true,
    });

    global.fetch.mockRejectedValueOnce(new Error("Error"));

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nombre/i), "Test");
    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/mensaje/i), "Test");
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/Ups, ocurrió un error/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const copyButton = await screen.findByText(/copiar email/i);
    await user.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("deshabilita el botón cuando está cargando", async () => {
    const user = userEvent.setup();

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

    await user.type(screen.getByLabelText(/nombre/i), "Test");
    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/mensaje/i), "Test");

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    await user.click(submitButton);

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

    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");
    await user.type(messageInput, "Test message");

    expect(nameInput).toHaveValue("Test User");

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    await waitFor(
      () => {
        expect(screen.getByLabelText(/nombre/i)).toHaveValue("");
        expect(screen.getByLabelText(/email/i)).toHaveValue("");
        expect(screen.getByLabelText(/mensaje/i)).toHaveValue("");
      },
      { timeout: 3000 }
    );
  });
});
