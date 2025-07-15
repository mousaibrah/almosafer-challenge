export type SearchType = "repositories" | "users";

export interface GitHubUser {
  id: number;
  login: string;
  name?: string;
  avatar_url: string;
  html_url: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  owner?: GitHubUser;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language?: string;
  owner: GitHubUser;
  created_at: string;
  updated_at: string;
  topics?: string[];
}

export interface GitHubSearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}
