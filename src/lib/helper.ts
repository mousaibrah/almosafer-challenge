import type {
  GitHubRepository,
  GitHubSearchResponse,
  GitHubUser,
  SearchType,
} from "@/types/github";
import { apiCache } from "./cache";

const GITHUB_API_BASE = "https://api.github.com";

class GitHubAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "GitHubAPIError";
  }
}

// Update the fetchGitHub function to include caching
async function fetchGitHub(endpoint: string, useCache = true) {
  const cacheKey = endpoint;

  if (useCache) {
    const cached = apiCache.get(cacheKey);
    if (cached) return cached;
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "GitHub-Search-SPA",
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      const resetTime = response.headers.get("X-RateLimit-Reset");
      const resetDate = resetTime
        ? new Date(Number.parseInt(resetTime) * 1000)
        : null;
      throw new GitHubAPIError(
        `API rate limit exceeded. ${
          resetDate
            ? `Resets at ${resetDate.toLocaleTimeString()}`
            : "Please try again later."
        }`,
        403
      );
    }
    if (response.status === 422) {
      throw new GitHubAPIError(
        "Invalid search query. Please check your input.",
        422
      );
    }
    if (response.status === 404) {
      throw new GitHubAPIError("Repository or user not found.", 404);
    }
    throw new GitHubAPIError(
      `GitHub API error: ${response.statusText}`,
      response.status
    );
  }

  const data = await response.json();

  if (useCache) {
    apiCache.set(cacheKey, data);
  }

  return data;
}

export async function searchGitHub(
  query: string,
  type: SearchType,
  page = 1,
  perPage = 30
): Promise<GitHubSearchResponse<GitHubUser | GitHubRepository>> {
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `/search/${type}?q=${encodedQuery}&page=${page}&per_page=${perPage}`;

  return fetchGitHub(endpoint);
}

export async function getRepositoryLanguages(
  fullName: string
): Promise<Record<string, number>> {
  try {
    return await fetchGitHub(`/repos/${fullName}/languages`);
  } catch (error) {
    console.error("Failed to fetch repository languages:", error);
    return {};
  }
}

export async function getRepositoryForks(
  fullName: string
): Promise<GitHubUser[]> {
  try {
    const forks = await fetchGitHub(
      `/repos/${fullName}/forks?sort=newest&per_page=3`
    );
    return forks.map((fork: GitHubUser) => fork.owner);
  } catch (error) {
    console.error("Failed to fetch repository forks:", error);
    return [];
  }
}

// Add repository contents fetching for better file type detection
export async function getRepositoryContents(
  fullName: string,
  path = ""
): Promise<GitHubRepository[]> {
  try {
    return await fetchGitHub(`/repos/${fullName}/contents/${path}`);
  } catch (error) {
    console.error("Failed to fetch repository contents:", error);
    return [];
  }
}
