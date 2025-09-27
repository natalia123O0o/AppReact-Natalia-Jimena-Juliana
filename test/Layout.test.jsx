import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../src/components/layout/Layout"; // ajusta la ruta real
import Header from "../src/components/layout/Header";

// Mock del Header (para no depender de su lógica interna aquí)
jest.mock("../src/components/layout/Header", () => () => <div data-testid="mock-header">MockHeader</div>);

describe("Layout", () => {
  test("renderiza el Header", () => {
    render(<Layout>Contenido de prueba</Layout>);
    
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
  });

  test("renderiza los children dentro de main", () => {
    render(
      <Layout>
        <p>Contenido de prueba</p>
      </Layout>
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });
});
