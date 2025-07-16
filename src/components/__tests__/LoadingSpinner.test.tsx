import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "../loading/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders loading spinner", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders with loading text", () => {
    render(<LoadingSpinner />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("applies correct CSS classes to container", () => {
    render(<LoadingSpinner />);

    const container = screen.getByText("Loading...").parentElement;
    expect(container).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "py-8"
    );
  });

  it("applies correct CSS classes to spinner", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toHaveClass("w-8", "h-8", "animate-spin", "text-gray-500");
  });

  it("applies correct CSS classes to text", () => {
    render(<LoadingSpinner />);

    const text = screen.getByText("Loading...");
    expect(text).toHaveClass("ml-2", "text-gray-600");
  });

  it("renders with proper semantic structure", () => {
    render(<LoadingSpinner />);

    const container = screen.getByText("Loading...").parentElement;
    expect(container).toBeInTheDocument();

    // Should have spinner and text
    const spinner = screen.getByTestId("loading-spinner");
    const text = screen.getByText("Loading...");

    expect(spinner).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("has proper animation classes", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toHaveClass("animate-spin");
  });

  it("has proper size classes", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toHaveClass("w-8", "h-8");
  });

  it("renders with proper spacing", () => {
    render(<LoadingSpinner />);

    const container = screen.getByText("Loading...").parentElement;
    const text = screen.getByText("Loading...");

    expect(container).toHaveClass("py-8");
    expect(text).toHaveClass("ml-2");
  });

  it("is accessible with screen readers", () => {
    render(<LoadingSpinner />);

    // Should have descriptive text
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
