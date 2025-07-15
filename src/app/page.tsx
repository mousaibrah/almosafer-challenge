"use client";

import {
  AccessibilityWrapper,
  AuthModal,
  SearchInput,
  SearchResults,
  SearchTypeSelector,
} from "@/components";
import FirstTimeMessage from "@/components/FirstTimeMessage";
import { useGitHubSearch } from "@/hooks/use-github-search";
import { useIsFirstTime } from "@/lib/store/useIsFirstTime";
import type { GitHubRepository, GitHubUser, SearchType, Sort } from "@/types";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [searchType, setSearchType] = useState<SearchType>("repositories");
  const [sort, setSort] = useState<Sort>("best");
  const [order, setOrder] = useState<string>("desc");
  const [query, setQuery] = useState("");

  const { data, loading, error, hasMore, loadMore, totalCount } =
    useGitHubSearch(query, searchType, sort, order);
  const { isFirstTime } = useIsFirstTime();
  const [isFirstTimeMessageOpen, setIsFirstTimeMessageOpen] =
    useState(false);
  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTimeMessageOpen(true);
    } else {
      setIsFirstTimeMessageOpen(false);
    }
  }, [isFirstTime]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-[3.5%] py-8">
        <header className="text-center mb-8 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg  md:text-4xl font-bold text-gray-900 ">
              GitHub Search
            </h1>
            <AuthModal />
          </div>
          <p className="text-gray-600 text-sm md:text-lg">
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
              sort={sort}
              order={order}
              setSort={setSort}
              setOrder={setOrder}
            />
          </AccessibilityWrapper>
        </div>
        <FirstTimeMessage
          onClose={() => setIsFirstTimeMessageOpen(false)}
          open={isFirstTimeMessageOpen}
        />
      </div>
    </div>
  );
}
