import { Upload } from './homepage';

export interface ApiResponse<T> {
  data: T;
  status_code: number;
  message: string;
}

export interface LoginUserResponse {
  store_data: StoreData;
  account: Account;
}

export interface StoreData {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

export interface Account {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  banner: Upload;
  phone_number: string;
  email: string;
  is_profile_completed: boolean;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_deleted: boolean;
  upload: Upload;
  upload_id: number;
  account_type: string;
  created_at: string;
  updated_at: string;
  banner_id: number;
  media_id: number;
  user: User;
}

export interface User {
  id: number;
  city_id: number;
  whatsapp_number: string;
  bio: string;
  is_deleted: boolean;
  account_id: number;
  created_at: string;
  updated_at: string;
  gender: 'male' | 'female';
  user_type: 'consumer' | 'showroom';
  website_url?: string;
  country_id: number;
}

export interface LoginUserRequest {
  email?: string;
  password: string;
  phone_number?: string;
  country_code?: string;
}
