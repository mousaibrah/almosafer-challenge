import { Upload } from './homepage';

export interface InsuranceType {
  id: number;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  phone: number;
  is_active: boolean;
  is_deleted: boolean;
  upload: Upload;
}

export interface ProductType {
  id: number;
  name: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number;
}

export interface VehicleInfoType {
  products: ProductType[];
  status: string;
}

export interface FinanceProvidersType {
  id: number;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  is_active: boolean;
  is_featured: boolean;
  image: string;
  created_at: string;
  updated_at: string;
  loan_duration_limits: {
    customer_bank: {
      min_months: number;
      max_months: number;
    };
    non_customer_bank: {
      min_months: number | null;
      max_months: number | null;
    };
    active_loan_formulas: [
      {
        id: number;
        finance_provider_id: number;
        name: string;
        min_months: number;
        max_months: number;
        coverage_percentage: number;
        is_customer_bank: boolean;
        interest_rate: number;
        is_active: boolean;
        created_at: string;
        updated_at: string;
      },
    ];
  };
}

export interface FinanceInfoType {
  id: number;
  summary_ar: string;
  summary_en: string;
  description_ar: string;
  description_en: string;
  created_at: string;
  updated_at: string;
}

export interface LoanCalculationResponse {
  formula_id: number;
  formula_name: string;
  monthly_payment: number;
  interest_rate: number;
  coverage_percentage: number;
  is_customer_bank: boolean;
  total_amount: number;
  total_profit: number;
  downpayment: number;
  financed_amount: number;
  duration_months: number;
}

export interface LoanSavedData {
  finance_provider_id: number | undefined;
  first_name: string;
  last_name: string;
  city: string;
  phone_number: {
    number: string;
    country_code: string;
  };
  work_destination: string;
  monthly_income: number;
  finance_amount: number;
  loan_duration_months: number;
  is_customer_bank: boolean;
  formula_id: number | undefined;
}
