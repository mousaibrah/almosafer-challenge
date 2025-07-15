import axios, { type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { decodeToken } from './decodeToken';
import { useAuthStore } from '@/store';
// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '',
    'ngrok-skip-browser-warning': '69420',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  let token = Cookies.get('jwt_token') ?? null;
  let resetPasswordToken = localStorage.getItem('resetPasswordToken');
  const locale = Cookies.get('NEXT_LOCALE');
  const decodedToken = decodeToken(token);
  const decodedResetPasswordToken = decodeToken(resetPasswordToken);
  if (decodedResetPasswordToken?.exp && decodedResetPasswordToken.exp < Date.now() / 1000) {
    localStorage.removeItem('resetPasswordToken');
    resetPasswordToken = null;
    useAuthStore.getState().logout(); // ✅ Call without hook
  }
  if (decodedToken?.exp && decodedToken.exp < Date.now() / 1000) {
    Cookies.remove('jwt_token');
    token = null;
    useAuthStore.getState().logout(); // ✅ Call without hook
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (resetPasswordToken) {
    config.headers.Authorization = `Bearer ${resetPasswordToken}`;
  }
  config.headers.lang = locale;
  return config;
});
interface AxiosRequestParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  params?: Record<string, unknown>;
  isMultipart?: boolean; // Flag to indicate if the request is multipart
}

const axiosRequest = async ({
  url,
  method,
  data,
  params = {},
  isMultipart = false, // Default is false, meaning Content-Type is application/json
}: AxiosRequestParams): Promise<AxiosResponse> => {
  try {
    // Set headers based on isMultipart flag
    const headers = {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    };

    const response: AxiosResponse = await axiosInstance({
      url,
      method,
      data,
      params,
      headers,
    });

    return response;
  } catch (error) {
    // Handle the error properly
    if (axios.isAxiosError(error)) {
      throw new Error(JSON.stringify(error.response?.data?.message) || 'An error occurred');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export default axiosRequest;
