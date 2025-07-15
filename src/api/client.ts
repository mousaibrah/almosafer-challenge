import axios, { type AxiosResponse } from "axios";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

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

// Session cache to avoid multiple calls to getSession
let sessionCache: { session: Session | null; timestamp: number } | null = null;
const SESSION_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getAccessToken = async () => {
  try {
    // Check if we have a cached session that's still valid
    const now = Date.now();
    if (sessionCache && now - sessionCache.timestamp < SESSION_CACHE_DURATION) {
      return sessionCache.session?.accessToken;
    }

    // Fetch fresh session
    const session = await getSession();

    // Cache the session
    sessionCache = {
      session,
      timestamp: now,
    };

    return session?.accessToken;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

// Function to clear session cache (useful for logout)
export const clearSessionCache = () => {
  sessionCache = null;
};

const axiosRequest = async ({
  url,
  method,
  data,
  params = {},
  isMultipart = false, // Default is false, meaning Content-Type is application/json
}: AxiosRequestParams): Promise<AxiosResponse> => {
  try {
    // Get the access token for each request
    const accessToken = await getAccessToken();

    // Set headers based on isMultipart flag and authentication
    const headers = {
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
