import React, { createContext, ReactNode, useMemo, useState } from "react";

enum Currency {
  PLN = "PLN",
  EUR = "EUR",
  USD = "USD",
}

interface CurrencyContextProviderProps {
  children: ReactNode;
}

interface ICurrencyContext {
  currency: Currency;
  handleSetCurrency: (currency: Currency) => void;
}

export const CurrencyContext = createContext<ICurrencyContext | null>(null);

export default function CurrencyContextProvider({
  children,
}: CurrencyContextProviderProps) {
  const [currency, setCurrency] = useState(Currency.EUR);

  console.log({ currency });

  const handleSetCurrency = (currency: Currency) => {
    console.log({ currency });
    setCurrency(currency);
  };

  const value = useMemo(() => ({ currency, handleSetCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
