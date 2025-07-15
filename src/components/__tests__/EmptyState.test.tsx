import { render, screen } from "@testing-library/react";
import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  const defaultProps = {
    title: "No results found",
    description: "Try adjusting your search criteria",
  };

  it("renders title and description", () => {
    render(<EmptyState {...defaultProps} />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search criteria")
    ).toBeInTheDocument();
  });

  it("renders with different title and description", () => {
    render(
      <EmptyState
        title="Start searching"
        description="Enter a query to begin"
      />
    );

    expect(screen.getByText("Start searching")).toBeInTheDocument();
    expect(screen.getByText("Enter a query to begin")).toBeInTheDocument();
  });

  it("renders with search icon", () => {
    render(<EmptyState {...defaultProps} />);

    const searchIcon = screen.getByRole("img", { hidden: true });
    expect(searchIcon).toBeInTheDocument();
  });

  it("applies correct CSS classes to container", () => {
    render(<EmptyState {...defaultProps} />);

    const container = screen.getByTestId("empty-state");
    expect(container).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "py-12",
      "text-center"
    );
  });

  it("applies correct CSS classes to icon container", () => {
    render(<EmptyState {...defaultProps} />);

    const iconContainer = screen
      .getByTestId("empty-state")
      .querySelector("div");
    expect(iconContainer).toHaveClass("w-16", "h-16", "mb-4", "text-gray-400");
  });

  it("applies correct CSS classes to title", () => {
    render(<EmptyState {...defaultProps} />);

    const title = screen.getByText("No results found");
    expect(title).toHaveClass(
      "text-xl",
      "font-semibold",
      "text-gray-900",
      "dark:text-white",
      "mb-2"
    );
  });

  it("applies correct CSS classes to description", () => {
    render(<EmptyState {...defaultProps} />);

    const description = screen.getByText("Try adjusting your search criteria");
    expect(description).toHaveClass("text-gray-600", "dark:text-gray-400");
  });

  it("handles long title and description", () => {
    const longTitle =
      "This is a very long title that might wrap to multiple lines";
    const longDescription =
      "This is a very long description that provides detailed information about what the user should do next and might also wrap to multiple lines";

    render(<EmptyState title={longTitle} description={longDescription} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it("handles empty title and description", () => {
    render(<EmptyState title="" description="" />);

    expect(screen.getByText("")).toBeInTheDocument();
  });

  it("handles special characters in title and description", () => {
    const specialTitle = 'Results for "test@example.com"';
    const specialDescription =
      'No results found for query: <script>alert("test")</script>';

    render(
      <EmptyState title={specialTitle} description={specialDescription} />
    );

    expect(screen.getByText(specialTitle)).toBeInTheDocument();
    expect(screen.getByText(specialDescription)).toBeInTheDocument();
  });

  it("renders with proper semantic structure", () => {
    render(<EmptyState {...defaultProps} />);

    const container = screen.getByTestId("empty-state");
    expect(container).toBeInTheDocument();

    // Should have icon, title, and description in order
    const icon = container.querySelector("div");
    const title = container.querySelector("h2");
    const description = container.querySelector("p");

    expect(icon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("is accessible with proper heading structure", () => {
    render(<EmptyState {...defaultProps} />);

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent("No results found");
  });
});
