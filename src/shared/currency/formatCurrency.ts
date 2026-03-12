/**
 * Utility to format currency values consistently across the app
 */

export type CurrencyFormatOptions = {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  value: number,
  options: CurrencyFormatOptions = {}
): string {

  const {
    currency = "INR",
    locale = "en-IN",
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;

  if (typeof value !== "number" || Number.isNaN(value)) {
    return "₹0";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}