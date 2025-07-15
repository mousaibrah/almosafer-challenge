"use client";

import { endpoints } from "@/api/endpoints";
import { useFetchData } from "@/api/useApi";
import type {
  GitHubRepository,
  GitHubSearchResponse,
  GitHubUser,
  SearchType,
} from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";

export function useGitHubSearch(
  query: string,
  searchType: SearchType,
  sort: string | undefined,
  order: string = "desc"
) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GitHubRepository[] | GitHubUser[] | []>([]);

  const debouncedQuery = useDebounce(query, 500);

  const { isLoading: repositoriesLoading } = useFetchData<
    GitHubSearchResponse<GitHubRepository>
  >({
    endpoint: endpoints.repositoriesSearch,
    config: {
      params: {
        q: debouncedQuery,
        type: searchType,
        page: page,
        per_page: 10,
        sort: sort === "best" ? undefined : sort,
        order: order,
      },
    },
    skip: !debouncedQuery || searchType !== "repositories",
    options: {
      onSuccess(data) {
        if (page === 1) {
          setData(data?.items || []);
        } else {
          setData(
            (prev) => [...prev, ...(data?.items || [])] as GitHubRepository[]
          );
        }
        setTotalCount(data.total_count);
        setHasMore(data.items.length === 10 && data.total_count > page * 10);
      },
      onError(error) {
        setError(error.message);
      },
    },
  });

  const { isLoading: usersLoading } = useFetchData<
    GitHubSearchResponse<GitHubUser>
  >({
    endpoint: endpoints.usersSearch,
    config: {
      params: {
        q: debouncedQuery,
        type: searchType,
        page: page,
        per_page: 10,
        sort: sort === "best" ? undefined : sort,
        order: order,
      },
    },
    skip: !debouncedQuery || searchType !== "users",
    options: {
      onSuccess(data) {
        if (page === 1) {
          setData(data?.items || []);
        } else {
          setData((prev) => [...prev, ...(data?.items || [])] as GitHubUser[]);
        }
        setTotalCount(data.total_count);
        setHasMore(data.items.length === 10 && data.total_count > page * 10);
      },
      onError(error) {
        setError(error.message);
      },
    },
  });

  useEffect(() => {
    setPage(1);
    setData([]);
    setHasMore(false);
    setTotalCount(0);
    setError(null);
  }, [debouncedQuery, searchType]);

  const loadMore = useCallback(() => {
    if (searchType === "repositories") {
      if (!repositoriesLoading && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
      }
    } else {
      if (!usersLoading && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
      }
    }
  }, [repositoriesLoading, usersLoading, hasMore, page, searchType]);

  return {
    data,
    loading: repositoriesLoading || usersLoading,
    error,
    hasMore,
    loadMore,
    totalCount,
  };
}
