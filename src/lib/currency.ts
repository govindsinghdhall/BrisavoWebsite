export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "CAD" | "AED" | "AUD";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  label: string;
  flag: string;
  locale: string;
}

export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", label: "Indian Rupee", flag: "🇮🇳", locale: "en-IN" },
  { code: "USD", symbol: "$", label: "US Dollar", flag: "🇺🇸", locale: "en-US" },
  { code: "EUR", symbol: "€", label: "Euro", flag: "🇪🇺", locale: "de-DE" },
  { code: "GBP", symbol: "£", label: "British Pound", flag: "🇬🇧", locale: "en-GB" },
  { code: "CAD", symbol: "CA$", label: "Canadian Dollar", flag: "🇨🇦", locale: "en-CA" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham", flag: "🇦🇪", locale: "ar-AE" },
  { code: "AUD", symbol: "AU$", label: "Australian Dollar", flag: "🇦🇺", locale: "en-AU" },
];

/** Rates relative to 1 INR (updated from API when available). */
let exchangeRates: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  CAD: 0.016,
  AED: 0.044,
  AUD: 0.018,
};

export async function fetchExchangeRates(): Promise<Record<CurrencyCode, number>> {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as { rates?: Record<string, number> };
    const next = { ...exchangeRates };
    for (const code of Object.keys(exchangeRates) as CurrencyCode[]) {
      if (typeof data.rates?.[code] === "number") {
        next[code] = data.rates[code];
      }
    }
    next.INR = 1;
    exchangeRates = next;
    return exchangeRates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    return exchangeRates;
  }
}

/** Convert an INR amount into the target currency. */
export function convertFromInr(amountInr: number, toCurrency: CurrencyCode): number {
  if (toCurrency === "INR") return amountInr;
  return amountInr * (exchangeRates[toCurrency] || 1);
}

export function formatPrice(amountInr: number, currency: CurrencyCode): string {
  const meta = CURRENCIES.find((item) => item.code === currency)!;
  const converted = convertFromInr(amountInr, currency);
  const rounded =
    currency === "INR" ? Math.round(converted) : Math.round(converted * 100) / 100;

  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "INR" ? 0 : rounded >= 100 ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(rounded);
}

export function getCountryCurrency(countryCode: string): CurrencyCode {
  const countryMap: Record<string, CurrencyCode> = {
    IN: "INR",
    US: "USD",
    GB: "GBP",
    CA: "CAD",
    AE: "AED",
    AU: "AUD",
    DE: "EUR",
    FR: "EUR",
    IT: "EUR",
    ES: "EUR",
    NL: "EUR",
    BE: "EUR",
    PT: "EUR",
    IE: "EUR",
    AT: "EUR",
    FI: "EUR",
    GR: "EUR",
  };
  return countryMap[countryCode] || "USD";
}

export function getStoredCurrency(): CurrencyCode | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem("preferredCurrency");
  if (!value) return null;
  return CURRENCIES.some((item) => item.code === value)
    ? (value as CurrencyCode)
    : null;
}

export function setStoredCurrency(currency: CurrencyCode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("preferredCurrency", currency);
}
