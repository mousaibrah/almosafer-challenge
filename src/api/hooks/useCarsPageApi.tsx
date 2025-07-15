import { endpoints } from '../endpoints';
import { useFetchData } from '../useApi';
import { ApiResponseType } from '@/types';
import { Post, CarFilters } from '../types/homepage';
import { AxiosResponseHeaders } from 'axios';
import { useState, useEffect } from 'react';

export interface UseGetCarsDataProps {
  page: number;
  page_size: number;
  filters: CarFilters;
  sort?: 'all' | 'price_asc' | 'price_desc' | 'date_asc' | 'date_desc' | null;
  onSuccess: (data: Post[]) => void;
}

const useGetCarsData = ({ page, page_size, filters, onSuccess }: UseGetCarsDataProps) => {
  const [currentPage, setCurrentPage] = useState(page); // Local state to track page changes
  const [cachedData, setCachedData] = useState<Post[] | undefined>(undefined);

  const params: Partial<UseGetCarsDataProps> = {
    page: currentPage,
    page_size,
    ...filters,
  };
  if (filters.sort === 'all') {
    delete params.sort;
  }

  const { data, isLoading, error } = useFetchData<{ headers: AxiosResponseHeaders; data: ApiResponseType<Post[]> }>({
    endpoint: endpoints.posts,
    config: { params },
    includeHeaders: true,
    options: {
      onSuccess(data) {
        const newData = data?.data?.data;
        setCachedData(newData);
        onSuccess(newData);
      },
    },
  });

  useEffect(() => {
    if (!isLoading && !error && data?.data?.data?.length === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [data, isLoading, error, currentPage]);

  useEffect(() => {
    if (isLoading && cachedData) {
      onSuccess(cachedData);
    }
  }, [isLoading, cachedData, onSuccess]);

  return {
    data: data?.data?.data,
    headers: data?.headers,
    isLoading,
    error,
    setCurrentPage,
    currentPage,
  };
};

const useGetCarDetails = ({ id, skip }: { id: string; skip: boolean }) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<Post>>({
    endpoint: `${endpoints.post}/${id}`,
    skip,
  });
  return {
    carDetails: data?.data,
    isLoading,
    error,
  };
};

export { useGetCarsData, useGetCarDetails };
