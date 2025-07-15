import { useFetchData } from '../useApi';
import { ApiResponseType } from '@/types';
import { endpoints } from '../endpoints';
import { EntityType, Year } from '../types/homepage';
import { AxiosHeaders } from 'axios';
// MAKE
const useGetBrands = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.brands,
    skip: skip,
  });
  return { brands: data?.data, brandsLoading: isLoading, error };
};

type ReturnType<T extends boolean = false> = T extends true ? { data: ApiResponseType<EntityType[]>; headers: AxiosHeaders } : ApiResponseType<EntityType[]>;
const useGetBrandsHomePage = <T extends boolean = false>({ skip, includeHeader = false as T }: { skip?: boolean; includeHeader?: T } = {}) => {
  const { data, isLoading, error } = useFetchData<ReturnType<T>>({
    endpoint: endpoints.brands,
    config: {
      params: {
        page: 1,
        page_size: 10,
      },
    },
    skip: skip,
    includeHeaders: includeHeader,
  });
  return { brands: data as ReturnType<T>, brandsLoading: isLoading, error };
};

// MODEL
const useGetModels = ({ shouldFetch, brandId, forceRefetch, skip }: { shouldFetch: boolean; brandId: number | undefined; forceRefetch?: boolean; skip?: boolean }) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.models,
    config: {
      params: {
        brand_id: brandId,
      },
    },
    skip: skip,
    shouldFetch: shouldFetch && !!brandId,
    forceRefetch: forceRefetch,
  });
  return { models: data?.data, modelsLoading: isLoading, error };
};

// CONDITION
const useGetConditions = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.condition,
    skip: skip,
  });
  return { conditions: data?.data, conditionsLoading: isLoading, error };
};

// BODY
const useGetBodyTypes = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.bodyTypes,
    skip: skip,
  });
  return { bodyTypes: data?.data, bodyTypesLoading: isLoading, error };
};

// YEAR
const useGetYears = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<Year[]>>({
    endpoint: endpoints.years,
    skip: skip,
  });
  return { years: data?.data, yearsLoading: isLoading, error };
};

// FUEL TYPE
const useGetFuelTypes = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.fuelTypes,
    skip: skip,
  });
  return { fuelTypes: data?.data, fuelTypesLoading: isLoading, error };
};

// TRANSMISSION
const useGetTransmission = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.transmission,
    skip: skip,
  });
  return { transmissions: data?.data, transmissionsLoading: isLoading, error };
};
// CAR CUSTOM
const useGetCarCustom = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.carCustom,
    skip: skip,
  });
  return { carCustom: data?.data, carCustomLoading: isLoading, error };
};

// CAR LICENSE
const useGetCarLicense = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.carLicense,
    skip: skip,
  });
  return { carLicense: data?.data, carLicenseLoading: isLoading, error };
};
//  COLOR
const useGetColors = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.colors,
    skip: skip,
  });
  return { colors: data?.data, colorsLoading: isLoading, error };
};
// DRIVE TYPE
const useGetDriveTypes = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.driveTypes,
    skip: skip,
  });
  return { driveTypes: data?.data, driveTypesLoading: isLoading, error };
};
// INSURANCE TYPE
const useGetInsuranceTypes = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.insuranceTypes,
    skip: skip,
  });
  return { insuranceTypes: data?.data, insuranceTypesLoading: isLoading, error };
};
// CONTRACT TYPE
const useGetContractTypes = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.contractTypes,
    skip: skip,
  });
  return { contractTypes: data?.data, contractTypesLoading: isLoading, error };
};
// COUNTRY
const useGetCountries = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.country,
    skip: skip,
  });
  return { countries: data?.data, countriesLoading: isLoading, error };
};
// CITY
const useGetCities = ({ countryId, skip }: { countryId?: string | undefined; skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.city,
    config: {
      params: {
        country_id: countryId || undefined,
      },
    },
    skip: skip,
  });
  return { cities: data?.data, citiesLoading: isLoading, error };
};

// FEATURES
const useGetFeatures = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.features,
    skip: skip,
  });
  return { features: data?.data, featuresLoading: isLoading, error };
};

// Payment Methods
const useGetPaymentMethods = ({ skip }: { skip?: boolean } = {}) => {
  const { data, isLoading, error } = useFetchData<ApiResponseType<EntityType[]>>({
    endpoint: endpoints.paymentMethods,
    skip: skip,
  });
  return { paymentMethods: data?.data, paymentMethodsLoading: isLoading, error };
};

export {
  useGetBrands,
  useGetBrandsHomePage,
  useGetBodyTypes,
  useGetModels,
  useGetYears,
  useGetConditions,
  useGetFuelTypes,
  useGetTransmission,
  useGetCarCustom,
  useGetCarLicense,
  useGetColors,
  useGetDriveTypes,
  useGetInsuranceTypes,
  useGetContractTypes,
  useGetCountries,
  useGetCities,
  useGetFeatures,
  useGetPaymentMethods,
};
