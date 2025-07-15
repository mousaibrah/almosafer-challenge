import { ApiResponseType } from '@/types';
import { endpoints } from '../endpoints';
import { useFetchData } from '../useApi';
import { PackageType } from '../types/packages';

const useGetPackages = ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
  id?: string;
} = {}): {
  data: ApiResponseType<PackageType[]>;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useFetchData<ApiResponseType<PackageType[]>>({
    endpoint: endpoints.packages,
    config: {
      params: {
        page,
        page_size: pageSize,
      },
    },
  });

  return { data: data as ApiResponseType<PackageType[]>, isLoading, isError };
};

const useGetPackageById = ({ id, skip }: { id: string; skip?: boolean | undefined }) => {
  const { data, isLoading, isError } = useFetchData<ApiResponseType<PackageType>>({
    endpoint: `${endpoints.packages}/${id}`,
    skip,
  });
  return { data: data as ApiResponseType<PackageType>, isLoading, isError };
};

export { useGetPackages, useGetPackageById };
