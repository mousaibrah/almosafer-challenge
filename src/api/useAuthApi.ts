'use client';

import useApi from './useApi';
import { ApiResponse, LoginUserResponse } from './types/authTypes';
import { useAuthModals } from '@/store';
import { endpoints } from './endpoints';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { setAuthCookie } from '@/Core/helpers';
export function useAuthApi() {
  const { login: saveUserData } = useAuthStore();
  const { setIsOtpModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen, setIsForgetPasswordModalOpen, setIsChangePasswordModalOpen } = useAuthModals();
  const { mutateAsync: loginMutation, isMutationLoading: isLoginLoading } = useApi<ApiResponse<LoginUserResponse | boolean>>(endpoints.login, 'POST', {
    onSuccess: (data) => {
      if (data.data === true) {
        setIsLoginModalOpen(false);
        setIsOtpModalOpen(true);
      } else if (typeof data.data === 'object') {
        setAuthCookie(data?.data?.store_data?.token || '');
        saveUserData(data?.data?.store_data?.token, data?.data?.account);
        toast.success(data.message);
        setIsLoginModalOpen(false);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: OtpMutation, isMutationLoading: isOtpLoading } = useApi<ApiResponse<LoginUserResponse>>(endpoints.verifyUserCode, 'POST', {
    onSuccess: (data) => {
      setAuthCookie(data?.data?.store_data?.token || '');
      saveUserData(data?.data?.store_data?.token, data?.data?.account);
      toast.success(data.message);
      setIsOtpModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: resendOtpMutation, isMutationLoading: isResendOtpLoading } = useApi<ApiResponse<LoginUserResponse>>(endpoints.resendUserCode, 'POST', {
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: registerMutation, isMutationLoading: isRegisterLoading } = useApi<ApiResponse<LoginUserResponse>>(endpoints.register, 'POST', {
    onSuccess: (data) => {
      if (data.status_code === 201) {
        setIsRegisterModalOpen(false);
        setIsOtpModalOpen(true);
      }
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: forgetPasswordMutation, isMutationLoading: isForgetPasswordLoading } = useApi<ApiResponse<LoginUserResponse>>(endpoints.forgetPassword, 'POST', {
    onSuccess: (data) => {
      if (data.status_code === 201) {
        setIsForgetPasswordModalOpen(false);
        setIsOtpModalOpen(true);
      }
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: verifyOtpForgetPasswordMutation, isMutationLoading: isVerifyOtpForgetPasswordLoading } = useApi<ApiResponse<LoginUserResponse>>(endpoints.verifyForgetPasswordCode, 'POST', {
    onSuccess: (data) => {
      localStorage.setItem('resetPasswordToken', data?.data?.store_data?.token);
      toast.success(data.message);
      setIsChangePasswordModalOpen(true);
      setIsOtpModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: resetPasswordMutation, isMutationLoading: isResetPasswordLoading } = useApi<ApiResponse<LoginUserResponse>>(endpoints.resetPassword, 'POST', {
    onSuccess: (data) => {
      toast.success(data.message);
      saveUserData(data?.data?.store_data?.token, data?.data?.account);
      localStorage.removeItem('resetPasswordToken');
      setIsChangePasswordModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    loginMutation,
    isLoginLoading,
    OtpMutation,
    isOtpLoading,
    resendOtpMutation,
    isResendOtpLoading,
    registerMutation,
    isRegisterLoading,
    forgetPasswordMutation,
    isForgetPasswordLoading,
    verifyOtpForgetPasswordMutation,
    isVerifyOtpForgetPasswordLoading,
    resetPasswordMutation,
    isResetPasswordLoading,
  };
}
