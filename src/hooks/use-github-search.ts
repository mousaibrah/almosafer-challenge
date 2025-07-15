"use client";

import { searchGitHub } from "@/lib/helper";
import type { GitHubRepository, GitHubUser, SearchType } from "@/types/github";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";

export function useGitHubSearch(query: string, searchType: SearchType) {
  const [data, setData] = useState<(GitHubUser | GitHubRepository)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const debouncedQuery = useDebounce(query, 500);

  const search = useCallback(
    async (searchQuery: string, searchPage: number, reset = false) => {
      if (!searchQuery.trim()) {
        if (reset) {
          setData([]);
          setTotalCount(0);
          setHasMore(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await searchGitHub(searchQuery, searchType, searchPage);

        if (reset) {
          setData(result.items);
        } else {
          setData((prev) => [...prev, ...result.items]);
        }

        setTotalCount(result.total_count);
        setHasMore(
          result.items.length === 30 && result.total_count > searchPage * 30
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        if (reset) {
          setData([]);
          setTotalCount(0);
          setHasMore(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [searchType]
  );

  // Reset and search when query or type changes
  useEffect(() => {
    setPage(1);
    search(debouncedQuery, 1, true);
  }, [debouncedQuery, searchType, search]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      search(debouncedQuery, nextPage, false);
    }
  }, [loading, hasMore, page, debouncedQuery, search]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    totalCount,
  };
}
