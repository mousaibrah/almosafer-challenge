'use client';

import { useApi, useFetchData } from '@/api/useApi';
import { useAuthStore } from '@/store/authStore';
import type { UpdateProfileSchema } from '@/Core/schema';
import { endpoints } from '../endpoints';
import { useState } from 'react';
import { Account } from '@/api/types/authTypes';
import { ApiResponseType } from '@/types';
import { toast } from 'sonner';
import { MessageResponseType } from '../types';
export const useUpdateProfile = () => {
  const updateAccountData = useAuthStore((state) => state.updateUser);
  const { mutateAsync: updateProfile, isMutationLoading } = useApi<MessageResponseType>(endpoints.updateProfile, 'POST', {
    onSuccess: (data) => {
      toast.success(data?.message);
    },

    isMultipart: true,
  });

  const prepareFormData = (formValues: UpdateProfileSchema): FormData => {
    const formData = new FormData();

    // Only append values that are defined
    if (formValues.firstName !== undefined) {
      formData.append('first_name', formValues.firstName);
    }

    if (formValues.lastName !== undefined) {
      formData.append('last_name', formValues.lastName);
    }

    if (formValues.whatsappNumber?.number !== undefined) {
      formData.append('whatsapp_number', formValues.whatsappNumber.number);
    }

    if (formValues.bio !== undefined) {
      formData.append('bio', formValues.bio);
    }

    if (formValues.whatsappNumber?.countryCode !== undefined) {
      formData.append('country_code', formValues.whatsappNumber?.countryCode || formValues.mobileNumber?.countryCode || '');
    }

    if (formValues.city !== undefined) {
      formData.append('city_id', formValues.city);
    }

    if (formValues.gender !== undefined) {
      formData.append('gender', formValues.gender);
    }

    if (formValues.image instanceof File) {
      formData.append('image', formValues.image);
    }

    if (formValues.bannerPicture instanceof File) {
      formData.append('banner', formValues.bannerPicture);
    }

    return formData;
  };
  const [shouldFetch, setShouldFetch] = useState(false);
  useFetchData<ApiResponseType<{ account: Account }>>({
    endpoint: endpoints.userInfo,
    shouldFetch: shouldFetch,
    options: {
      onSuccess(data) {
        updateAccountData(data?.data?.account);
        setShouldFetch(false);
      },
    },
  });

  const handleUpdateProfile = async (formValues: UpdateProfileSchema) => {
    const formData = prepareFormData(formValues);

    await updateProfile(formData)
      .then(() => {
        setShouldFetch(true);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return {
    handleUpdateProfile,
    isMutationLoading,
  };
};
