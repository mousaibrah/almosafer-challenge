import { endpoints } from '../endpoints';
import { useFetchData } from '../useApi';
import { InsuranceType } from '../types/insurance';

const useGetInsurance = (): {
  data: InsuranceType[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useFetchData<InsuranceType[]>({
    endpoint: endpoints.insurance,
  });

    return { data: data as InsuranceType[], isLoading, isError };
};

export { useGetInsurance };
