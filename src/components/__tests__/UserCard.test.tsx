import type { GitHubUser } from "@/types";
import { render, screen } from "@testing-library/react";
import { UserCard } from "../UserCard";

const mockUser: GitHubUser = {
  login: "testuser",
  id: 1,
  node_id: "test",
  avatar_url: "https://example.com/avatar.jpg",
  gravatar_id: "",
  url: "https://api.github.com/users/testuser",
  html_url: "https://github.com/testuser",
  followers_url: "https://api.github.com/users/testuser/followers",
  following_url: "https://api.github.com/users/testuser/following{/other_user}",
  gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
  starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
  organizations_url: "https://api.github.com/users/testuser/orgs",
  repos_url: "https://api.github.com/users/testuser/repos",
  events_url: "https://api.github.com/users/testuser/events{/privacy}",
  received_events_url: "https://api.github.com/users/testuser/received_events",
  type: "User",
  user_view_type: "User",
  site_admin: false,
  score: 1.0,
};

describe("UserCard", () => {
  it("renders user login name", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("renders user avatar fallback", () => {
    render(<UserCard user={mockUser} />);

    // The Avatar component shows a fallback with the first letter
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("renders user handle", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("@testuser")).toBeInTheDocument();
  });

  it("renders user link", () => {
    render(<UserCard user={mockUser} />);

    const link = screen.getByRole("link", { name: /view profile/i });
    expect(link).toHaveAttribute("href", "https://github.com/testuser");
  });

  it("handles organization user type", () => {
    const orgUser = { ...mockUser, type: "Organization" };
    render(<UserCard user={orgUser} />);

    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("handles site admin user", () => {
    const adminUser = { ...mockUser, site_admin: true };
    render(<UserCard user={adminUser} />);

    // Should still render the user information
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("handles different user view types", () => {
    const differentViewType = { ...mockUser, user_view_type: "Organization" };
    render(<UserCard user={differentViewType} />);

    // Should still render the user information
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("renders with correct CSS classes", () => {
    render(<UserCard user={mockUser} />);

    const card = screen.getByTestId("user-card");
    expect(card).toHaveClass("hover:shadow-md", "transition-shadow");
  });

  it("renders user info with correct structure", () => {
    render(<UserCard user={mockUser} />);

    // Check that the user name is rendered
    expect(screen.getByText("testuser")).toBeInTheDocument();

    // Check that the user handle is rendered
    expect(screen.getByText("@testuser")).toBeInTheDocument();
  });

  it("handles user with different login name", () => {
    const differentUser = { ...mockUser, login: "anotheruser" };
    render(<UserCard user={differentUser} />);

    expect(screen.getByText("anotheruser")).toBeInTheDocument();
    expect(screen.queryByText("testuser")).not.toBeInTheDocument();
  });

  it("handles user with different profile URL", () => {
    const differentProfile = {
      ...mockUser,
      html_url: "https://github.com/differentuser",
    };
    render(<UserCard user={differentProfile} />);

    const link = screen.getByRole("link", { name: /view profile/i });
    expect(link).toHaveAttribute("href", "https://github.com/differentuser");
  });
});
