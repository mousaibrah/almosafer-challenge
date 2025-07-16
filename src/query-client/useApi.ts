import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import axiosRequest from "./client";

// API hooks with usePost and useUpdate
export const useApi = <T>(
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError) => void;
    isMultipart?: boolean;
    params?: Record<string, unknown>;
  }
) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isError: isMutationError,
    error: mutationError,
    data: mutationData,
    isPending: isMutationLoading,
  } = useMutation({
    mutationFn: (data?: unknown) =>
      axiosRequest({
        url,
        method,
        data,
        isMultipart: options?.isMultipart,
        params: options?.params,
      }).then((res) => res?.data as T),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [url] });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      if (options?.onError) {
        options.onError(error as AxiosError);
      }
    },
    networkMode: "always",
  });

  return {
    mutateAsync,
    isMutationError,
    isMutationLoading,
    mutationError,
    mutationData,
  };
};

interface UseGetOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}

interface UseGetConfig<T> {
  queryKey?: string;
  endpoint: string;
  config?: AxiosRequestConfig;
  options?: UseGetOptions<T>;
  shouldFetch?: boolean;
  includeHeaders?: boolean;
  skip?: boolean;
  forceRefetch?: boolean;
}

type Variables = Record<string, unknown>;

export const useFetchData = <T>({
  queryKey = "",
  endpoint,
  config,
  options,
  shouldFetch = true,
  includeHeaders,
  skip,
  forceRefetch = false,
}: UseGetConfig<T>) => {
  return useQuery<
    T,
    AxiosError,
    T,
    [string, Variables | undefined, string, boolean]
  >({
    queryKey: [endpoint, config?.params as Variables, queryKey, forceRefetch],
    enabled: shouldFetch && !skip,
    networkMode: "offlineFirst",
    staleTime: 3,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      try {
        const response = await axiosRequest({
          url: endpoint,
          method: "GET",
          params: config?.params,
        });

        const data = includeHeaders
          ? {
              data: response.data,
              headers: response.headers,
            }
          : response.data;

        if (options?.onSuccess) {
          options.onSuccess(data as T);
        }

        return data as T;
      } catch (error) {
        if (options?.onError && error instanceof AxiosError) {
          options.onError(error);
        }
        if (error instanceof AxiosError) {
          if (error?.response?.status === 401) {
            toast.error("Unauthorized");
          }
        }
        throw error;
      }
    },
  });
};
export default useApi;
