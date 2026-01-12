import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render without crashing", () => {
    render(<App />);
    expect(screen.getByText("Todo App")).toBeInTheDocument();
  });

  it("should render the header", () => {
    render(<App />);
    const header = screen.getByRole("heading", { name: /todo app/i });
    expect(header).toBeInTheDocument();
  });
});
