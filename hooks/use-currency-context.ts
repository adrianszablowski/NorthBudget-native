import { CurrencyContext } from "@/contexts/currency-context";
import { useContext } from "react";

export default function useCurrencyContext() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyContextProvider",
    );
  }

  return context;
}
