export interface NotificationsType {
  id: number;
  is_read: boolean;
  read_at: Date | null;
  is_deleted: boolean;
  notification_id: number;
  account_id: number;
  created_at: string;
  updated_at: string;
  notification: Notification;
}

export interface Notification {
  id: number;
  title_ar: string;
  title_en: string;
  body_ar: string;
  body_en: string;
  post_id?: number;
  post: Post;
  comment_id: number;
  reply_id?: number;
  params: Record<string, string>;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  notification_type: string;
}

export interface OrderType {
  account_id: number;
  created_at: string;
  description_ar: string;
  description_en: string;
  id: number;
  currency: string;
  is_deleted: boolean;
  is_paid: boolean;
  normal_cars: number;
  normal_cars_expired_in: number;
  package_expired_in: string;
  package_id: number;
  payment: { id: number; amount: string; currency: string; created_at: null };
  payment_id: number;
  price: number;
  sale_price: number;
  special_cars: number;
  special_cars_expired_in: number;
  title_ar: string;
  title_en: string;
  updated_at: null;
}
