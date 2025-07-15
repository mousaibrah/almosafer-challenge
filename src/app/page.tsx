"use client";

import {
  AccessibilityWrapper,
  SearchInput,
  SearchResults,
  SearchTypeSelector,
} from "@/components";
import { useGitHubSearch } from "@/hooks/use-github-search";
import type { GitHubRepository, GitHubUser, SearchType } from "@/types";
import { useState } from "react";

export default function HomePage() {
  const [searchType, setSearchType] = useState<SearchType>("repositories");
  const [query, setQuery] = useState("");

  const { data, loading, error, hasMore, loadMore, totalCount } =
    useGitHubSearch(query, searchType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GitHub Search
          </h1>
          <p className="text-gray-600 text-lg">
            Search for repositories and users across GitHub
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="space-y-4">
              <SearchTypeSelector value={searchType} onChange={setSearchType} />
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder={`Search for ${searchType}...`}
              />
            </div>
          </div>

          <AccessibilityWrapper
            announceResults={!!query}
            resultCount={totalCount}
          >
            <SearchResults
              data={data as (GitHubUser | GitHubRepository)[]}
              loading={loading}
              error={error || ""}
              hasMore={hasMore}
              loadMore={loadMore}
              totalCount={totalCount}
              searchType={searchType}
              query={query}
            />
          </AccessibilityWrapper>
        </div>
      </div>
    </div>
  );
}
