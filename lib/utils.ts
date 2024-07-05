import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: string) => {
  const numericPrice = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
  return numericPrice.toLocaleString("vi-VN");
};
