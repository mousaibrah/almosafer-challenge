"use client";

import {
  AccessibilityWrapper,
  AuthModal,
  SearchInput,
  SearchResults,
  SearchTypeSelector,
} from "@/components";
import FirstTimeMessage from "@/components/first-time-modal/FirstTimeMessage";
import { useGitHubSearch } from "@/hooks/use-github-search";
import { useIsFirstTime } from "@/store/useIsFirstTime";
import type {
  GitHubRepository,
  GitHubUser,
  SearchType,
  Sort,
} from "@/types/github";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [searchType, setSearchType] = useState<SearchType>("repositories");
  const [sort, setSort] = useState<Sort>("best");
  const [order, setOrder] = useState<string>("desc");
  const [query, setQuery] = useState("");

  const { data, loading, error, hasMore, loadMore, totalCount } =
    useGitHubSearch(query, searchType, sort, order);
  const { isFirstTime } = useIsFirstTime();
  const [isFirstTimeMessageOpen, setIsFirstTimeMessageOpen] = useState(false);
  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTimeMessageOpen(true);
    } else {
      setIsFirstTimeMessageOpen(false);
    }
  }, [isFirstTime]);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-[3.5%] py-8">
        <header className="text-center mb-8 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="GitHub Search"
                width={1920}
                height={1080}
                className="size-8"
              />
              <h1 className="text-lg  md:text-3xl font-bold text-black ">
                Search
              </h1>
            </div>

            <AuthModal />
          </div>
          <p className="text-black text-sm md:text-lg">
            Search for repositories and users across GitHub
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-border shadow-lg p-6 mb-8">
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
