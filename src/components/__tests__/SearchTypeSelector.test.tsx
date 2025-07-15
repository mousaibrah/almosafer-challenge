import { fireEvent, render, screen } from "@testing-library/react";
import { SearchTypeSelector } from "../SearchTypeSelector";

describe("SearchTypeSelector", () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    value: "repositories" as const,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with repositories selected by default", () => {
    render(<SearchTypeSelector {...defaultProps} />);

    const repositoriesButton = screen.getByRole("button", {
      name: /repositories/i,
    });
    const usersButton = screen.getByRole("button", { name: /users/i });

    expect(repositoriesButton).toBeInTheDocument();
    expect(usersButton).toBeInTheDocument();

    // Repositories should be selected (default variant)
    expect(repositoriesButton).toHaveClass(
      "bg-primary",
      "text-primary-foreground"
    );
    expect(usersButton).toHaveClass("border", "bg-background");
  });

  it("renders with users selected when value is users", () => {
    render(<SearchTypeSelector {...defaultProps} value="users" />);

    const repositoriesButton = screen.getByRole("button", {
      name: /repositories/i,
    });
    const usersButton = screen.getByRole("button", { name: /users/i });

    // Users should be selected (default variant)
    expect(usersButton).toHaveClass("bg-primary", "text-primary-foreground");
    expect(repositoriesButton).toHaveClass("border", "bg-background");
  });

  it("calls onChange when repositories button is clicked", () => {
    render(<SearchTypeSelector {...defaultProps} value="users" />);

    const repositoriesButton = screen.getByRole("button", {
      name: /repositories/i,
    });
    fireEvent.click(repositoriesButton);

    expect(mockOnChange).toHaveBeenCalledWith("repositories");
  });

  it("calls onChange when users button is clicked", () => {
    render(<SearchTypeSelector {...defaultProps} />);

    const usersButton = screen.getByRole("button", { name: /users/i });
    fireEvent.click(usersButton);

    expect(mockOnChange).toHaveBeenCalledWith("users");
  });

  it("has correct button text", () => {
    render(<SearchTypeSelector {...defaultProps} />);

    expect(screen.getByText("Repositories")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("applies correct CSS classes to container", () => {
    render(<SearchTypeSelector {...defaultProps} />);

    const container =
      screen.getByText("Repositories").parentElement?.parentElement;
    expect(container).toHaveClass("flex", "gap-2");
  });

  it("applies correct CSS classes to buttons", () => {
    render(<SearchTypeSelector {...defaultProps} />);

    const repositoriesButton = screen.getByRole("button", {
      name: /repositories/i,
    });
    const usersButton = screen.getByRole("button", { name: /users/i });

    // Both buttons should have base classes
    expect(repositoriesButton).toHaveClass("flex", "items-center", "gap-2");
    expect(usersButton).toHaveClass("flex", "items-center", "gap-2");
  });

  it("handles multiple clicks correctly", () => {
    render(<SearchTypeSelector {...defaultProps} />);

    const repositoriesButton = screen.getByRole("button", {
      name: /repositories/i,
    });
    const usersButton = screen.getByRole("button", { name: /users/i });

    // Click users button
    fireEvent.click(usersButton);
    expect(mockOnChange).toHaveBeenCalledWith("users");

    // Click repositories button
    fireEvent.click(repositoriesButton);
    expect(mockOnChange).toHaveBeenCalledWith("repositories");

    // Click users button again
    fireEvent.click(usersButton);
    expect(mockOnChange).toHaveBeenCalledWith("users");

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});
