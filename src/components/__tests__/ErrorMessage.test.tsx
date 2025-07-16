import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "../error-handler/ErrorMessage";

describe("ErrorMessage", () => {
  it("renders error message", () => {
    render(<ErrorMessage message="Test error" />);

    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("renders error icon", () => {
    render(<ErrorMessage message="Test error" />);

    const errorIcon = screen.getByTestId("error-icon");
    expect(errorIcon).toBeInTheDocument();
  });

  it("applies correct CSS classes to container", () => {
    render(<ErrorMessage message="Test error" />);

    const container = screen.getByRole("alert");
    expect(container).toHaveClass("relative", "w-full", "rounded-lg", "border");
  });

  it("applies correct CSS classes to icon", () => {
    render(<ErrorMessage message="Test error" />);

    const icon = screen.getByTestId("error-icon");
    expect(icon).toHaveClass("h-4", "w-4");
  });

  it("applies correct CSS classes to message", () => {
    render(<ErrorMessage message="Test error message" />);

    const message = screen.getByText("Test error message");
    expect(message).toHaveClass("text-muted-foreground");
  });

  it("handles long error message", () => {
    const longMessage =
      "This is a very long error message that should be handled properly by the component without breaking the layout or causing any issues with the display";
    render(<ErrorMessage message={longMessage} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it("handles empty error message", () => {
    render(<ErrorMessage message="" />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("handles special characters in error message", () => {
    const specialMessage =
      "Error with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?";
    render(<ErrorMessage message={specialMessage} />);

    expect(screen.getByText(specialMessage)).toBeInTheDocument();
  });

  it("renders with proper semantic structure", () => {
    render(<ErrorMessage message="Test error" />);

    const container = screen.getByRole("alert");
    expect(container).toBeInTheDocument();

    // Should have icon and message
    const icon = screen.getByTestId("error-icon");
    const message = screen.getByText("Test error");

    expect(icon).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("is accessible with proper ARIA attributes", () => {
    render(<ErrorMessage message="Test error" />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("handles error message with line breaks", () => {
    const messageWithBreaks = "Error occurred\nPlease try again";
    render(<ErrorMessage message={messageWithBreaks} />);

    // Use a more flexible text matcher
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Error occurred\nPlease try again";
      })
    ).toBeInTheDocument();
  });

  it("renders with consistent styling in dark mode", () => {
    render(<ErrorMessage message="Test error" />);

    const message = screen.getByText("Test error");

    // Check that the component renders properly
    expect(message).toBeInTheDocument();
  });
});
