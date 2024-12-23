import React from "react";
import { ITextProps, Text } from "./text";

interface AmountProps extends ITextProps {
  amount: number;
}

export default function Amount(props: AmountProps) {
  const { amount } = props;

  return <Text {...props}>{amount.toFixed(2)} PLN</Text>;
}
