import useCurrencyContext from "@/hooks/use-currency-context";
import React from "react";
import { ITextProps, Text } from "./text";

interface AmountProps extends ITextProps {
  amount: number;
}

export default function Amount(props: AmountProps) {
  const { currency } = useCurrencyContext();
  const { amount } = props;

  return (
    <Text {...props}>
      {amount.toFixed(2)} {currency}
    </Text>
  );
}
