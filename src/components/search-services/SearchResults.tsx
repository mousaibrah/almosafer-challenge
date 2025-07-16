"use client";

import type {
  GitHubRepository,
  GitHubUser,
  SearchType,
  Sort,
} from "@/types/github";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { RepositoryCard } from "../cards/RepositoryCard";
import { UserCard } from "../cards/UserCard";
import { EmptyState } from "../error-handler/EmptyState";
import { ErrorMessage } from "../error-handler/ErrorMessage";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SearchResultsProps {
  data: (GitHubUser | GitHubRepository)[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  totalCount: number;
  searchType: SearchType;
  query: string;
  sort: Sort;
  order: string;
  setSort: Dispatch<SetStateAction<Sort>>;
  setOrder: Dispatch<SetStateAction<string>>;
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
  sort,
  order,
  setSort,
  setOrder,
}: SearchResultsProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
          <div className="text-sm text-black">
            Found {totalCount.toLocaleString()} {searchType} for &quot;{query}
            &quot;
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={sort}
              onValueChange={(value) => setSort(value as Sort)}
            >
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best Match</SelectItem>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="forks">Forks</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={order} onValueChange={setOrder}>
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Oldest</SelectItem>
                <SelectItem value="desc">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
