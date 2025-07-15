import { ApiResponseType } from '@/types';
import { endpoints } from '../endpoints';
import { useFetchData } from '../useApi';
import { ShowRooms_Agencies_Response } from '../types/homepage';
import { AxiosHeaders } from 'axios';

export type ProfilesReturnType<T extends boolean = false> = T extends true ? { data: ApiResponseType<ShowRooms_Agencies_Response[]>; headers: AxiosHeaders } : ApiResponseType<ShowRooms_Agencies_Response[]>;

function useGetProfiles<T extends boolean = false>({
  type,
  page,
  pageSize,
  includeHeader = false as T,
  is_featured,
}: {
  type: 'showroom' | 'dealership';
  page: number;
  pageSize: number;
  includeHeader?: T;
  is_featured?: boolean;
}): {
  data: ProfilesReturnType<T>;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useFetchData<ProfilesReturnType<T>>({
    endpoint: endpoints.showRoomsAndAgencies,
    config: {
      params: {
        type,
        page,
        page_size: pageSize,
        is_featured,
      },
    },
    includeHeaders: includeHeader,
  });

  return { data: data as ProfilesReturnType<T>, isLoading, isError };
}

type ProfileReturnType<T extends boolean = false> = T extends true ? { data: ApiResponseType<ShowRooms_Agencies_Response>; headers: AxiosHeaders } : ApiResponseType<ShowRooms_Agencies_Response>;

const useGetProfileDetails = <T extends boolean = true>({
  id,
  type,
  includeHeader = false as T,
}: {
  id: number;
  type: 'showroom' | 'dealership';
  includeHeader?: T;
}): {
  data: ProfileReturnType<T>;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useFetchData<ProfileReturnType<T>>({
    endpoint: endpoints.profileDetails,
    config: {
      params: {
        id,
        type,
      },
    },
    includeHeaders: includeHeader,
  });

  return { data: data as ProfileReturnType<T>, isLoading, isError };
};


export { useGetProfiles, useGetProfileDetails };
