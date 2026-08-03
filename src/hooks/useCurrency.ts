"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type CurrencyCode,
  fetchExchangeRates,
  getCountryCurrency,
  getStoredCurrency,
  setStoredCurrency,
} from "@/lib/currency";

export function useCurrency() {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function initCurrency() {
      try {
        await fetchExchangeRates();

        const stored = getStoredCurrency();
        if (stored) {
          if (!cancelled) setCurrencyState(stored);
          return;
        }

        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("geo failed");
        const data = (await response.json()) as { country_code?: string };
        const detected = getCountryCurrency(data.country_code || "");
        if (!cancelled) {
          setCurrencyState(detected);
          setStoredCurrency(detected);
        }
      } catch {
        if (!cancelled) setCurrencyState("INR");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void initCurrency();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback(async (next: CurrencyCode) => {
    setCurrencyState(next);
    setStoredCurrency(next);
    await fetchExchangeRates();
  }, []);

  return { currency, setCurrency, isLoading };
}
