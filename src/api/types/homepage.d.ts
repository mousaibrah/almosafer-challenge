import { User } from './authTypes';

export interface ShowRooms_Agencies_Response {
  id: number;
  city_id: number;
  whatsapp_number: string;
  bio: string;
  is_deleted: boolean;
  account_id: number;
  created_at: string;
  updated_at: string;
  gender: string;
  user_type: string;
  account: Account;
  website_url: string;
}

export interface Account {
  id: number;
  phone_number: string;
  account_type: 'user';
  first_name: string;
  first_name_ar?: string;
  last_name: string;
  last_name_ar?: string;
  username: string;
  email: string;
  is_deleted: boolean;
  upload_id: string | null;
  banner_id: string | null;
  posts: Post[];
  posts_count: number;
  upload: Upload | null;
  banner: Banner | null;
  location: string | null;
  user: User;
  created_at: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_profile_completed: boolean;
  media: Upload | null;
  media_id: number | null;
  phone_number: string;
  updated_at: string;
}
export interface Upload {
  id: number;
  post_id: number;
  url: string;
  blur_hashed_url: string;
  file_type?: string;
}

export interface Banner {
  id: number;
  post_id: number;
  url: string;
}

export interface Post {
  id: number;
  is_active: boolean;
  price: number;
  mileage: number;
  description: string;
  phone_number: string;
  whatsapp_number: string;
  account_id: number;
  brand_id: number;
  model_id: number;
  body_id: number;
  country_id: number;
  city_id: number;
  year_id: number;
  condition_id: number;
  fuel_type_id: number;
  transmission_id: number;
  car_custom_id: number;
  car_license_id: number;
  drive_type_id: number;
  insurance_type_id: number;
  payment_method_id: number;
  interior_color_id: number;
  exterior_color_id: number;
  is_featured: boolean;
  is_deleted: boolean;
  expiration_date: Date;
  created_at: Date;
  updated_at: Date;
  status: string;
  purchase_package_history_id: number;
  brand: EntityType;
  model: EntityType;
  year: Year;
  body: EntityType;
  fuel_type: EntityType;
  transmission: EntityType;
  uploads: Upload[];
  post_features: PostFeature[];
  country: EntityType;
  city: EntityType;
  condition: EntityType;
  car_custom: EntityType;
  car_license: EntityType;
  drive_type: EntityType;
  insurance_type: EntityType;
  payment_method: EntityType;
  interior_color: EntityType;
  exterior_color: EntityType;
  account: Account;
  is_favorite: boolean;
  contract_type: EntityType;
  contract_type_id: number;
  is_editable: boolean;
}

export interface PostFeature {
  id: number;
  name_ar: string;
  name_en: string;
  pivot: Pivot;
}

export interface Pivot {
  post_id: number;
  feature_id: number;
  created_at: string;
  updated_at: string;
}
export interface EntityType {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  upload?: Upload;
  upload_id?: string;
  is_deleted?: boolean;
  brand_id?: number;
}

export interface Brand {
  id: number;
  name_ar: string;
  name_en: string;
  upload_id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Model {
  id: number;
  name_ar: string;
  name_en: string;
  is_deleted: boolean;
  brand_id: number;
  created_at: string;
  updated_at: string;
}

export interface Year {
  id: number;
  number: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Body {
  id: number;
  name_ar: string;
  name_en: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface FuelType {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface Transmission {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface Condition {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface CarCustom {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface CarLicense {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface DriveType {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface InsuranceType {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface PaymentMethod {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface InteriorColor {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface ExteriorColor {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface Color {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface CarFilters {
  brand_id?: number;
  model_id?: number;
  body_id?: number;
  country_id?: number;
  city_id?: number;
  year_id?: number;
  condition_id?: number;
  transmission_id?: number;
  fuel_type_id?: number;
  car_custom_id?: number;
  car_license_id?: number;
  drive_type_id?: number;
  insurance_type_id?: number;
  payment_method_id?: number;
  contract_type_id?: number;
  color_id?: number;
  interior_color_id?: number;
  exterior_color_id?: number;
  feature_ids?: number[];
  search?: string;
  price_min?: number;
  price_max?: number;
  sort?: 'all' | 'price_asc' | 'price_desc' | 'date_asc' | 'date_desc' | null;
}

export interface OffersType {
  firstOffer: CardOffer;
  secondOffer: CardOffer;
  thirdOffer: CardOffer;
  fourthOffer: CardOffer;
}

export interface CardOffer {
  title_en?: string;
  title_ar?: string;
  image?: string;
  percentage?: number;
  start_date: string;
  end_date: string;
}

export interface Welcome {
  id: number;
  first_section_header_en: string;
  first_section_header_ar: string;
  first_section_paragraph_en: string;
  first_section_paragraph_ar: string;
  second_section_header_en: string;
  second_section_header_ar: string;
  second_section_paragraph_en: string;
  second_section_paragraph_ar: string;
  link: string | null;
  image: string;
  upload: Upload;
}

export interface SliderData {
  action_btn_text_ar: string;
  action_btn_text_en: string;
  created_at: string;
  description_ar: string;
  description_en: string;
  first_action_url: string;
  id: number;
  second_action_url: string;
  title_ar: string;
  title_en: string;
  updated_at: string;
}
