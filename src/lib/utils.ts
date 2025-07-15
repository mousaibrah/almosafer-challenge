import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  // Handle negative numbers
  if (num < 0) {
    return "-" + formatNumber(Math.abs(num));
  }

  // Handle numbers less than 1000
  if (num < 1000) {
    return num.toString();
  }

  // Handle numbers 1000 to 999999
  if (num < 1000000) {
    const thousands = num / 1000;
    // Round to 1 decimal place and remove trailing .0
    const rounded = Math.round(thousands * 10) / 10;
    return rounded % 1 === 0 ? `${Math.floor(rounded)}k` : `${rounded}k`;
  }

  // Handle numbers 1,000,000 to 999,999,999
  if (num < 1000000000) {
    const millions = num / 1000000;
    const rounded = Math.round(millions * 10) / 10;
    return rounded % 1 === 0 ? `${Math.floor(rounded)}M` : `${rounded}M`;
  }

  // Handle numbers 1,000,000,000 to 999,999,999,999
  if (num < 1000000000000) {
    const billions = num / 1000000000;
    const rounded = Math.round(billions * 10) / 10;
    return rounded % 1 === 0 ? `${Math.floor(rounded)}B` : `${rounded}B`;
  }

  // Handle numbers 1,000,000,000,000 and above
  const trillions = num / 1000000000000;
  const rounded = Math.round(trillions * 10) / 10;
  return rounded % 1 === 0 ? `${Math.floor(rounded)}T` : `${rounded}T`;
}
