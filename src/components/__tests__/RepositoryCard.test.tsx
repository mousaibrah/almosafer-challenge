import type { GitHubRepository } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { RepositoryCard } from "../RepositoryCard";

// Mock the useFetchData hook
jest.mock("@/api/useApi", () => ({
  useFetchData: jest.fn(() => ({
    isLoading: false,
    error: null,
  })),
}));

const mockRepository: GitHubRepository = {
  id: 1,
  node_id: "test",
  name: "test-repo",
  full_name: "testuser/test-repo",
  private: false,
  owner: {
    login: "testuser",
    id: 1,
    node_id: "test",
    avatar_url: "https://example.com/avatar.jpg",
    gravatar_id: "",
    url: "https://api.github.com/users/testuser",
    html_url: "https://github.com/testuser",
    followers_url: "https://api.github.com/users/testuser/followers",
    following_url:
      "https://api.github.com/users/testuser/following{/other_user}",
    gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
    starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
    organizations_url: "https://api.github.com/users/testuser/orgs",
    repos_url: "https://api.github.com/users/testuser/repos",
    events_url: "https://api.github.com/users/testuser/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/testuser/received_events",
    type: "User",
    site_admin: false,
    user_view_type: "",
  },
  html_url: "https://github.com/testuser/test-repo",
  description: "Test repository description",
  fork: false,
  url: "https://api.github.com/repos/testuser/test-repo",
  forks_url: "https://api.github.com/repos/testuser/test-repo/forks",
  keys_url: "https://api.github.com/repos/testuser/test-repo/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/testuser/test-repo/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/testuser/test-repo/teams",
  hooks_url: "https://api.github.com/repos/testuser/test-repo/hooks",
  issue_events_url:
    "https://api.github.com/repos/testuser/test-repo/issues/events{/number}",
  events_url: "https://api.github.com/repos/testuser/test-repo/events",
  assignees_url:
    "https://api.github.com/repos/testuser/test-repo/assignees{/user}",
  branches_url:
    "https://api.github.com/repos/testuser/test-repo/branches{/branch}",
  tags_url: "https://api.github.com/repos/testuser/test-repo/tags",
  blobs_url: "https://api.github.com/repos/testuser/test-repo/git/blobs{/sha}",
  git_tags_url:
    "https://api.github.com/repos/testuser/test-repo/git/tags{/sha}",
  git_refs_url:
    "https://api.github.com/repos/testuser/test-repo/git/refs{/sha}",
  trees_url: "https://api.github.com/repos/testuser/test-repo/git/trees{/sha}",
  statuses_url:
    "https://api.github.com/repos/testuser/test-repo/statuses/{sha}",
  languages_url: "https://api.github.com/repos/testuser/test-repo/languages",
  stargazers_url: "https://api.github.com/repos/testuser/test-repo/stargazers",
  contributors_url:
    "https://api.github.com/repos/testuser/test-repo/contributors",
  subscribers_url:
    "https://api.github.com/repos/testuser/test-repo/subscribers",
  subscription_url:
    "https://api.github.com/repos/testuser/test-repo/subscription",
  commits_url: "https://api.github.com/repos/testuser/test-repo/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/testuser/test-repo/git/commits{/sha}",
  comments_url:
    "https://api.github.com/repos/testuser/test-repo/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/testuser/test-repo/issues/comments{/number}",
  contents_url:
    "https://api.github.com/repos/testuser/test-repo/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/testuser/test-repo/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/testuser/test-repo/merges",
  archive_url:
    "https://api.github.com/repos/testuser/test-repo/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/testuser/test-repo/downloads",
  issues_url: "https://api.github.com/repos/testuser/test-repo/issues{/number}",
  pulls_url: "https://api.github.com/repos/testuser/test-repo/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/testuser/test-repo/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/testuser/test-repo/notifications{?since,all,participating}",
  labels_url: "https://api.github.com/repos/testuser/test-repo/labels{/name}",
  releases_url: "https://api.github.com/repos/testuser/test-repo/releases{/id}",
  deployments_url:
    "https://api.github.com/repos/testuser/test-repo/deployments",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
  pushed_at: "2023-01-01T00:00:00Z",
  git_url: "git://github.com/testuser/test-repo.git",
  ssh_url: "git@github.com:testuser/test-repo.git",
  clone_url: "https://github.com/testuser/test-repo.git",
  svn_url: "https://svn.github.com/testuser/test-repo",
  size: 1000,
  stargazers_count: 100,
  watchers_count: 50,
  language: "JavaScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  forks_count: 25,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 10,
  license: {
    key: "mit",
    name: "MIT License",
    url: "https://api.github.com/licenses/mit",
    spdx_id: "MIT",
    node_id: "MDc6TGljZW5zZTEz",
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  default_branch: "main",
  score: 1.0,
  visibility: "",
  forks: 0,
  open_issues: 0,
  watchers: 0,
  permissions: {
    admin: false,
    maintain: false,
    push: false,
    triage: false,
    pull: false,
  },
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = "Wrapper";
  return Wrapper;
};

describe("RepositoryCard", () => {
  const Wrapper = createWrapper();

  it("renders repository name and full name", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    expect(screen.getByText("test-repo")).toBeDefined();
  });

  it("renders repository description", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    expect(screen.getByText("Test repository description")).toBeDefined();
  });

  it("renders repository language", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    expect(screen.getByText("JavaScript")).toBeDefined();
  });

  it("renders star count", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    expect(screen.getByText("100")).toBeDefined();
  });

  it("renders fork count", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    expect(screen.getByText("25")).toBeDefined();
  });

  it("renders open issues count", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    expect(screen.getByText("10")).toBeDefined();
  });

  it("renders owner avatar", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    // The Avatar component shows a fallback with the first letter
    expect(screen.getByText("T")).toBeDefined();
  });

  it("renders owner name", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    expect(screen.getByText("testuser")).toBeDefined();
  });

  it("renders license information", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    expect(screen.getByText("MIT License")).toBeDefined();
  });

  it("renders repository link", () => {
    render(
      <Wrapper>
        <RepositoryCard repository={mockRepository} />
      </Wrapper>
    );

    const link = screen.getByRole("link", { name: /view/i });
    expect(link).toHaveProperty(
      "href",
      "https://github.com/testuser/test-repo"
    );
  });

  it("handles repository without description", () => {
    const repoWithoutDescription = { ...mockRepository, description: null };
    render(
      <Wrapper>
        <RepositoryCard repository={repoWithoutDescription} />
      </Wrapper>
    );

    expect(screen.queryByText("Test repository description")).not.toBeDefined();
  });

  it("handles repository without language", () => {
    const repoWithoutLanguage = { ...mockRepository, language: undefined };
    render(
      <Wrapper>
        <RepositoryCard repository={repoWithoutLanguage} />
      </Wrapper>
    );

    expect(screen.queryByText("JavaScript")).not.toBeDefined();
  });

  it("handles repository without license", () => {
    const repoWithoutLicense = { ...mockRepository, license: null };
    render(
      <Wrapper>
        <RepositoryCard repository={repoWithoutLicense} />
      </Wrapper>
    );

    expect(screen.queryByText("MIT License")).not.toBeDefined();
  });

  it("handles private repository", () => {
    const privateRepo = { ...mockRepository, private: true };
    render(
      <Wrapper>
        <RepositoryCard repository={privateRepo} />
      </Wrapper>
    );

    expect(screen.getByText("test-repo")).toBeDefined();
  });

  it("handles forked repository", () => {
    const forkedRepo = { ...mockRepository, fork: true };
    render(
      <Wrapper>
        <RepositoryCard repository={forkedRepo} />
      </Wrapper>
    );

    expect(screen.getByText("test-repo")).toBeDefined();
  });

  it("formats large numbers correctly", () => {
    const repoWithLargeNumbers = {
      ...mockRepository,
      stargazers_count: 1500,
      forks_count: 2500,
      watchers_count: 1000,
    };
    render(
      <Wrapper>
        <RepositoryCard repository={repoWithLargeNumbers} />
      </Wrapper>
    );

    expect(screen.getByText("1,500")).toBeDefined();
    expect(screen.getByText("2,500")).toBeDefined();
    expect(screen.getByText("1,000")).toBeDefined();
  });
});
