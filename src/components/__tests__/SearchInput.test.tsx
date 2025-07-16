import { fireEvent, render, screen } from "@testing-library/react";
import { SearchInput } from "../search-services/SearchInput";

describe("SearchInput", () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    value: "",
    onChange: mockOnChange,
    placeholder: "Search repositories...",
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with correct placeholder", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search repositories...");
    expect(input).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    render(<SearchInput {...defaultProps} value="test query" />);

    const input = screen.getByDisplayValue("test query");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when user types", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search repositories...");
    fireEvent.change(input, { target: { value: "new query" } });

    expect(mockOnChange).toHaveBeenCalledWith("new query");
  });

  it("renders search icon", () => {
    render(<SearchInput {...defaultProps} />);

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });

  it("has correct input type", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search repositories...");
    expect(input).toHaveAttribute("type", "text");
  });

  it("applies correct CSS classes", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search repositories...");
    expect(input).toHaveClass("pl-10", "h-12", "text-lg");
  });
});
