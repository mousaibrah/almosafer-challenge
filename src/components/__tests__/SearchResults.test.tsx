import type { GitHubRepository, GitHubUser } from "@/types/github";
import { render, screen } from "@testing-library/react";
import { SearchResults } from "../search-services/SearchResults";

// Mock child components
jest.mock("../EmptyState", () => ({
  EmptyState: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div data-testid="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock("../ErrorMessage", () => ({
  ErrorMessage: ({ message }: { message: string }) => (
    <div data-testid="error-message">{message}</div>
  ),
}));

jest.mock("../LoadingSpinner", () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

jest.mock("../RepositoryCard", () => ({
  RepositoryCard: ({ repository }: { repository: GitHubRepository }) => (
    <div data-testid="repository-card">{repository.name}</div>
  ),
}));

jest.mock("../UserCard", () => ({
  UserCard: ({ user }: { user: GitHubUser }) => (
    <div data-testid="user-card">{user.login}</div>
  ),
}));

const mockRepository: GitHubRepository = {
  id: 1,
  node_id: "test",
  name: "test-repo",
  full_name: "test/test-repo",
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
    user_view_type: "User",
    site_admin: false,
  },
  html_url: "https://github.com/test/test-repo",
  description: "Test repository",
  fork: false,
  url: "https://api.github.com/repos/test/test-repo",
  forks_url: "https://api.github.com/repos/test/test-repo/forks",
  keys_url: "https://api.github.com/repos/test/test-repo/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/test/test-repo/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/test/test-repo/teams",
  hooks_url: "https://api.github.com/repos/test/test-repo/hooks",
  issue_events_url:
    "https://api.github.com/repos/test/test-repo/issues/events{/number}",
  events_url: "https://api.github.com/repos/test/test-repo/events",
  assignees_url: "https://api.github.com/repos/test/test-repo/assignees{/user}",
  branches_url: "https://api.github.com/repos/test/test-repo/branches{/branch}",
  tags_url: "https://api.github.com/repos/test/test-repo/tags",
  blobs_url: "https://api.github.com/repos/test/test-repo/git/blobs{/sha}",
  git_tags_url: "https://api.github.com/repos/test/test-repo/git/tags{/sha}",
  git_refs_url: "https://api.github.com/repos/test/test-repo/git/refs{/sha}",
  trees_url: "https://api.github.com/repos/test/test-repo/git/trees{/sha}",
  statuses_url: "https://api.github.com/repos/test/test-repo/statuses/{sha}",
  languages_url: "https://api.github.com/repos/test/test-repo/languages",
  stargazers_url: "https://api.github.com/repos/test/test-repo/stargazers",
  contributors_url: "https://api.github.com/repos/test/test-repo/contributors",
  subscribers_url: "https://api.github.com/repos/test/test-repo/subscribers",
  subscription_url: "https://api.github.com/repos/test/test-repo/subscription",
  commits_url: "https://api.github.com/repos/test/test-repo/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/test/test-repo/git/commits{/sha}",
  comments_url: "https://api.github.com/repos/test/test-repo/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/test/test-repo/issues/comments{/number}",
  contents_url: "https://api.github.com/repos/test/test-repo/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/test/test-repo/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/test/test-repo/merges",
  archive_url:
    "https://api.github.com/repos/test/test-repo/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/test/test-repo/downloads",
  issues_url: "https://api.github.com/repos/test/test-repo/issues{/number}",
  pulls_url: "https://api.github.com/repos/test/test-repo/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/test/test-repo/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/test/test-repo/notifications{?since,all,participating}",
  labels_url: "https://api.github.com/repos/test/test-repo/labels{/name}",
  releases_url: "https://api.github.com/repos/test/test-repo/releases{/id}",
  deployments_url: "https://api.github.com/repos/test/test-repo/deployments",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
  pushed_at: "2023-01-01T00:00:00Z",
  git_url: "git://github.com/test/test-repo.git",
  ssh_url: "git@github.com:test/test-repo.git",
  clone_url: "https://github.com/test/test-repo.git",
  svn_url: "https://svn.github.com/test/test-repo",
  size: 100,
  stargazers_count: 10,
  watchers_count: 10,
  language: "JavaScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: true,
  has_discussions: true,
  forks_count: 5,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 2,
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
  visibility: "public",
  forks: 5,
  open_issues: 2,
  watchers: 10,
  default_branch: "main",
  permissions: {
    admin: false,
    maintain: false,
    push: false,
    triage: false,
    pull: true,
  },
  score: 1.0,
};

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

describe("SearchResults", () => {
  const mockLoadMore = jest.fn();
  const mockSetSort = jest.fn();
  const mockSetOrder = jest.fn();

  const defaultProps = {
    data: [],
    loading: false,
    error: null,
    hasMore: false,
    loadMore: mockLoadMore,
    totalCount: 0,
    searchType: "repositories" as const,
    query: "",
    sort: "best" as const,
    order: "desc",
    setSort: mockSetSort,
    setOrder: mockSetOrder,
  };

  beforeEach(() => {
    mockLoadMore.mockClear();
    mockSetSort.mockClear();
    mockSetOrder.mockClear();
  });

  it("shows empty state when no query is provided", () => {
    render(<SearchResults {...defaultProps} />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("Start searching")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a query to search for repositories")
    ).toBeInTheDocument();
  });

  it("shows error message when error is provided", () => {
    render(
      <SearchResults
        {...defaultProps}
        error="Test error message"
        query="test"
      />
    );

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("shows empty state when no results found", () => {
    render(<SearchResults {...defaultProps} query="nonexistent" />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText('No repositories found for "nonexistent"')
    ).toBeInTheDocument();
  });

  it("displays repository cards when repositories data is provided", () => {
    render(
      <SearchResults
        {...defaultProps}
        data={[mockRepository]}
        query="test"
        totalCount={1}
      />
    );

    expect(screen.getByTestId("repository-card")).toBeInTheDocument();
    expect(screen.getByText("test-repo")).toBeInTheDocument();
  });

  it("displays user cards when users data is provided", () => {
    render(
      <SearchResults
        {...defaultProps}
        data={[mockUser]}
        query="test"
        totalCount={1}
        searchType="users"
      />
    );

    expect(screen.getByTestId("user-card")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("shows total count and query information", () => {
    render(
      <SearchResults
        {...defaultProps}
        data={[mockRepository]}
        query="test"
        totalCount={100}
      />
    );

    expect(
      screen.getByText('Found 100 repositories for "test"')
    ).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    render(<SearchResults {...defaultProps} loading={true} query="test" />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it('shows "scroll for more" message when hasMore is true', () => {
    render(<SearchResults {...defaultProps} hasMore={true} query="test" />);

    expect(screen.getByText("Scroll for more results...")).toBeInTheDocument();
  });

  it("calls loadMore when intersection observer triggers", () => {
    render(<SearchResults {...defaultProps} hasMore={true} query="test" />);

    // Simulate intersection observer callback
    const observerCallback = (global.IntersectionObserver as jest.Mock).mock
      .calls[0][0];
    const mockEntry = { isIntersecting: true };

    observerCallback([mockEntry]);

    expect(mockLoadMore).toHaveBeenCalled();
  });
});
