import { ApiResponseType } from '@/types';
import { endpoints } from '../endpoints';
import { useFetchData } from '../useApi';
import { AxiosHeaders } from 'axios';
import { Post } from '../types/homepage';

type ReturnType<T extends boolean = false> = T extends true ? { data: ApiResponseType<Post[]>; headers: AxiosHeaders } : ApiResponseType<Post[]>;

const useGetPosts = <T extends boolean = false>({
  page,
  pageSize,
  includeHeader = false as T,
  is_featured,
  shouldFetch = true,
}: {
  page: number;
  pageSize: number;
  includeHeader?: T;
  is_featured?: boolean;
  shouldFetch?: boolean;
}): {
  data: ReturnType<T>;
  isLoading: boolean;
  isError: boolean;
  shouldFetch?: boolean;
} => {
  const { data, isLoading, isError } = useFetchData<ReturnType<T>>({
    endpoint: endpoints.posts,
    config: {
      params: {
        page,
        page_size: pageSize,
        is_featured,
      },
    },
    shouldFetch: shouldFetch,

    includeHeaders: includeHeader,
  });

  return { data: data as ReturnType<T>, isLoading, isError };
};

export default useGetPosts;
