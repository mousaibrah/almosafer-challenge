"use client";

import type { GitHubRepository, GitHubUser, SearchType } from "@/types";
import { useEffect, useRef } from "react";
import { EmptyState } from "./EmptyState";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { RepositoryCard } from "./RepositoryCard";
import { UserCard } from "./UserCard";

interface SearchResultsProps {
  data: (GitHubUser | GitHubRepository)[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  totalCount: number;
  searchType: SearchType;
  query: string;
}

export function SearchResults({
  data,
  loading,
  error,
  hasMore,
  loadMore,
  totalCount,
  searchType,
  query,
}: SearchResultsProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("hasMore :>> ", hasMore);
    console.log("loading :>> ", loading);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!query) {
    return (
      <EmptyState
        title="Start searching"
        description={`Enter a query to search for ${searchType}`}
      />
    );
  }

  if (!loading && data?.length === 0) {
    return (
      <EmptyState
        title="No results found"
        description={`No ${searchType} found for "${query}"`}
      />
    );
  }

  return (
    <div className="space-y-6">
      {totalCount > 0 && (
        <div className="text-sm text-gray-600">
          Found {totalCount.toLocaleString()} {searchType} for &quot;{query}
          &quot;
        </div>
      )}

      <div className="grid gap-4">
        {data?.map((item) => (
          <div key={item.id}>
            {searchType === "users" ? (
              <UserCard user={item as GitHubUser} />
            ) : (
              <RepositoryCard repository={item as GitHubRepository} />
            )}
          </div>
        ))}
      </div>

      {loading && <LoadingSpinner />}

      {hasMore && !loading && (
        <div
          ref={observerRef}
          className="h-10 flex items-center justify-center"
        >
          <div className="text-sm text-gray-500">
            Scroll for more results...
          </div>
        </div>
      )}
    </div>
  );
}
