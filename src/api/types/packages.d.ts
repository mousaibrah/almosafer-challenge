export type PackageType = {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  sale_price: number;
  special_cars: number;
  normal_cars: number;
  package_expired_in: number;
  special_cars_expired_in: number;
  normal_cars_expired_in: number;
  is_active: boolean;
  is_paid: boolean;
  is_default: boolean;
  created_at: string;
};

export type PaymentInitSessionBody = {
  package_id: number;
  billing: {
    street1: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
};

export type PaymentInitSessionResponse = {
  data: {
    checkout_id: string;
    session_url: string | null;
  };
  message: string;
  status: boolean;
};
