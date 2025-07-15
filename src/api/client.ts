import axios, { type AxiosResponse } from "axios";
// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
  },
});

interface AxiosRequestParams {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
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
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
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
      throw new Error(
        JSON.stringify(error.response?.data?.message) || "An error occurred"
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default axiosRequest;
